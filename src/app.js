const express = require('express');
const cors = require('cors');
const config = require('./configuration')
const { router } = require('./routes');
const { initDatabase } = require('./db/config');

const app = express();
const host = config.HOST || 'localhost';
const port = config.PORT || 3000;

// Initialize database
initDatabase()

// app.use(express.static(__dirname + '/public'));
app.use('/public', express.static('public'));

app.use(cors())
app.set('view engine', 'ejs');
app.use(express.urlencoded())


app.use("/", router)

app.all('*', (req, res) => {
    res.render('404');
});


app.listen(port, () => {
  return console.log(`Express is listening at ${host}:${port}`);
});
