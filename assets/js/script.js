// ============================================
// MOBILE MENU & NAVBAR
// ============================================
// Desktop dropdown: + / − icon toggle
document.addEventListener("DOMContentLoaded", function () {
  const desktopDropdown = document.querySelector(".desktop-dropdown");
  const dropdownIcon = document.querySelector(".desktop-dropdown-icon");

  if (desktopDropdown && dropdownIcon) {
    desktopDropdown.addEventListener("mouseenter", function () {
      dropdownIcon.textContent = "−";
    });
    desktopDropdown.addEventListener("mouseleave", function () {
      dropdownIcon.textContent = "+";
    });
  }
});

// ── Mobile 2-panel menu ──
document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("mobile-overlay");
  const wrapper = document.getElementById("mobile-menu-wrapper");
  const mmMain = document.getElementById("mm-main");
  const mmServices = document.getElementById("mm-services");
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const closeBtn = document.getElementById("mm-close");
  const servicesTrig = document.getElementById("mm-services-trigger");
  const backBtn = document.getElementById("mm-back");
  const servicesClose = document.getElementById("mm-services-close");

  function openMenu() {
    wrapper.classList.add("active");
    overlay.classList.add("active");
    wrapper.classList.remove("services-open");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    wrapper.classList.remove("active", "services-open");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  function openServices() {
    wrapper.classList.add("services-open");
  }

  function closeServices() {
    wrapper.classList.remove("services-open");
  }

  // Open via hamburger
  toggleBtn && toggleBtn.addEventListener("click", openMenu);

  // Close buttons
  closeBtn && closeBtn.addEventListener("click", closeMenu);
  servicesClose && servicesClose.addEventListener("click", closeMenu);

  // Overlay click → close
  overlay && overlay.addEventListener("click", closeMenu);

  // SERVICES → slide to panel 2
  servicesTrig && servicesTrig.addEventListener("click", openServices);

  // BACK → slide back to panel 1
  backBtn && backBtn.addEventListener("click", closeServices);

  // Close nav links (non-services) also close menu
  document.querySelectorAll(".mm-nav-link:not(button)").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Service cards close menu
  document.querySelectorAll(".mm-service-card").forEach((card) => {
    card.addEventListener("click", closeMenu);
  });

  // Resize: close on desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 1024) closeMenu();
  });
});

//full width and height menu -

(function () {
  const overlay = document.getElementById("pixxen-menu");
  const topPanel = document.getElementById("menu-top");
  const botPanel = document.getElementById("menu-bottom");
  const closeBtn = document.getElementById("menu-close");
  const openBtn = document.getElementById("desktop-sidebar");
  const cols = document.querySelectorAll(".nav-col");
  const logoWrap = document.getElementById("bottom-logo");

  const DESKTOP_MIN = 1024;
  function isDesktop() {
    return window.innerWidth >= DESKTOP_MIN;
  }

  // ─── Pre-set initial states ───────────────────────────────────
  gsap.set(topPanel, { y: "-100%" });
  gsap.set(botPanel, { y: "100%" });
  gsap.set(cols, { y: 40, opacity: 0 });
  gsap.set(logoWrap, { y: 30, opacity: 0 });

  let isOpen = false;
  let isAnimating = false;

  // ─── OPEN ─
  function openMenu() {
    if (!isDesktop() || isOpen || isAnimating) return;
    isAnimating = true;

    document.body.classList.add("menu-open");
    overlay.classList.add("is-open");

    const tl = gsap.timeline({
      onComplete: () => {
        isOpen = true;
        isAnimating = false;
      },
    });

    tl.to(topPanel, { y: "0%", duration: 0.75, ease: "power4.out" }, 0);
    tl.to(botPanel, { y: "0%", duration: 0.75, ease: "power4.out" }, 0);
    tl.to(
      cols,
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" },
      0.45,
    );
    tl.to(
      logoWrap,
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
      0.5,
    );
  }

  // ─── CLOSE ───
  function closeMenu() {
    if (!isOpen || isAnimating) return;
    isAnimating = true;

    const tl = gsap.timeline({
      onComplete: () => {
        isOpen = false;
        isAnimating = false;
        overlay.classList.remove("is-open");
        document.body.classList.remove("menu-open");
        gsap.set(cols, { y: 40, opacity: 0 });
        gsap.set(logoWrap, { y: 30, opacity: 0 });
      },
    });

    tl.to(
      [...cols].reverse(),
      { y: -20, opacity: 0, duration: 0.3, stagger: 0.04, ease: "power2.in" },
      0,
    );
    tl.to(
      logoWrap,
      { y: 20, opacity: 0, duration: 0.25, ease: "power2.in" },
      0,
    );
    tl.to(topPanel, { y: "-100%", duration: 0.65, ease: "power4.in" }, 0.2);
    tl.to(botPanel, { y: "100%", duration: 0.65, ease: "power4.in" }, 0.2);
  }

  // Resize: viewport
  window.addEventListener("resize", () => {
    if (!isDesktop() && isOpen) {
      gsap.killTweensOf([topPanel, botPanel, cols, logoWrap]);
      gsap.set(topPanel, { y: "-100%" });
      gsap.set(botPanel, { y: "100%" });
      gsap.set(cols, { y: 40, opacity: 0 });
      gsap.set(logoWrap, { y: 30, opacity: 0 });
      overlay.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      isOpen = false;
      isAnimating = false;
    }
  });

  // ─── Events
  openBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Prevent background scroll when menu open
  const style = document.createElement("style");
  style.textContent = `body.menu-open { overflow: hidden; }`;
  document.head.appendChild(style);
})();

//smooth scroll

// Initialize Lenis
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  smoothWheel: true,
  wheelMultiplier: 1.3,
  infinite: false,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);



// Pixxen Painting js start
document.addEventListener('DOMContentLoaded', () => {

  const MAGNETIC_MAX_DISTANCE = 12; // px -- movement can never exceed this, however far the mouse goes
  const clamp = (value) => Math.max(-MAGNETIC_MAX_DISTANCE, Math.min(MAGNETIC_MAX_DISTANCE, value));

  // ---- grouped magnetic buttons: icon + text inside .painting-btn-cta move TOGETHER,
  // driven by one mousemove listener on the shared outer anchor, so they
  // never drift apart / overlap independently anymore.
  document.querySelectorAll('.painting-btn-cta').forEach((group) => {
    const magneticChildren = group.querySelectorAll('.painting-magnetic-btn');

    group.addEventListener('mousemove', (e) => {
      const rect = group.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      magneticChildren.forEach((child) => {
        gsap.to(child, {
          x: clamp(x * 0.15),
          y: clamp(y * 0.15),
          duration: 0.4,
          ease: 'power3.out',
        });
      });
    });

    group.addEventListener('mouseleave', () => {
      magneticChildren.forEach((child) => {
        gsap.to(child, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.4)',
        });
      });
    });
  });

  // ---- standalone magnetic buttons (e.g. See Pricing): unchanged, independent per-element ----
  document.querySelectorAll('.painting-magnetic-btn').forEach((btn) => {
    if (btn.closest('.painting-btn-cta')) return; // already handled by the group logic above

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: clamp(x * 0.2),
        y: clamp(y * 0.2),
        duration: 0.4,
        ease: 'power3.out',
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      });
    });
  });
});


// Painting section heading reveal
document.addEventListener("DOMContentLoaded", function () {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("GSAP or ScrollTrigger is missing.");
    return;
  }
  
  gsap.registerPlugin(ScrollTrigger);

  /* ==========================================
     1. PAINTING MAIN HEADING SWIPE REVEAL
     ========================================== */
  const swipeHeadings = document.querySelectorAll(".painting-heading-swipe");
  if (swipeHeadings.length > 0) {
    swipeHeadings.forEach((el) => {
      if (el.dataset.hlReady) return;
      el.dataset.hlReady = "1";

      const d = el.dataset;
      const bgColor = d.hlBg || "#E8C547";
      const borderColor = d.hlBorder || bgColor;
      const textColor = d.hlText || "";
      const layers = Math.max(2, Math.min(4, parseInt(d.hlLayers || "3", 10)));
      const topOpacity = parseFloat(d.hlSwipeOpacity || "0.6");
      const duration = parseFloat(d.hlDuration || "1.3");
      const stagger = parseFloat(d.hlStagger || "0.3");
      const borderWidth = d.hlBorderWidth || "1px";
      const radius = d.hlRadius || "0px";
      const startPoint = d.hlStart || "top 70%";

      el.style.position = "relative";

      // text wrapper: always on top
      const text = document.createElement("span");
      text.style.cssText = "position:relative;z-index:2;";
      while (el.firstChild) text.appendChild(el.firstChild);

      // clip layer
      const clip = document.createElement("span");
      clip.setAttribute("aria-hidden", "true");
      clip.style.cssText = `position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:1;border-radius:${radius};`;

      // final bg + border
      const deco = document.createElement("span");
      deco.style.cssText = `position:absolute;inset:0;box-sizing:border-box;border:${borderWidth} solid ${borderColor};background:${bgColor};border-radius:${radius};`;
      clip.appendChild(deco);

      // translucent sweeping layers
      const sweepCount = layers - 1;
      const sweeps = [];
      for (let i = 0; i < sweepCount; i++) {
        const s = document.createElement("span");
        const opacity = topOpacity * ((i + 1) / sweepCount);
        s.style.cssText = `position:absolute;inset:0;background:${bgColor};opacity:${opacity};`;
        clip.appendChild(s);
        sweeps.push(s);
      }

      el.append(clip, text);

      gsap.set(deco, { clipPath: "inset(0% 0% 100% 0%)", willChange: "clip-path" });
      if (sweeps.length > 0) {
        gsap.set(sweeps, { yPercent: -101, willChange: "transform" });
      }

      const ease = "power2.inOut";
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: startPoint,
          toggleActions: "play none none none",
        },
      });

      sweeps.forEach((s, i) => {
        tl.to(s, { yPercent: 101, duration, ease }, i * stagger);
      });

      tl.to(
        deco,
        { clipPath: "inset(0% 0% 0% 0%)", duration, ease },
        sweepCount * stagger
      );

      if (textColor) {
        tl.to(
          text,
          { color: textColor, duration: duration * 0.6, ease: "power2.out" },
          sweepCount * stagger + duration * 0.25
        );
      }
    });
  }

  /* ==========================================
     2. HEADING SCRUB REVEAL
     ========================================== */
  const scrubHeadings = document.querySelectorAll(".painting-scrub-heading");
  if (scrubHeadings.length > 0) {
    // Inject styles only once safely
    if (!document.getElementById("painting-scrub-styles")) {
      const style = document.createElement("style");
      style.id = "painting-scrub-styles";
      style.textContent = `
        .reveal-mask {
          display: inline-block;
          overflow: hidden;
          vertical-align: top;
          padding: .08em 0;
          margin: -.08em 0;
        }

        .reveal-word {
          display: inline-block;
          will-change: transform;
        }

        .reveal-pill {
          display: inline-flex;
          will-change: transform, opacity;
        }
      `;
      document.head.appendChild(style);
    }

    scrubHeadings.forEach((heading) => {
      if (heading.dataset.scrubReady) return;
      heading.dataset.scrubReady = "1";

      function splitWords(root) {
        const walk = (node) => {
          Array.from(node.childNodes).forEach((child) => {
            if (child.nodeType === Node.TEXT_NODE) {
              if (!child.textContent.trim()) return;

              const frag = document.createDocumentFragment();

              child.textContent.split(/(\s+)/).forEach((part) => {
                if (!part) return;

                if (/^\s+$/.test(part)) {
                  frag.appendChild(document.createTextNode(part));
                } else {
                  const mask = document.createElement("span");
                  mask.className = "reveal-mask";

                  const inner = document.createElement("span");
                  inner.className = "reveal-word";
                  inner.textContent = part;

                  mask.appendChild(inner);
                  frag.appendChild(mask);
                }
              });

              child.replaceWith(frag);
            } else if (child.nodeType === Node.ELEMENT_NODE) {
              if (child.querySelector("img") || child.tagName === "IMG") {
                child.classList.add("reveal-pill");
              } else {
                walk(child);
              }
            }
          });
        };

        walk(root);
      }

      splitWords(heading);

      const words = Array.from(heading.querySelectorAll(".reveal-word"));
      const pills = Array.from(heading.querySelectorAll(".reveal-pill"));

      if (!words.length && !pills.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (words.length) {
          gsap.set(words, {
            yPercent: 110,
            rotate: 4,
            transformOrigin: "0% 100%"
          });
        }

        if (pills.length) {
          gsap.set(pills, {
            opacity: 0,
            scale: 0.6,
            transformOrigin: "center center"
          });
        }

        const tl = gsap.timeline({
          paused: true,
          defaults: {
            ease: "expo.out"
          }
        });

        if (words.length) {
          tl.to(words, {
            yPercent: 0,
            rotate: 0,
            duration: 1.1,
            stagger: 0.045
          });
        }

        pills.forEach((pill) => {
          const items = Array.from(heading.querySelectorAll(".reveal-word, .reveal-pill"));
          const idx = items.indexOf(pill);

          const wordsBefore = items
            .slice(0, idx)
            .filter((el) => el.classList.contains("reveal-word")).length;

          tl.to(
            pill,
            {
              opacity: 1,
              scale: 1,
              duration: 0.9,
              ease: "back.out(1.6)"
            },
            wordsBefore * 0.045 + 0.1
          );
        });

        ScrollTrigger.create({
          trigger: heading,
          start: "top 85%",
          once: true,
          onEnter: () => tl.play()
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        if (words.length) gsap.set(words, { yPercent: 0, rotate: 0 });
        if (pills.length) gsap.set(pills, { opacity: 1, scale: 1 });
      });
    });
  }

  // Final unified refresh
  ScrollTrigger.refresh();
});


// painting FAQ section
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".painting-faq-item");

  function closeItem(item) {
    const trigger = item.querySelector(".painting-faq-trigger");
    const content = item.querySelector(".painting-faq-content");
    const icon = item.querySelector(".painting-icon-close img");

    item.classList.remove("active");
    content.style.maxHeight = "0px";
    trigger.setAttribute("aria-expanded", "false");
    if (icon) icon.style.transform = "rotate(0deg)";
  }

  function openItem(item) {
    const trigger = item.querySelector(".painting-faq-trigger");
    const content = item.querySelector(".painting-faq-content");
    const icon = item.querySelector(".painting-icon-close img");

    item.classList.add("active");
    content.style.maxHeight = content.scrollHeight + "px";
    trigger.setAttribute("aria-expanded", "true");
    if (icon) icon.style.transform = "rotate(45deg)";
  }

  faqItems.forEach(function (item) {
    const trigger = item.querySelector(".painting-faq-trigger");

    function toggle() {
      const isOpen = item.classList.contains("active");

      // Close all FAQs
      faqItems.forEach(closeItem);

      // Open clicked FAQ
      if (!isOpen) openItem(item);
    }

    trigger.addEventListener("click", toggle);

    // keyboard support, since the trigger is a div with role="button"
    trigger.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });
  });

  // keep the open item's height correct when the screen is resized
  window.addEventListener("resize", function () {
    const openContent = document.querySelector(
      ".painting-faq-item.active .painting-faq-content"
    );
    if (openContent) {
      openContent.style.maxHeight = openContent.scrollHeight + "px";
    }
  });
});
