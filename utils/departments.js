const db = require("../db/connection")
const { prompt } = require("inquirer");

async function viewAllDepartments() {
    try {
        const departments = 
            await db.query('SELECT id, name FROM department ORDER BY id')
        // console.log(departments)
        return departments
    } catch (err) {
        console.log(err)
    }
}

async function addDepartment() {
    try {

        const { department } = await prompt(
            [
                {
                    type: "input",
                    name: "department",
                    message: "What is the name of the department?"
                },
                
            ]
        )

        await db.query(`INSERT into department (name) VALUES ("${department}")`)
        
        const newDepartments = await viewAllDepartments()
        
        return newDepartments
    } catch (err) {
        console.log(err)
    }
}

module.exports = { viewAllDepartments, addDepartment }