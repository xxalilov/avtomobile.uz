import {Pool} from 'pg';

const pool = new Pool({
    user: "postgres",
    database: "avtomobile.uz",
    password: "postgres",
    port: 5432,
    host: 'localhost'
})

export default pool;