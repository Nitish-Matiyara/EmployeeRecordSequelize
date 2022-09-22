const db = require("../connections/db");

const Employee = db.Employee;
const Company = db.Company;

Company.hasMany(Employee);

Employee.belongsTo(Company);

const insertEmployee = async (name, position, email, wage, CompanyId) => {
    return await Employee.create({ name, position, email, wage });
  }
  
  async function insertCompany(name) {
    await Company.create({ name});
  }

async function getOneCompanyEmployees(id) {
  const company = await Company.findByPk(id, { include: [Employee] });

  return company;
}

async function getAllCompaniesEmployees() {
  const companies = await Company.findAll({ include: [Employee] });

  return companies;
}

module.exports = {
  getAllCompaniesEmployees,
  getOneCompanyEmployees,
  insertEmployee,
  insertCompany
};
