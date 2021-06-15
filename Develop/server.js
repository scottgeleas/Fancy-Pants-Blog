const ex = require("express");
const hbs = require("express-handlebars");
const sql = require("mysql2");
const routes = require('./controllers/index');
const app = ex();
app.use(routes);

app.listen(3001, () => {
    console.log("server listening")
});


