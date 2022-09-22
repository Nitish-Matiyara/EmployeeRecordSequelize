const db = require("../connections/db");

const Employee = db.Employee;

module.exports = {
  insertEmployee,
  updateEmployee,
  getOneEmployee,
  getAllEmployees,
  deleteEmployee,
};

async function insertEmployee(name, email ) {
 const employee =  await Employee.create({ name,  email})
  return employee;
}

async function updateEmployee(name, email,  id) {
  await Employee.update({ name, email,  }, { where: { id: id } });
}

async function getOneEmployee(id) {
  const employee = await Employee.findByPk(id);

  return employee;
}

async function getAllEmployees() {
  const employees = await Employee.findAll();

  return employees;
}

async function deleteEmployee(id) {
  const employee = await getOneEmployee(id);

  await employee.destroy();
}
