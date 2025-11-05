const observer = new IntersectionObserver((entries) => {
  console.log("entries: ", entries);
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document
  .querySelectorAll(".profiles__card, .feature-set__card")
  .forEach((el) => {
    observer.observe(el);
  });

const btn = document.createElement("button");
btn.textContent = "↑";
btn.id = "toTop";
document.body.appendChild(btn);
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    btn.classList.add("show");
  } else {
    btn.classList.remove("show");
  }
});

btn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

window.addEventListener("scroll", () => {
  btn.style.display = window.scrollY > 400 ? "block" : "none";
});
