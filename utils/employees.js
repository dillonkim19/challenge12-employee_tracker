const db = require("../db/connection")

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

module.exports = { viewAllEmployees }