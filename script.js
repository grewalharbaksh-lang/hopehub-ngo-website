// HopeHub interactions: mobile navigation, reveal effects, counters and demo form.
const menuToggle = document.querySelector("#menuToggle");
const primaryNav = document.querySelector("#primaryNav");

menuToggle.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

primaryNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    primaryNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

// Fade content into view as visitors scroll.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

// Count up the illustrative impact figures once they enter the viewport.
const counters = document.querySelectorAll(".counter");
function animateCounter(element) {
  const target = Number(element.dataset.target);
  const duration = 1300;
  const startTime = performance.now();

  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.round(target * eased).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
    else element.textContent = target.toLocaleString() + "+";
  }
  requestAnimationFrame(update);
}

if ("IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach((counter) => counterObserver.observe(counter));
} else {
  counters.forEach((counter) => animateCounter(counter));
}

// Front-end demo only: no information is transmitted or stored.
const volunteerForm = document.querySelector("#volunteerForm");
const formFeedback = document.querySelector("#formFeedback");

volunteerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!volunteerForm.reportValidity()) return;
  const name = document.querySelector("#fullName").value.trim();
  formFeedback.textContent = `Thank you, ${name}! Your demo interest has been recorded on this page only.`;
  volunteerForm.reset();
});
