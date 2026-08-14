(function () {
  function initReveals() {
    const nodes = document.querySelectorAll(".reveal");
    if (!nodes.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((n) => n.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            entry.target.classList.add("active");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "220px 0px 220px 0px" }
    );

    nodes.forEach((n) => io.observe(n));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initReveals);
  } else {
    initReveals();
  }

  // Re-run after dynamic room renders
  window.EllipseMotion = {
    refresh() {
      initReveals();
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      if (window.EllipseMotion) window.EllipseMotion.refresh();
    }, 50);
  });
})();
