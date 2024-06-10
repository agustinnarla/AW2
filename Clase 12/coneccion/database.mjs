import pg from 'pg'


export const pool = new pg.Pool({
    host: "192.169.0.86",
    user: "root",
    password: "pass",
    database: "tienda",
    port: 5432
}
)