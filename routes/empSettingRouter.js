const express = require("express");
const router = express.Router();
const {
  insertEmployee,
  insertEmployeeSettings,
  findAllEmployees,
  findEmployeeSettings,
} = require("../controllers/OneToOne");

// Create an employee

router.post("/employee", async (req, res, next) => {
  try {
   const {name, position, email, wage} = req.body.employee
    console.log(name);
    if (!name || !position || !wage) {
      return res.sendStatus(400);
    }

    const employee = await insertEmployee(name, position, email, wage);
    res.json({ message: "Employee created." })
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

// add an employee settings

router.post("/employee-settings", async (req, res, next) => {
  try {
    const { EmployeeId, theme, autoLogin} = req.body.settings

    if (!EmployeeId || !theme || !autoLogin) {
      return res.sendStatus(400);
    }

    const settings = await insertEmployeeSettings(
      theme,
      autoLogin,
      EmployeeId
    ).then(() => res.json({ message: "settings created." }));
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

// Get all employees including settings.

router.get("/employee-settings", async (req, res, next) => {
  try {
    const employees = await findAllEmployees();
    res.status(200).json({ employees: employees });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// Get an employee settings

router.param("employeeId", async (req, res, next, employeeId) => {
  try {
    const employee = await findEmployeeSettings(employeeId);
    console.log(employee);
    req.employee = employee;
    next(); // go to router.get('/employee-settings/:employeeId')
  } catch (e) {
    console.log(e);
    res.sendStatus(404);
  }
});

router.get("/employee-settings/:employeeId", (req, res, next) => {
  res.status(200).json({ employee: req.employee });
});

module.exports = router;
