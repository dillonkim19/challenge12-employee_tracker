const db = require("../db/connection")
const { prompt } = require("inquirer");
const { viewAllDepartments } = require("./departments");

async function viewAllRoles() {
    try {
        const role = 
            await db.query('SELECT role.id, title, department.name as department, salary FROM role LEFT JOIN department ON role.department_id = department.id')
        // console.log(departments)
        return role
    } catch (err) {
        console.log(err)
    }
}

async function addRole() {
    try {

        const departments = await viewAllDepartments();

        const { title, salary, departmentId } = await prompt(
            [
                {
                    type: "input",
                    name: "title",
                    message: "What is the role's title?"
                },
                {
                    type: "input", 
                    name: "salary",
                    message: "What is the role's salary?"
                },
                {
                    type: "list",
                    name: "departmentId",
                    message: "What is the role's departmentId?",
                    choices: departments.map(department => {
                        return {
                            value: department.id,
                            name: department.name
                        }
                    }) 
                },
            ]
        )

        await db.query(`INSERT into role (title, salary, department_id) VALUES ("${title}", "${salary}", ${departmentId})`)
        
        const newRoles = await viewAllRoles()
        
        return newRoles
    } catch (err) {
        console.log(err)
    }
}

module.exports = { viewAllRoles, addRole }