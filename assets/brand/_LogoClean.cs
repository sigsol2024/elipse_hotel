using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;

class LogoClean {
  static bool IsPaperBg(Color c) {
    if (c.A < 10) return true;
    int avg = (c.R + c.G + c.B) / 3;
    int spread = Math.Max(Math.Abs(c.R - c.G), Math.Max(Math.Abs(c.G - c.B), Math.Abs(c.R - c.B)));
    // mid gray paper / PDF fill
    if (spread < 22 && avg > 55 && avg < 195) return true;
    // near-black PDF canvas
    if (spread < 18 && avg < 45) return true;
    return false;
  }

  static bool IsOrange(Color c) {
    return c.A > 20 && c.R > 170 && c.G > 60 && c.G < 190 && c.B < 130 && c.R > c.B + 40;
  }

  static bool IsWhiteish(Color c) {
    return c.A > 20 && c.R > 200 && c.G > 200 && c.B > 200;
  }

  static bool IsContent(Color c) {
    if (c.A < 10) return false;
    if (IsPaperBg(c)) return false;
    return IsOrange(c) || IsWhiteish(c) || (!IsPaperBg(c) && (c.R + c.G + c.B) > 80);
  }

  static void Main() {
    string src = @"assets\brand\logo-page-0.png";
    if (!File.Exists(src)) { Console.WriteLine("missing " + src); return; }
    using (var bmp = new Bitmap(src)) {
      int minX = bmp.Width, minY = bmp.Height, maxX = 0, maxY = 0;
      for (int y = 0; y < bmp.Height; y++) {
        for (int x = 0; x < bmp.Width; x++) {
          var c = bmp.GetPixel(x, y);
          if (IsOrange(c) || IsWhiteish(c)) {
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
          }
        }
      }
      int pad = 40;
      minX = Math.Max(0, minX - pad);
      minY = Math.Max(0, minY - pad);
      maxX = Math.Min(bmp.Width - 1, maxX + pad);
      maxY = Math.Min(bmp.Height - 1, maxY + pad);
      int w = maxX - minX + 1, h = maxY - minY + 1;
      Console.WriteLine("bounds=" + minX + "," + minY + "," + w + "," + h);

      using (var dark = new Bitmap(w, h, PixelFormat.Format32bppArgb))
      using (var light = new Bitmap(w, h, PixelFormat.Format32bppArgb)) {
        for (int y = 0; y < h; y++) {
          for (int x = 0; x < w; x++) {
            var c = bmp.GetPixel(minX + x, minY + y);
            if (IsPaperBg(c)) {
              dark.SetPixel(x, y, Color.FromArgb(0, 0, 0, 0));
              light.SetPixel(x, y, Color.FromArgb(0, 0, 0, 0));
              continue;
            }
            dark.SetPixel(x, y, c);
            if (IsWhiteish(c))
              light.SetPixel(x, y, Color.FromArgb(c.A, 26, 26, 26));
            else
              light.SetPixel(x, y, c);
          }
        }
        dark.Save(@"assets\brand\logo-on-dark.png", ImageFormat.Png);
        light.Save(@"assets\brand\logo-on-light.png", ImageFormat.Png);
        File.Copy(@"assets\brand\logo-on-dark.png", @"assets\brand\logo.png", true);
        Console.WriteLine("saved cleaned logos");
      }
    }
  }
}
