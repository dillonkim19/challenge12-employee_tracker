const db = require("../db/connection")

async function viewAllRoles() {
    try {
        const role = 
            await db.query('SELECT * FROM role')
        // console.log(departments)
        return role
    } catch (err) {
        console.log(err)
    }
}

module.exports = { viewAllRoles }