// CRUD example from https://backefront.com.br/como-fazer-post-nodejs/
async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
 
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection({
        host: 'db',
        user: 'root',
        password: 'root',
        database: 'db'
    });
    console.log("Connected to MySQL!");
    global.connection = connection;
    return connection;
}

async function selectPeople(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM people;');
    return rows;
}

async function insertPerson(person){
    const conn = await connect();
    const sql = 'INSERT INTO people(name) VALUES (?);';
    const values = [person.name];
    return await conn.query(sql, values);
}

async function updatePerson(id, person){
    const conn = await connect();
    const sql = 'UPDATE people SET name=? WHERE id=?';
    const values = [person.name, id];
    return await conn.query(sql, values);
}

async function deletePerson(id){
    const conn = await connect();
    const sql = 'DELETE FROM people where id=?;';
    return await conn.query(sql, [id]);
}

async function initTable(){
    const conn = await connect();
    await conn.query('CREATE TABLE IF NOT EXISTS people (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(100), PRIMARY KEY (id));');
    const table = await selectPeople()
    if (table.length == 0) {
        await insertPerson({name: "Nome1"})
        await insertPerson({name: "Nome2"})
        await insertPerson({name: "Nome3"})
        await insertPerson({name: "Pedro"})
    } 
    return;
}

module.exports = {selectPeople, insertPerson, updatePerson, deletePerson, initTable}