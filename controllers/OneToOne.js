const db = require("../connections/db");

const Employee = db.Employee;
const Setting = db.Setting;

//One to One
Employee.hasOne(Setting);
Setting.belongsTo(Employee);



const insertEmployee = async (name, position, email, wage) => {
  return await Employee.create({ name, position, email, wage });
}

async function insertEmployeeSettings(theme, autoLogin, EmployeeId) {
  await Setting.create({ theme, autoLogin, EmployeeId });
}

async function findAllEmployees() {
  const employees = await Employee.findAll({
    include: [
      {
        model: Setting,
        attributes: ["theme", "autoLogin"],
      },
    ],
  });

  return employees;
}

async function findEmployeeSettings(id) {
  const employee = await Employee.findByPk(id, {
    include: [
      {
        model: Setting,

        attributes: ["theme", "autoLogin"],
      },
    ],
  });

  return employee;
}


module.exports = {
  insertEmployee,
  insertEmployeeSettings,
  findAllEmployees,
  findEmployeeSettings,
};
