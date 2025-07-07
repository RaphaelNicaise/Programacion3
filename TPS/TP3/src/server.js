const express = require('express');
const dotenv = require('dotenv');
const rutaPacientes = require('./routes/pacientes.route.js')
const home = require('./routes/home.routes.js');
const rutaTurnos = require('./routes/turnos.routes.js');
const rutaLogin = require('./routes/login.routes.js');
const rutaVista = require('./routes/views.routes.js')
const morgan = require('morgan');
const path = require('path')
const session = require('express-session');

dotenv.config()



class Server {
  constructor(template = process.env.TEMPLATE || "ejs") {
    this.app = express();
    this.port = process.env.PORT || 3001;
    this.middleware();
    //this.cors()
    this.engine(template);
    this.rutas();
  }

  /*   cors () {
    this.app.use(cors())
  } */


  engine(template) {
    try {
      require.resolve(template);
      this.app.set("view engine", template);
      this.app.set("views", path.join(__dirname, 'views', template));
    } catch (error) {
      console.log("Error al configurar el motor de plantillas:", template);
    }
  }



  middleware() {
    this.app.use(express.static(path.join(__dirname, 'views/ejs')));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(morgan("dev"));
    this.app.use(session({secret: "contraseña", resave: false, saveUninitialized: false}));

  }



  rutas() {
    this.app.use("/api/v1/pacientes", rutaPacientes);
    this.app.use("/", home);
    this.app.use("/api/v1/turnos", rutaTurnos);

    this.app.use("/api/v1/login", rutaLogin);
    // aca van las otras rutas
    this.app.use("/", rutaVista)
  }



  listen() {
    this.app.listen(this.port, () => {
      console.log(
        `Server running on port ${this.port}, host: ${process.env.HOST}:${this.port}`
      );
    });
  }
}

module.exports = Server
