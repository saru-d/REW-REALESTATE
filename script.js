document.addEventListener("DOMContentLoaded", () => {

  /* ---------------- HAMBURGER MENU ---------------- */
  const hamburger = document.getElementById("hamburger");
  const navActions = document.querySelector(".nav-actions");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navActions.classList.toggle("active");
  });

  // Close menu when clicking nav link (on mobile)
  document.querySelectorAll(".nav-actions nav a").forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 900) {
        hamburger.classList.remove("active");
        navActions.classList.remove("active");
      }
    });
  });


  /* ---------------- EXPLORE BUTTON SCROLL ---------------- */
  const exploreBtn = document.getElementById("exploreBtn");
  const propertiesSection = document.getElementById("properties");

  if (exploreBtn && propertiesSection) {
    exploreBtn.addEventListener("click", e => {
      e.preventDefault();
      propertiesSection.scrollIntoView({ behavior: "smooth" });
    });
  }


  /* ---------------- PROPERTY FILTER BUTTONS ---------------- */
  const buyBtn = document.getElementById("buyBtn");
  const rentBtn = document.getElementById("rentBtn");
  const allBtn = document.getElementById("allBtn");
  const cards = document.querySelectorAll(".property-card");

  if (buyBtn && rentBtn && allBtn) {
    buyBtn.addEventListener("click", () => {
      cards.forEach(card => {
        card.style.display = card.dataset.type === "buy" ? "block" : "none";
      });
      propertiesSection.scrollIntoView({ behavior: "smooth" });
    });

    rentBtn.addEventListener("click", () => {
      cards.forEach(card => {
        card.style.display = card.dataset.type === "rent" ? "block" : "none";
      });
      propertiesSection.scrollIntoView({ behavior: "smooth" });
    });

    allBtn.addEventListener("click", () => {
      cards.forEach(card => (card.style.display = "block"));
      propertiesSection.scrollIntoView({ behavior: "smooth" });
    });
  }


  /* ---------------- ADD LISTING MODAL ---------------- */
  const openAdd = document.getElementById("open-add");
  const addListModal = document.getElementById("addListModal");
  const propertyForm = document.getElementById("propertyForm");
  const closeAddModal = addListModal ? addListModal.querySelector(".close") : null;

  if (openAdd && addListModal && closeAddModal && propertyForm) {
    openAdd.addEventListener("click", () => {
      addListModal.style.display = "flex";
    });

    closeAddModal.addEventListener("click", () => {
      addListModal.style.display = "none";
    });

    window.addEventListener("click", e => {
      if (e.target === addListModal) addListModal.style.display = "none";
    });

    propertyForm.addEventListener("submit", e => {
      e.preventDefault();
      alert("✅ Property added successfully!");
      addListModal.style.display = "none";
      propertyForm.reset();
    });
  }


  /* ---------------- ABOUT MODAL ---------------- */
  const aboutModal = document.getElementById("aboutModal");
  const closeAbout = document.getElementById("closeAbout");
  const learnMoreBtn = document.querySelector(".about-section .btn");

  if (aboutModal && closeAbout && learnMoreBtn) {
    learnMoreBtn.addEventListener("click", e => {
      e.preventDefault();
      aboutModal.style.display = "flex";
    });

    closeAbout.addEventListener("click", () => {
      aboutModal.style.display = "none";
    });

    window.addEventListener("click", e => {
      if (e.target === aboutModal) aboutModal.style.display = "none";
    });
  }


  /* ---------------- CUSTOM SLIDER SCROLLBAR ---------------- */
  const slider = document.getElementById("propertySlider");
  const track = document.getElementById("sliderTrack");
  const thumb = document.getElementById("sliderThumb");

  if (slider && track && thumb) {
    const updateThumb = () => {
      const visible = slider.clientWidth;
      const total = slider.scrollWidth;
      const trackWidth = track.clientWidth;

      if (total <= visible) {
        thumb.style.width = trackWidth + "px";
        thumb.style.transform = "translateX(0)";
        return;
      }

      const thumbWidth = Math.max(50, (visible / total) * trackWidth);
      thumb.style.width = thumbWidth + "px";

      const maxThumbLeft = trackWidth - thumbWidth;
      const maxScrollLeft = total - visible;
      const ratio = slider.scrollLeft / maxScrollLeft;
      const left = ratio * maxThumbLeft;
      thumb.style.transform = `translateX(${left}px)`;
    };

    slider.addEventListener("scroll", updateThumb, { passive: true });

    track.addEventListener("click", e => {
      if (e.target === thumb) return;
      const rect = track.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const thumbRect = thumb.getBoundingClientRect();
      const thumbCenter = thumbRect.left - rect.left + thumbRect.width / 2;
      const scrollAmount = slider.clientWidth * 0.8;

      if (clickX < thumbCenter) {
        slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    });

    // Dragging logic
    let dragging = false;
    let startX = 0;
    let startLeft = 0;

    thumb.addEventListener("mousedown", e => {
      dragging = true;
      startX = e.clientX;
      const transform = getComputedStyle(thumb).transform;
      startLeft = transform !== "none" ? parseFloat(transform.split(",")[4]) : 0;
      document.body.style.userSelect = "none";
      thumb.style.transition = "none";
    });

    document.addEventListener("mousemove", e => {
      if (!dragging) return;
      const rect = track.getBoundingClientRect();
      const trackWidth = rect.width;
      const thumbWidth = thumb.clientWidth;
      let newLeft = startLeft + (e.clientX - startX);
      newLeft = Math.max(0, Math.min(trackWidth - thumbWidth, newLeft));
      thumb.style.transform = `translateX(${newLeft}px)`;

      const ratio = newLeft / (trackWidth - thumbWidth);
      const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
      slider.scrollLeft = ratio * maxScrollLeft;
    });

    document.addEventListener("mouseup", () => {
      if (!dragging) return;
      dragging = false;
      document.body.style.userSelect = "";
      thumb.style.transition = "transform 0.1s ease";
    });

    window.addEventListener("resize", updateThumb);
    window.addEventListener("load", updateThumb);
  }


  /* ---------------- BLOG MODAL ---------------- */
  const blogPosts = [
    {
      title: "The Most Inspiring Interior Design of 2025",
      img: "assests/blog-1.jpg",
      text: "Explore 2025’s most elegant interior trends — from minimalist black themes to luxury gold accents."
    },
    {
      title: "Recent Commercial Real Estate Transactions",
      img: "assests/blog-2.jpeg",
      text: "A deep dive into recent commercial property deals — shaping the future of urban real estate growth."
    },
    {
      title: "Renovating a Living Room? Experts Share Their Secrets",
      img: "assests/blog-3.webp",
      text: "Experts reveal modern makeover strategies — from lighting to color harmony for stylish spaces."
    }
  ];

  const blogModal = document.getElementById("blogModal");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");
  const modalText = document.getElementById("modalText");
  const closeBlogModal = document.getElementById("closeBlogModal");

  document.querySelectorAll(".read-more").forEach((btn, i) => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      blogModal.style.display = "flex";
      modalImg.src = blogPosts[i].img;
      modalTitle.textContent = blogPosts[i].title;
      modalText.textContent = blogPosts[i].text;
    });
  });

  if (closeBlogModal) {
    closeBlogModal.addEventListener("click", () => {
      blogModal.style.display = "none";
    });
  }

  window.addEventListener("click", e => {
    if (e.target === blogModal) blogModal.style.display = "none";
  });


  /* ---------------- CONTACT FORM ---------------- */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", e => {
      e.preventDefault();
      alert("✅ Thank you! Your message has been sent successfully.");
      contactForm.reset();
    });
  }

});
