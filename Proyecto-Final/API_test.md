# 🔧 Guía de Testing API con Postman

Instrucciones para probar la API REST del backend usando **Postman**.

---

## 🚀 Configuración Inicial

1. Abre Postman.
2. Crea una nueva **Collection** llamada `Stock Manager API`.
3. Define una variable de entorno en Postman:
   - Nombre: `base_url`
   - Valor: `http://localhost:3001/api`

---

## 🔍 Health Checks y Verificación

### Verificar que el backend esté funcionando

- **Método:** `GET`
- **URL:** `{{base_url}}/health`
- **Headers:** Ninguno
- **Body:** Ninguno

**Respuesta esperada:**
```json
{
  "status": "OK",
  "message": "API funcionando correctamente",
  "timestamp": "2024-XX-XXTXX:XX:XX.XXXZ",
  "environment": "development"
}
```

---

## 👤 Autenticación

### Login de Usuario

- **Método:** `POST`
- **URL:** `{{base_url}}/login`
- **Headers:**  
  - `Content-Type: application/json`
- **Body:**  
  Selecciona `raw` y elige `JSON`, luego coloca:
```json
{
  "username": "admin1",
  "password": "12345678"
}
```

**Respuesta esperada:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin1",
    "role": "admin",
    "permissions": ["read", "write"]
  }
}
```

> **Tip:** Guarda el token en una variable de entorno Postman llamada `token` para usarlo en las siguientes peticiones.

---

## 📦 Productos

### Obtener todos los productos

- **Método:** `GET`
- **URL:** `{{base_url}}/productos`
- **Headers:**  
  - `Authorization: Bearer {{token}}`

**Respuesta esperada:**
```json
[
  {
    "id": 1,
    "nombre": "Teclado Mecánico",
    "precioCompra": "50.00",
    "precioVenta": "75.00",
    "stock": 10,
    "idCategoria": 1,
    "activo": true,
    "idUsuario": 1
  },
  // ...otros productos
]
```

### Crear un producto

- **Método:** `POST`
- **URL:** `{{base_url}}/productos`
- **Headers:**  
  - `Authorization: Bearer {{token}}`
  - `Content-Type: application/json`
- **Body:**  
```json
{
  "nombre": "Mouse Gamer",
  "precioCompra": 20,
  "precioVenta": 35,
  "stock": 15,
  "idCategoria": 1,
  "idUsuario": 1,
  "activo": true
}
```

**Respuesta esperada:**
```json
{
  "id": 3,
  "nombre": "Mouse Gamer",
  "precioCompra": "20.00",
  "precioVenta": "35.00",
  "stock": 15,
  "idCategoria": 1,
  "activo": true,
  "idUsuario": 1
}
```

---

## 📂 Categorías

### Obtener todas las categorías

- **Método:** `GET`
- **URL:** `{{base_url}}/categorias`
- **Headers:**  
  - `Authorization: Bearer {{token}}`

**Respuesta esperada:**
```json
[
  {
    "id": 1,
    "nombre": "Electrónica",
    "descripcion": "Productos electrónicos",
    "idUsuario": 1
  },
  {
    "id": 2,
    "nombre": "Alimentos",
    "descripcion": "Productos comestibles",
    "idUsuario": 1
  }
]
```

### Crear una categoría

- **Método:** `POST`
- **URL:** `{{base_url}}/categorias`
- **Headers:**  
  - `Authorization: Bearer {{token}}`
  - `Content-Type: application/json`
- **Body:**  
```json
{
  "nombre": "Limpieza",
  "descripcion": "Productos de limpieza",
  "idUsuario": 1
}
```

**Respuesta esperada:**
```json
{
  "id": 3,
  "nombre": "Limpieza",
  "descripcion": "Productos de limpieza",
  "idUsuario": 1
}
```

---

## 🔄 Movimientos

### Obtener todos los movimientos

- **Método:** `GET`
- **URL:** `{{base_url}}/movimientos`
- **Headers:**  
  - `Authorization: Bearer {{token}}`

**Respuesta esperada:**
```json
[
  {
    "id": 1,
    "tipo": "entrada",
    "cantidad": 10,
    "observaciones": "Compra inicial de teclados",
    "fecha": "2024-07-11T10:04:00.000Z",
    "idProducto": 1,
    "idUsuario": 1,
    "idProveedor": null
  }
  // ...otros movimientos
]
```

### Crear un movimiento

- **Método:** `POST`
- **URL:** `{{base_url}}/movimientos`
- **Headers:**  
  - `Authorization: Bearer {{token}}`
  - `Content-Type: application/json`
- **Body:**  
```json
{
  "tipo": "entrada",
  "cantidad": 5,
  "observaciones": "Reposición de stock",
  "fecha": "2024-07-15T12:00:00.000Z",
  "idProducto": 1,
  "idUsuario": 1,
  "idProveedor": null
}
```

**Respuesta esperada:**
```json
{
  "id": 4,
  "tipo": "entrada",
  "cantidad": 5,
  "observaciones": "Reposición de stock",
  "fecha": "2024-07-15T12:00:00.000Z",
  "idProducto": 1,
  "idUsuario": 1,
  "idProveedor": null
}
```

---

## ❌ Ejemplo de error de autenticación

- **Método:** `GET`
- **URL:** `{{base_url}}/productos`
- **Headers:**  
  - (No incluyas el header `Authorization`)

**Respuesta esperada:**
```json
{
  "error": "Token de acceso requerido"
}
```

---

## 📝 Notas

- Usa la variable `{{token}}` en Postman para el header `Authorization` en todas las rutas protegidas.
- Puedes importar estos ejemplos como requests en tu colección de Postman.
- Cambia los valores de ejemplo según los datos de tu base de datos.

---
