const cursorGlow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", (event) => {
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

document.getElementById("year").textContent = new Date().getFullYear();

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card[data-category]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const categories = card.dataset.category;
      const shouldShow = filter === "all" || categories.includes(filter);
      card.classList.toggle("hidden", !shouldShow);
    });
  });
});

const requirementForm = document.getElementById("requirementForm");

requirementForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(requirementForm);

  const name = formData.get("name");
  const email = formData.get("email");
  const company = formData.get("company") || "Not provided";
  const projectType = formData.get("projectType");
  const budget = formData.get("budget") || "Need discussion";
  const timeline = formData.get("timeline") || "Need discussion";
  const message = formData.get("message");

  const subject = `AI Project Requirement - ${projectType}`;

  const body = `
Hello Vijay,

I would like to discuss an AI project requirement.

Name: ${name}
Email: ${email}
Company / Organization: ${company}
Project Type: ${projectType}
Budget Range: ${budget}
Timeline: ${timeline}

Requirement:
${message}

Regards,
${name}
`;

  const mailtoLink = `mailto:itsvijaykumar717@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoLink;
});
