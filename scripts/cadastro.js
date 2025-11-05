const tabs = document.querySelectorAll(".signup__tab");
const contents = document.querySelectorAll(".signup__content");
const form = document.getElementById("signup_form");
const ngoForm = document.getElementById("signup_form");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const targetTab = tab.dataset.tab;

    // Remove active class from all tabs and contents
    tabs.forEach((t) => t.classList.remove("signup__tab--active"));
    contents.forEach((c) => c.classList.remove("signup__content--active"));

    // Add active class to clicked tab and corresponding content
    tab.classList.add("signup__tab--active");
    document
      .querySelector(`[data-content="${targetTab}"]`)
      .classList.add("signup__content--active");
  });
});

// Password strength indicator
function updatePasswordStrength(passwordInput, strengthBar) {
  passwordInput.addEventListener("input", (e) => {
    const password = e.target.value;
    const strength = calculatePasswordStrength(password);

    strengthBar.className = "signup__password-strength-bar";

    if (password.length === 0) {
      strengthBar.classList.remove(
        "signup__password-strength-bar--weak",
        "signup__password-strength-bar--medium",
        "signup__password-strength-bar--strong"
      );
    } else if (strength < 30) {
      strengthBar.classList.add("signup__password-strength-bar--weak");
    } else if (strength < 60) {
      strengthBar.classList.add("signup__password-strength-bar--medium");
    } else {
      strengthBar.classList.add("signup__password-strength-bar--strong");
    }
  });
}

function calculatePasswordStrength(password) {
  let strength = 0;

  if (password.length >= 8) strength += 25;
  if (password.match(/[a-z]+/)) strength += 15;
  if (password.match(/[A-Z]+/)) strength += 15;
  if (password.match(/[0-9]+/)) strength += 20;
  if (password.match(/[^a-zA-Z0-9]+/)) strength += 25;

  return strength;
}

// Initialize password strength indicators
const passwordInput1 = document.getElementById("password");
const strengthBar1 = document.getElementById("strengthBar");
updatePasswordStrength(passwordInput1, strengthBar1);

const passwordInput2 = document.getElementById("password_to_register");
const strengthBar2 = document.getElementById("strengthBar2");
updatePasswordStrength(passwordInput2, strengthBar2);

const submitBtn = document.getElementsByClassName("signup__button");

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

async function handleSubmit(e) {
  // Let native HTML5 check validity first
  if (!form.checkValidity()) {
    // If invalid, let browser display validation UI
    return;
  }

  e.preventDefault(); // take control (progressive enhancement)

  // Disable UI
  submitBtn.disabled = true;

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
}

form.addEventListener("submit", handleSubmit);
ngoForm.addEventListener("submit", handleSubmit);
