const db = require("../db/connection")
const { prompt } = require("inquirer");
const { viewAllRoles } = require("./roles");
const { removeListener } = require("../db/connection");

async function viewAllEmployees() {
    try {
        const employees = 
            await db.query('SELECT employee.id, employee.first_name, employee.last_name, title, department.name as department, salary, CONCAT (manag.first_name, " ", manag.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manag on employee.manager_id = manag.id')
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

async function updateRole() {
    
    try {

        const currentEmployees = 
            await db.query('SELECT * FROM employee')
        
        console.table(currentEmployees)

        const roles = await viewAllRoles();

        const { employeeId, roleId } = await prompt(
            [
                {
                    type: "list",
                    name: "employeeId",
                    message: "Which employee's role would you like to change?",
                    choices: currentEmployees.map(currentEmployee => {
                        // return currentEmployee.id
                        return {
                            value: currentEmployee.id,
                            name: `${currentEmployee.first_name} ${currentEmployee.last_name}`
                        }
                    }) 
                },
                {
                    type: "list",
                    name: "roleId",
                    message: "What role will the employee change to?",
                    choices: roles.map(role => {
                        return {
                            value: role.id,
                            name: role.title
                        }
                    }) 
                },

            ]
        )

        console.log("roleid = ", roleId)
        console.log("employeeid = ", employeeId)

        await db.query(`UPDATE employee SET role_id = ${roleId} WHERE id = ${employeeId}`)
        
        const newEmployees = await viewAllEmployees()
        
        return newEmployees

    } catch (err) {

    }
    
}

module.exports = { viewAllEmployees, addEmployee, updateRole }