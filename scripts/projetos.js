const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("project--show");
    }
  });
});

document.querySelectorAll(".project").forEach((section) => {
  section.classList.add("project--hidden");
  projectObserver.observe(section);
});

document.querySelectorAll(".project__title").forEach((title) => {
  title.style.cursor = "pointer";

  title.addEventListener("click", () => {
    const content = title.nextElementSibling;
    content.classList.toggle("project__content--open");
  });
});

document.querySelectorAll(".gallery__image").forEach((img) => {
  img.style.cursor = "zoom-in";

  img.addEventListener("click", () => {
    const overlay = document.createElement("div");
    overlay.className = "lightbox";
    overlay.innerHTML = `
      <div class="lightbox__content">
        <img src="${img.src}" alt="" />
      </div>
    `;
    overlay.addEventListener("click", () => overlay.remove());
    document.body.appendChild(overlay);
  });
});

const backBtn = document.createElement("button");
backBtn.id = "toTop";
backBtn.textContent = "↑";
document.body.appendChild(backBtn);

backBtn.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);

window.addEventListener("scroll", () => {
  backBtn.classList.toggle("show", window.scrollY > 400);
});

document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const circle = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    circle.style.width = circle.style.height = `${size}px`;
    circle.style.left = `${e.clientX - rect.left - size / 2}px`;
    circle.style.top = `${e.clientY - rect.top - size / 2}px`;
    circle.className = "ripple";
    this.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  });
});
