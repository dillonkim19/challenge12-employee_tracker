
const { prompt } = require("inquirer");
const db = require("./db/connection");
const { viewAllDepartments } = require("./utils/departments")
const { viewAllEmployees } = require("./utils/employees")

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
    console.log("Welcome to the Employee Manager!");
    const { choice } = await prompt(mainMenu);

    switch (choice) {
        case 'View all departments':
            const departments = await viewAllDepartments()
            console.table(departments)
            break;
        case 'View all employees':
            const employees = await viewAllEmployees()
            console.table(employees)
            break;
    }
    
}

start();
