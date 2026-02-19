const form = document.getElementById('contactForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Grab all fields at once
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  // Fix checkbox + radio edge cases
  data.patient_consent = document.getElementById('consent').checked; // boolean true/false
  data.patient_gender = document.querySelector('input[name="patient_gender"]:checked')?.value || "";

  // (Optional) convert height to a number if filled
  if (data.patient_height === "") {
    data.patient_height = "";
  } else {
    data.patient_height = Number(data.patient_height);
  }

  try {
    const response = await fetch('/api/register-patient', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    alert(result.message);

    if (response.ok) {
        message.textContent = result.message || "Registration successful!";
        message.style.color = "green";
      
        setTimeout(() => {
          form.reset();
        }, 1500);
      }
  } catch (err) {
    console.error(err);
    alert("Server error. Try again.");
  }


});
