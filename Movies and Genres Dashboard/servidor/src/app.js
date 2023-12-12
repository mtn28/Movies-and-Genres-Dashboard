const express = require('express');
const app = express();
const filmesRoute = require('./routes/filmesRoute.js')
const generosRoute = require('./routes/generosRoute.js')
//Configurações
app.set('port', process.env.PORT || 3000);
//Middlewares
app.use(express.json());

// Configurar CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/filmes', filmesRoute);
app.use('/generos', generosRoute);

app.listen(app.get('port'), () => {
    console.log("Start server on port " + app.get('port'))
})


