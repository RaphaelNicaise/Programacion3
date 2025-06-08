# GRUPO 14


## ENDPOINTS PARA PACIENTES

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


