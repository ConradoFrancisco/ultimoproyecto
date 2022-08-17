const express = require("express");
const morgan = require("morgan")
const mysql = require("mysql")
const myConn = require("express-myconnection")
const app = express();
const path = require("path")
const passport = require('passport')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')
module.exports = app


//inicializacion
const passport1 = require("./passport/passport")


// configuraciones express
app.set("port", process.env.PORT || 3000)
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "vistas"))

//coneccion a base de datos
app.use(morgan('dev')) 
const conexion = app.use(myConn(mysql,{
    host: "localhost",
    user:"root",
    password:"",
    port: 3306,
    database:"usuariosEmpleadosSucursales"
}))
app.use(session({
    secret:'nodesql',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(conexion)
}));
app.use(passport.initialize())
app.use(passport.session());
app.use(express.urlencoded({extended:true}))


// importado de las rutas
const rutasCustomer = require("./rutas/usuarios");
const { urlencoded } = require("express");



//Rutas
app.use('/', rutasCustomer) // esta constante contiene las rutas




// Inicializando el servidor
app.listen(3000,()=>{
    console.log("Server en el puerto 3000")
});






