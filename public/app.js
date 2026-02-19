const form = document.getElementById('contactForm');
const message = document.getElementById('form-message');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  data.patient_consent = document.getElementById('consent').checked;
  data.patient_gender = document.querySelector('input[name="patient_gender"]:checked')?.value || "";
  data.patient_height = data.patient_height === "" ? "" : Number(data.patient_height);

  try {
    const response = await fetch('/api/register-patient', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      // Show message on page
      message.textContent = result.message || "Registration successful!";
      message.style.color = "green";
      message.style.opacity = "1";

      // Show alert popup
      alert(result.message || "Registration successful!");

      setTimeout(() => {
        form.reset();
      }, 1500);

      setTimeout(() => {
        message.style.opacity = "0";
      }, 3000);

    } else {
      message.textContent = result.message || "Registration failed.";
      message.style.color = "red";
      message.style.opacity = "1";

      alert(result.message || "Registration failed.");
    }

  } catch (err) {
    console.error(err);

    message.textContent = "Server error. Try again.";
    message.style.color = "red";
    message.style.opacity = "1";

    alert("Server error. Try again.");
  }
});
