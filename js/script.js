/* Edmarjay Web Development — interactions */
(() => {
  "use strict";

  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = [...document.querySelectorAll(".nav-link")];

  function closeMenu() {
    if (!menuToggle || !navMenu) return;
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    document.body.classList.remove("menu-open");
  }

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
      navMenu.classList.toggle("open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });
    navLinks.forEach(link => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu();
    });
    document.addEventListener("click", event => {
      if (navMenu.classList.contains("open") &&
          !navMenu.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
    });
  }

  // Highlight the navigation item for the section currently in view.
  const sections = [...document.querySelectorAll("main section[id]")];
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          const active = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });
    sections.forEach(section => sectionObserver.observe(section));
  }

  // Accessible single-open FAQ accordion.
  document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
      const currentlyOpen = button.getAttribute("aria-expanded") === "true";
      document.querySelectorAll(".faq-question").forEach(other => {
        other.setAttribute("aria-expanded", "false");
        const answer = other.closest(".faq-item").querySelector(".faq-answer");
        answer.hidden = true;
      });
      if (!currentlyOpen) {
        button.setAttribute("aria-expanded", "true");
        button.closest(".faq-item").querySelector(".faq-answer").hidden = false;
      }
    });
  });

  // Scroll reveal; content remains visible when observers are unsupported or motion is reduced.
  const revealItems = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  // Preselect a package when a pricing CTA is used.
  const requirements = document.querySelector('select[name="requirements"]');
  document.querySelectorAll("[data-package]").forEach(link => {
    link.addEventListener("click", () => {
      if (requirements) requirements.value = "New business website";
      const details = document.querySelector('textarea[name="project_details"]');
      if (details && !details.value) details.value = `I'm interested in the ${link.dataset.package} package.`;
    });
  });

  // Google Apps Script form submission integration
  const form = document.getElementById("enquiry-form");
  const status = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();

      // TODO: Replace with your actual Google Apps Script Web App URL
      const scriptURL = 'https://script.google.com/macros/s/AKfycby3d27eM4Ws-eFOIkNApsqGhDljjrtlmkhQ0XTwb2nLTaxeCzKNZjBoJxlFxTEaCV3hhQ/exec';

      if (scriptURL.includes('https://script.google.com/macros/s/AKfycby3d27eM4Ws-eFOIkNApsqGhDljjrtlmkhQ0XTwb2nLTaxeCzKNZjBoJxlFxTEaCV3hhQ/exec')) {
        if (status) {
          status.textContent = "Please replace YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL in js/script.js with your deployed Google Apps Script Web App URL.";
          status.style.color = "#ef4444";
        }
        return;
      }

      const formData = {
        name: form.querySelector('[name="name"]').value,
        business_name: form.querySelector('[name="business_name"]').value,
        email: form.querySelector('[name="email"]').value,
        website: form.querySelector('[name="website"]').value,
        business_type: form.querySelector('[name="business_type"]').value,
        budget: form.querySelector('[name="budget"]').value,
        requirements: form.querySelector('[name="requirements"]').value,
        project_details: form.querySelector('[name="project_details"]').value
      };

      const submitBtn = form.querySelector('.form-submit');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending Enquiry...';
      }
      if (status) {
        status.textContent = 'Submitting your project details...';
        status.style.color = '#718096';
      }

      fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(formData)
      })
      .then(() => {
        if (status) {
          status.textContent = 'Thank you! Your project enquiry has been sent successfully.';
          status.style.color = '#10b981';
        }
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      })
      .catch(error => {
        console.error('Submission Error:', error);
        if (status) {
          status.textContent = 'There was an error submitting your form. Please try again.';
          status.style.color = '#ef4444';
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      });
    });
  }
})();
