const express = require("express");
const router = express.Router();
const {
  getAllCompaniesEmployees,
  getOneCompanyEmployees,
  insertCompany,
  insertEmployee
} = require("../controllers/OneToMany");

// Create Employee
router.post("/employee", async (req, res) => {
  try {
    const { name, position, email, wage, companyId } = req.body.employee;
    console.log(name);
    if (!name || !position || !wage) {
      return res.sendStatus(400);
    }

    const employee = await insertEmployee(name, position, email, wage, companyId);
    res.json({ message: "Employee created." });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

// Create Company
router.post("/company", async (req, res, next) => {
  try {
    const { name } = req.body.company;

    if (!name) {
      return res.sendStatus(400);
    }

    const companies = await insertCompany(
     name
    ).then(() => res.json({ message: "company created." }));
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

// Get all companies with employees

router.get("/", async (req, res, next) => {
  try {
    const companies = await getAllCompaniesEmployees();
    res.status(200).json({ companies: companies });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.param("companyId", async (req, res, next, companyId) => {
  try {
    const company = await getOneCompanyEmployees(companyId);
    req.company = company;
    next(); // go to router.get('/:companyId')
  } catch (e) {
    console.log(e);
    res.sendStatus(404);
  }
});

// Get company with its employees

router.get("/:companyId", (req, res, next) => {
  res.status(200).json({ company: req.company });
});

module.exports = router;
