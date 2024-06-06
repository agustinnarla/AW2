import pg from 'pg'
const {Pool} = pg 

export const pool = new pg.Pool({
    host: "localhost",
    user: "root",
    password: "pass",
    database: "tienda",
    port: 5432
}
)