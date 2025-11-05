const form = document.getElementById("loginForm");
const submitBtn = document.getElementById("submitLoginBtn");
const spinner = document.getElementById("spinner");
const status = document.getElementById("status");

// Helper: simulate network request (mock)
function fakePost(formData) {
  return new Promise((resolve) => {
    // Simulate 900ms latency
    setTimeout(() => {
      // Return a fake success response
      resolve({ ok: true, redirect: "./projetos.html" });
    }, 900);
  });
}

form.addEventListener("submit", async function (e) {
  // Let native HTML5 check validity first
  if (!form.checkValidity()) {
    // If invalid, let browser display validation UI
    return;
  }

  e.preventDefault(); // take control (progressive enhancement)

  // Disable UI
  submitBtn.disabled = true;
  spinner.classList.remove("hidden");
  status.textContent = "Entrando...";

  // Collect data using FormData (works with files too)
  const fd = new FormData(form);

  try {
    // Use fakePost to mock server. Replace with fetch() for real submission.
    const res = await fakePost(fd);

    if (res.ok) {
      status.textContent = "Você está dentro! Redirecionando…";

      // Navigate to success page. Use location.replace so Back won't resubmit
      // If you want SPA-style replaceState instead, see comment below.
      window.location.replace(res.redirect || "./projetos.html");
    } else {
      // handle server-side errors
      status.textContent = "Algo deu errado. Tente novamente mais tarde.";
      submitBtn.disabled = false;
      spinner.classList.add("hidden");
    }
  } catch (err) {
    status.textContent = "Erro de conexão — por favor teste sua conexão.";
    submitBtn.disabled = false;
    spinner.classList.add("hidden");
  }
});
