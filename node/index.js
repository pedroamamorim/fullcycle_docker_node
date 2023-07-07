const express = require('express')
const db = require("./db");
const app = express()
app.use(express.json())
const port = 3000

app.post('/insert', async (request, response) => {
    console.log('INSERT INTO PEOPLE');
    const { name } = request.body;
    const result = await db.insertPerson({name: name});
    console.log(result);
    response.send(result)
})

app.put('/update', async (request, response) => {
    console.log('UPDATE PEOPLE');
    const { id, name } = request.body;
    const result2 = await db.updatePerson(id, {name: name});
    console.log(result2);
    response.send(result2)
})

app.delete('/delete', async (request, response) => {
    console.log('DELETE FROM PEOPLE');
    const { id } = request.body;
    const result3 = await db.deletePerson(id);
    console.log(result3);
    response.send(result3)
})


app.get('/', async (request, response) => {
    console.log('SELECT * FROM PEOPLE');
    const people = await db.selectPeople();
    console.log(people);
    const title = '<h1>Full Cycle Rocks!</h1>';
    const subtitle = '<br><br><h3>Names from table People</h3><br>'
    const list = `
        <ul>
        ${people.map(person => `<li>${person.name}</li>`).join('')}
        </ul>
        `;

    response.send(title + subtitle + list);
})

app.listen(port, () => {
    const people = db.initTable();
    console.log('Running on port ' + port)
})