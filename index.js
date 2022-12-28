
const { prompt } = require("inquirer");
const db = require("./db/connection");
const { viewAllDepartments, addDepartment } = require("./utils/departments")
const { viewAllEmployees, addEmployee, updateRole } = require("./utils/employees")
const { viewAllRoles, addRole } = require("./utils/roles")

mainMenu = [
    {
        type: "list",
        name: "choice", 
        message: "What would you like to do?",
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ]
    }
]

const start = async () => {
    
    const { choice } = await prompt(mainMenu);

    switch (choice) {
        case 'View all departments':
            const departments = await viewAllDepartments()
            console.table(departments)
            break;
            
        case 'View all roles':
            const roles = await viewAllRoles()
            console.table(roles)
            break;

        case 'View all employees':
            const employees = await viewAllEmployees()
            console.table(employees)
            break;

        case 'Add a department':
            const newDepartments = await addDepartment()
            console.table(newDepartments)
            break;

        case 'Add a role':
            const newRoles = await addRole()
            console.table(newRoles)
            break;

        case 'Add an employee':
            const newEmployees = await addEmployee()
            console.table(newEmployees)
            break;

        case 'Update an employee role':
            const updatedEmployees = await updateRole()
            console.table(updatedEmployees)
            break;

        case 'Exit':
            console.log('Goodbye!')
            process.exit();
    }
    start();

    
}

console.log("Welcome to the Employee Manager!");
start();
