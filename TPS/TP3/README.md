# GRUPO 14

## 👥 INTEGRANTES 
#### - Cordano, Nicolas
#### - Grgurich, Abner
#### - Nicaise, Raphael
#### - Segal, Santiago

## 🛠️ INSTALACIÓN DEL PROYECTO

### Pasos para correr el proyecto

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/RaphaelNicaise/Programacion3.git
2. **Instalar las dependencias**
    ```
    npm install
3. **Creacion de archivo .env**  
    Para evitar problemas se debe cambiar el archivo .env.template a .env, o crear un archivo .env con los datos que se encuentran .env.template
4. **Inicializar el proyecto**
    ```bash
    npm run dev

📌Recordatorio: La contraseña en el archivo .env debe ser mayor a 8 carácteres
## 📋 ENDPOINT PARA OBTENER EL TOKEN Y CONSEGUIR EL AUTH

### `GET /api/v1/login`
![login-obtener-token](https://raw.githubusercontent.com/RaphaelNicaise/Programacion3/main/TPS/TP3/images/login/post-login-obtener-token.jpg)
Y se coloca en el header, en la parte de Authorization (se usa de ejemplo el GET en api/v1/login)
![login-obtener-token](https://raw.githubusercontent.com/RaphaelNicaise/Programacion3/main/TPS/TP3/images/login/insertar-token-obtenido.jpg)
## 📋 ENDPOINTS PARA PACIENTES

### `GET /api/v1/pacientes`
###### Devuelve un listado con todos los pacientes.
![get-pacientes](https://raw.githubusercontent.com/RaphaelNicaise/Programacion3/main/TPS/TP3/images/pacientes/get-pacientes.jpg)

### `DELETE /api/v1/pacientes/:id`
###### Elimina un paciente utilizando su ID.
![delete-paciente](https://raw.githubusercontent.com/RaphaelNicaise/Programacion3/main/TPS/TP3/images/pacientes/delete-paciente.jpg)

### `PUT /api/v1/pacientes/:id`
###### Modifica los datos de un paciente. Requiere `dni`, `nombre`, `apellido` y `email` en el body del JSON.
![put-paciente](https://raw.githubusercontent.com/RaphaelNicaise/Programacion3/main/TPS/TP3/images/pacientes/put-paciente.jpg)

### `POST /api/v1/pacientes`
###### Crea un nuevo paciente. Requiere `id`, `dni`, `nombre`, `apellido` y `email`.
![post-paciente](https://raw.githubusercontent.com/RaphaelNicaise/Programacion3/main/TPS/TP3/images/pacientes/post-paciente.jpg)


## ENDPOINTS PARA TURNOS

### `GET /api/v1/turnos`
###### Devuelve un listado de todos los turnos registrados.
![get-turnos](https://raw.githubusercontent.com/RaphaelNicaise/Programacion3/main/TPS/TP3/images/turnos/get-turnos.jpg)

### `GET /api/v1/turnos/paciente/:idPaciente`
###### Devuelve todos los turnos de un paciente mediante su ID
![get-turnos-pacienteID](https://raw.githubusercontent.com/RaphaelNicaise/Programacion3/main/TPS/TP3/images/turnos/get-turnos-idPaciente.jpg)

### `DELETE /api/v1/turnos/:id`
###### Elimina un turno utilizando el ID del turno.
![delete-turno](https://raw.githubusercontent.com/RaphaelNicaise/Programacion3/main/TPS/TP3/images/turnos/delete-turno.jpg)

### `POST /api/v1/turnos`
###### Crea un nuevo turno. Requiere `id`, `fecha`. `hora`, `motivo` y el `ID del paciente`en el body del JSON
![post-turno](https://raw.githubusercontent.com/RaphaelNicaise/Programacion3/main/TPS/TP3/images/turnos/post-turno.jpg)

