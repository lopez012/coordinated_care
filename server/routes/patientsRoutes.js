const express = require("express");
const router = express.Router();
const patientsController = require("../controllers/patientsController");
const upload = require("../config/upload");

// // GET request for list of all patients
router.get("/patients", patientsController.all_patients);

//router.put("/patients/updateBilling/:_id", patientsController.update_billing_employee);

// GET request for list of all patient names
router.get("/patients/all_patient_names", patientsController.all_patient_names);

// // POST request for creating a patient
router.post("/patients/add-new", patientsController.create_patient);

router.put("/patients/update_billing/:_id", patientsController.update_billing);

// // GET request for retrieving a patient
// router.get("/patients/:_id", patientsController.get_patient);

// // PUT request for updating a patient
// router.put("/patients/:_id", patientsController.update_patient);
router.get("/patients/:_id", patientsController.getPatient);

// POST request for uploading a document for a patient
router.post("/patients/:_id/files/upload", upload.single("fileId"), patientsController.upload_file);

// GET request for retrieving a document for a patient
router.get("/patients/files/:fileId", patientsController.getPatientDocument);

// GET request for retrieving all documents for a patient
router.get("/patients/:_id/documents", patientsController.getPatientDocuments);

module.exports = router;
