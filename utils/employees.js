const db = require("../db/connection")
const { prompt } = require("inquirer");
const { viewAllRoles } = require("./roles");

async function viewAllEmployees() {
    try {
        const employees = 
            await db.query('SELECT * FROM employee LEFT JOIN role ON role.id = employee.role_id')
        // console.log(departments)
        return employees
    } catch (err) {
        console.log(err)
    }
} 

// const addEmployeeQs = 

async function addEmployee() {
    try {

        const roles = await viewAllRoles();
        const employees = await viewAllEmployees();

        const { firstName, lastName, role, manager } = await prompt(
            [
                {
                    type: "input",
                    name: "firstName",
                    message: "What is the employee's first name?"
                },
                {
                    type: "input", 
                    name: "lastName",
                    message: "What is the employee's last name?"
                },
                {
                    type: "list",
                    name: "role",
                    message: "What is the employee's role?",
                    choices: roles.map(role => {
                        return {
                            value: role.id,
                            name: role.title
                        }
                    }) 
                },
                {
                    type: "list",
                    name: "manager",
                    message: "Who is the empployee's manager?",
                    choices: [
                        ...employees.map(employee => {
                        return {
                            value: employee.id,
                            name: `${employee.first_name} ${employee.last_name}`
                        }
                    }),
                    {
                        value: null,
                        name: 'N/A'
                    }
                ] 
                }
            ]
        )

        await db.query(`INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", ${role}, ${manager})`)
        
        const newEmployees = await viewAllEmployees()
        
        return newEmployees
    } catch (err) {
        console.log(err)
    }
}

module.exports = { viewAllEmployees, addEmployee }