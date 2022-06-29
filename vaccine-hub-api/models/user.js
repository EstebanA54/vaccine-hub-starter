const db = require("../db")
const {UnauthorizedError , BadRequestError} = require("../utils/errors")


class User {
    static async login(credentials){
        



        throw new UnauthorizedError("Invalid email/password combo")
    }




    static async register (credentials){
        const requiredFields = ["email","password","first_name","last_name","id","location","date"]
        requiredFields.forEach(field => {
            if (!credentials.hasOwnProperty(field))
            {
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })

        const existingUser = await User.fetchUserByEmail(credentials)
        if (existingUser){
            throw new BadRequestError(`Duplicate email: ${credentials.email}`)
        }

        const lowercasedEmail = credentials.email.toLowerCase()
        const result = await db.query(`
        INSERT INTO users (
            email,
            password,
            first_name,
            last_name,
            id,
            location,
            date
        )
        VALUES ($1, $2, $3, $4)
        RETURNING id, email, password, first_name, last_name, id, location, date, created_at;
        `  [lowercasedEmail, credentials.password, credientials.]
        )

    }
    static async fetchUserByEmail(email){
        if(!email){
            throw new BadRequestError("No email provided")
        }
        const query = `SELECT * FROM users WHERE email is = $1`

        const result = await db.query(query, [email.toLowerCase()])

        const user = result.rows[0]
        return user
    }
}




module.exports = User