const express = require('express');
const cors = require('cors');

const app = express();


app.use(cors());
app.use(express.json()); 
app.use(express.static('public'));


app.post('/api/register-patient', (req, res) => {
  const patientData = req.body;

  console.log("New Patient Received:", patientData);


  if (!patientData.patient_name || !patientData.patient_email || !patientData.patient_password || !patientData.patient_dob || !patientData.patient_consent) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  return res.status(200).json({ message: "Registration successful!" });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
