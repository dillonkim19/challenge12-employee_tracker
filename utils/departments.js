const db = require("../db/connection")

async function viewAllDepartments() {
    try {
        const departments = 
            await db.query('SELECT * FROM department')
        // console.log(departments)
        return departments
    } catch (err) {
        console.log(err)
    }
}

module.exports = { viewAllDepartments }