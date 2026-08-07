using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
class P {
  static bool IsBg(Color c) {
    int avg = (c.R + c.G + c.B) / 3;
    return Math.Abs(c.R - c.G) < 18 && Math.Abs(c.G - c.B) < 18 && avg > 60 && avg < 180;
  }
  static void Main() {
    string src = @"assets\brand\logo-page-0.png";
    using (var bmp = new Bitmap(src)) {
      int minX=bmp.Width, minY=bmp.Height, maxX=0, maxY=0;
      for (int y=0;y<bmp.Height;y+=3)
        for (int x=0;x<bmp.Width;x+=3) {
          var c=bmp.GetPixel(x,y);
          if (!IsBg(c)) {
            if(x<minX)minX=x; if(y<minY)minY=y; if(x>maxX)maxX=x; if(y>maxY)maxY=y;
          }
        }
      // If whole image marked content, tighten by scanning more carefully near edges
      if (minX==0 && minY==0 && maxX>=bmp.Width-3) {
        // sample corners - if gray, keep; find non-gray by denser scan
        minX=bmp.Width; minY=bmp.Height; maxX=0; maxY=0;
        for (int y=0;y<bmp.Height;y++)
          for (int x=0;x<bmp.Width;x++) {
            var c=bmp.GetPixel(x,y);
            // content: orange-ish OR near-white bright
            bool orange = c.R > 180 && c.G > 70 && c.G < 180 && c.B < 120;
            bool white = c.R > 210 && c.G > 210 && c.B > 210;
            if (orange || white) {
              if(x<minX)minX=x; if(y<minY)minY=y; if(x>maxX)maxX=x; if(y>maxY)maxY=y;
            }
          }
      }
      int pad=30;
      minX=Math.Max(0,minX-pad); minY=Math.Max(0,minY-pad);
      maxX=Math.Min(bmp.Width-1,maxX+pad); maxY=Math.Min(bmp.Height-1,maxY+pad);
      int w=maxX-minX+1, h=maxY-minY+1;
      Console.WriteLine("bounds="+minX+","+minY+","+w+","+h);
      using (var outB = new Bitmap(w,h,PixelFormat.Format32bppArgb)) {
        for (int y=0;y<h;y++)
          for (int x=0;x<w;x++) {
            var c=bmp.GetPixel(minX+x,minY+y);
            if (IsBg(c)) outB.SetPixel(x,y,Color.FromArgb(0,0,0,0));
            else outB.SetPixel(x,y,c);
          }
        outB.Save(@"assets\brand\logo-on-dark.png", ImageFormat.Png);
        // light bg: white -> charcoal/navy
        using (var light = new Bitmap(w,h,PixelFormat.Format32bppArgb)) {
          for (int y=0;y<h;y++)
            for (int x=0;x<w;x++) {
              var c=outB.GetPixel(x,y);
              if (c.A<20) { light.SetPixel(x,y,c); continue; }
              if (c.R>220 && c.G>220 && c.B>220)
                light.SetPixel(x,y, Color.FromArgb(c.A, 26,26,26));
              else light.SetPixel(x,y,c);
            }
          light.Save(@"assets\brand\logo-on-light.png", ImageFormat.Png);
        }
        File.Copy(@"assets\brand\logo-on-dark.png", @"assets\brand\logo.png", true);
        Console.WriteLine("done");
      }
    }
  }
}
