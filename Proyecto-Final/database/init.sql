-- Archivo de inicialización de la base de datos
-- Este archivo se ejecuta automáticamente cuando se crea el contenedor de PostgreSQL

-- Crear tabla de categorías
CREATE TABLE IF NOT EXISTS categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

-- Crear tabla de productos
CREATE TABLE IF NOT EXISTS productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    stock_actual INTEGER NOT NULL DEFAULT 0,
    stock_minimo INTEGER NOT NULL DEFAULT 0,
    activo BOOLEAN NOT NULL DEFAULT true,
    categoria_id INTEGER NOT NULL REFERENCES categorias(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

-- Crear tabla de movimientos de inventario
CREATE TABLE IF NOT EXISTS movimientos_inventario (
    id SERIAL PRIMARY KEY,
    producto_id INTEGER NOT NULL REFERENCES productos(id),
    tipo_movimiento VARCHAR(20) NOT NULL CHECK (tipo_movimiento IN ('entrada', 'salida', 'ajuste')),
    cantidad INTEGER NOT NULL,
    stock_anterior INTEGER NOT NULL,
    stock_nuevo INTEGER NOT NULL,
    fecha_movimiento TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos iniciales básicos
INSERT INTO categorias (nombre, descripcion) VALUES
    ('Electrónicos', 'Dispositivos electrónicos'),
    ('Hogar', 'Artículos para el hogar'),
    ('Oficina', 'Artículos de oficina');

INSERT INTO productos (nombre, codigo, descripcion, precio, stock_actual, stock_minimo, categoria_id) VALUES
    ('Laptop', 'LAP001', 'Laptop básica', 500.00, 10, 2, 1),
    ('Mouse', 'MOU001', 'Mouse inalámbrico', 25.00, 50, 5, 1),
    ('Silla', 'SIL001', 'Silla de oficina', 150.00, 8, 2, 3),
    ('Mesa', 'MES001', 'Mesa de trabajo', 200.00, 5, 1, 2);

INSERT INTO movimientos_inventario (producto_id, tipo_movimiento, cantidad, stock_anterior, stock_nuevo, fecha_movimiento) VALUES
    (1, 'entrada', 15, 0, 15, CURRENT_TIMESTAMP),
    (2, 'entrada', 60, 0, 60, CURRENT_TIMESTAMP),
    (3, 'entrada', 10, 0, 10, CURRENT_TIMESTAMP),
    (4, 'entrada', 8, 0, 8, CURRENT_TIMESTAMP),
    (1, 'salida', 5, 15, 10, CURRENT_TIMESTAMP),
    (2, 'salida', 10, 60, 50, CURRENT_TIMESTAMP);

-- Mensaje de confirmación
SELECT 'Base de datos inicializada correctamente' AS status;
