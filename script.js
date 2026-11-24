// George Fernando — portfolio site interactions
// Mobile menu + scroll reveal + parallax + depth cursor + proof lightbox.
// No framework, no tracking.

(function () {
  // Mark JS as running so the reveal animation may hide content.
  // Without this class, everything stays visible.
  document.documentElement.classList.add("js");

  // Mobile menu
  var toggle = document.getElementById("menuToggle");
  var nav = document.getElementById("siteNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Reveal on scroll
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  // Parallax + depth cursor (mouse only, motion-safe)
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;

  if (!reduceMotion) {
    // Scroll parallax: elements with data-speed drift at their own rate.
    var pxEls = Array.prototype.slice.call(document.querySelectorAll("[data-speed]"));
    var pxTicking = false;
    function pxUpdate() {
      pxTicking = false;
      var vh = window.innerHeight;
      pxEls.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        var speed = parseFloat(el.getAttribute("data-speed")) || 0;
        var offset = (r.top + r.height / 2 - vh / 2) * speed;
        el.style.setProperty("--py", offset.toFixed(1) + "px");
      });
    }
    function pxRequest() {
      if (!pxTicking) { pxTicking = true; requestAnimationFrame(pxUpdate); }
    }
    if (pxEls.length) {
      window.addEventListener("scroll", pxRequest, { passive: true });
      window.addEventListener("resize", pxRequest);
      pxUpdate();
    }

    // Hero mouse depth: the photo shifts toward the cursor.
    var hero = document.querySelector(".hero");
    var heroPhoto = document.querySelector(".hero-photo");
    if (finePointer && hero && heroPhoto) {
      hero.addEventListener("mousemove", function (e) {
        var r = hero.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) / r.width;
        var dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        heroPhoto.style.setProperty("--mx", dx.toFixed(3));
        heroPhoto.style.setProperty("--my", dy.toFixed(3));
      });
      hero.addEventListener("mouseleave", function () {
        heroPhoto.style.setProperty("--mx", 0);
        heroPhoto.style.setProperty("--my", 0);
      });
    }
  }

  if (finePointer && !reduceMotion) {
    // Custom depth cursor: instant dot + trailing ring.
    document.documentElement.classList.add("has-cursor");
    var dot = document.getElementById("cursorDot");
    var ring = document.getElementById("cursorRing");
    var mx = -100, my = -100, rx = -100, ry = -100;

    document.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top = my + "px";
    });
    document.addEventListener("mouseleave", function () {
      dot.style.opacity = "0"; ring.style.opacity = "0";
    });
    document.addEventListener("mouseenter", function () {
      dot.style.opacity = "1"; ring.style.opacity = "1";
    });
    document.addEventListener("mouseover", function (e) {
      var view = e.target.closest(".case[data-proof]");
      var link = e.target.closest("a, button");
      ring.classList.toggle("is-view", !!view);
      ring.classList.toggle("is-link", !view && !!link);
      document.documentElement.classList.toggle("cursor-view", !!view);
    });
    (function cursorLoop() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      requestAnimationFrame(cursorLoop);
    })();

    // Card tilt: cards lean toward the cursor for depth.
    document.querySelectorAll(".case").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty("--ry", (px * 6).toFixed(2) + "deg");
        card.style.setProperty("--rx", (-py * 6).toFixed(2) + "deg");
      });
      card.addEventListener("mouseleave", function () {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      });
    });
  }

  // Click-to-view proof screenshots
  var lightbox = document.getElementById("lightbox");
  var lbImg = document.getElementById("lightboxImg");
  var lbCaption = document.getElementById("lightboxCaption");
  var lbCount = document.getElementById("lightboxCount");
  var lbPrev = document.getElementById("lightboxPrev");
  var lbNext = document.getElementById("lightboxNext");
  var lbDetail = document.getElementById("lightboxDetail");
  var lbImages = [];
  var lbCaptions = [];
  var lbIndex = 0;

  function lbShow(i) {
    lbIndex = (i + lbImages.length) % lbImages.length;
    lbImg.src = lbImages[lbIndex];
    lbCaption.textContent = lbCaptions[lbIndex] || "";
    lbCount.textContent = lbImages.length > 1 ? (lbIndex + 1) + " / " + lbImages.length : "";
    lbPrev.disabled = lbImages.length < 2;
    lbNext.disabled = lbImages.length < 2;
  }
  function lbOpen(card) {
    lbImages = (card.getAttribute("data-proof") || "").split("|").filter(Boolean);
    lbCaptions = (card.getAttribute("data-caption") || "").split("|");
    if (!lbImages.length) return;
    lbShow(0);
    if (lbDetail) {
      lbDetail.innerHTML = "";
      var problem = card.getAttribute("data-problem") || "";
      var solution = card.getAttribute("data-solution") || "";
      if (problem) {
        var pp = document.createElement("p");
        var ps = document.createElement("strong");
        ps.textContent = "The problem: ";
        pp.appendChild(ps);
        pp.appendChild(document.createTextNode(problem));
        lbDetail.appendChild(pp);
      }
      if (solution) {
        var sp = document.createElement("p");
        var ss = document.createElement("strong");
        ss.textContent = "How it works: ";
        sp.appendChild(ss);
        sp.appendChild(document.createTextNode(solution));
        lbDetail.appendChild(sp);
      }
    }
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function lbClose() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  if (lightbox) {
    document.querySelectorAll(".case[data-proof]").forEach(function (card) {
      card.addEventListener("click", function () { lbOpen(card); });
    });
    lightbox.querySelectorAll("[data-close]").forEach(function (el) {
      el.addEventListener("click", lbClose);
    });
    lbPrev.addEventListener("click", function (e) { e.stopPropagation(); lbShow(lbIndex - 1); });
    lbNext.addEventListener("click", function (e) { e.stopPropagation(); lbShow(lbIndex + 1); });
    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") lbClose();
      if (e.key === "ArrowLeft") lbShow(lbIndex - 1);
      if (e.key === "ArrowRight") lbShow(lbIndex + 1);
    });
  }
})();
