const db = require("../connections/db")
const EmployeeRecord = db.EmployeeRecord;
const Project = db.Project;

const Employee_project = db.Employee_project;


EmployeeRecord.belongsToMany(Project, { through: 'Employee_project' });
Project.belongsToMany(EmployeeRecord, { through: 'Employee_project' });

async function insertEmployee(name, position, email, wage) {
    await EmployeeRecord.create({ name, position, email, wage });
}

async function insertProject(name) {
    await Project.create({ name });
}

async function junctionCreate(EmployeeRecordId, ProjectId) {
    const employee_project = await Employee_project.create({
        EmployeeRecordId,
        ProjectId,
    });

    return employee_project;
}

async function findAllEmployees() {
    const employees = await EmployeeRecord.findAll({
        include: [
            {
                model: Project,
                
                attributes: ["name"],
                through: {
                    attributes: ["EmployeeRecordId", "ProjectId"],
                },
            },
        ],
    });

  return employees;
}

async function findEmployeeProjects(id) {
    const employee = await EmployeeRecord.findByPk(id, {
        include: [
            {
                model: Project,
                
                attributes: ["name"],
                through: {
                    attributes: ["EmployeeRecordId", "ProjectId"],
                },
            },
        ],
    });
    
    return employee;
}

async function findAllProjects() {
    const projects = await Project.findAll({
        include: [
            {
                model: EmployeeRecord,
                
                attributes: ["name"],
                through: {
                    attributes: ["EmployeeRecordId", "ProjectId"],
                },
            },
        ],
    });
    
    return projects;
}

async function findProjectEmployees(id) {
    const project = await Project.findByPk(id, {
        include: [
            {
                model: EmployeeRecord,
                
                attributes: ["name"],
                through: {
                    attributes: ["EmployeeRecordId", "ProjectId"],
                },
            },
        ],
    });
    
    return project;
}

module.exports = {
    junctionCreate,
    insertEmployee,
    insertProject,
    findAllEmployees,
    findEmployeeProjects,
    findAllProjects,
    findProjectEmployees,
};