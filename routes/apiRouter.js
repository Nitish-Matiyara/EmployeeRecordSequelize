const express = require("express");
const {
  insertEmployee,
  updateEmployee,
  getOneEmployee,
  getAllEmployees,
  deleteEmployee,
} = require("../controllers/employeeInfoController");

const router = express.Router();

// Get all employees -----READ-----
router.get("/", async (req, res, next) => {
  try {
    const employees = await getAllEmployees();
    res.status(200).json({ employees: employees });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.param("employeeId", async (req, res, next, employeeId) => {
  try {
    const employee = await getOneEmployee(employeeId);
    req.employee = employee;
    next(); // go to apiRouter.get('/:employeeId')
  } catch (e) {
    console.log(e);
    res.sendStatus(404);
  }
});

// Get an employee
router.get("/:employeeId", (req, res, next) => {
  res.status(200).json({ employee: req.employee });
});

//--- CREATE an employee-------
router.post("/", async (req, res, next) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.sendStatus(400);
    }

    const employee = await insertEmployee(name, email).then(
      () => res.json({ message: "Employee created." })
    );
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

//----UPDATE an employee-------------
router.put("/:employeeId", async (req, res, next) => {
  try {
    const { name, email, employeeId } = req.body;
    if (!name || !email) {
      return res.sendStatus(400);
    }

    const employee = await updateEmployee(
      name,
      email,
      employeeId
    ).then(() => {
      return getOneEmployee(employeeId);
    });
    res.json({ employee: employee });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

//----DELETE an employee-------------
router.delete("/:employeeId", async (req, res, next) => {
  try {
    const employeeId = req.params.employeeId;
    const response = await deleteEmployee(employeeId);
  res.status(200).send("Employee Deleted"); 
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
