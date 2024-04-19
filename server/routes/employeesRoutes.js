const express = require("express");
const router = express.Router();
const employeesController = require("../controllers/employeesController");

// // GET request for list of all employees
// router.get("/employees", employeesController.all_employees);

// GET request for list of all physician names
router.get("/employees/all_physician_names", employeesController.all_physician_names);

// // POST request for creating an employee
// router.post("/employees/", employeesController.create_employee);

// // GET request for retrieving an employee
// router.get("/employees/:_id", employeesController.get_employee);

// Get request for retrieving an employee id by email (used when setting cookie
router.get("/employees/:email", employeesController.get_employee_by_email);

// // PUT request for updating an employee
// router.put("/employees/:_id", employeesController.update_employee);

module.exports = router;
