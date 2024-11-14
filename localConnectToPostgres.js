// var pg = require('pg');

// let conString = "postgres://postgres:Alexpg5tym@localhost:5432/postgres";

// let client = new pg.Client(conString);
// client.connect();

// var query = client.query("SELECT * FROM pgadmin");
// console.log(query);
// //fired after last row is emitted

// // query.on('row', function(row) {
// //     console.log(row);
// // });

// query.on('end', function() {
//     client.end();
// });


import pg from 'pg';
import 'dotenv-defaults/config.js'; /// Adding this automatically pulls from the .env.defaults 


const { Client } = pg;
const client = new Client();
await client.connect();
 
const res = await client.query('SELECT * FROM pgadmin;');
console.log(res.rows)
console.log(res.rows[0]); 
console.log(res.rows[0].last_name);
await client.end();