const express = require('express');
const router = express.Router;
const cors = require('cors');
const bodyParser = require('body-parser')
const db = require('./queries');

const app = express();
const port = 3000;

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

//I added this to allow cross origin requests
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors({origin:true,credentials: true}));

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
});

app.get('/movies', db.getAllMovie);
app.get('/movies/:id', db.getSingleMovie);
app.post('/movies', db.createMovie);
app.put('/movies/:id', db.updateMovie);
app.put('/director/:id', db.updateDirector);
app.delete('/movies/:id', db.removeMovie);

module.exports = router;

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});
