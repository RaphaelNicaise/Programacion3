#!/bin/bash

echo "🌱 Ejecutando seeders para poblar la base de datos..."

# Limpiar la base de datos
echo "🧹 Limpiando datos existentes..."
docker-compose exec database psql -U app_user -d app_database -c "TRUNCATE categorias, productos, movimientos_inventario RESTART IDENTITY CASCADE;" > /dev/null

# Ejecutar seeders
echo "📥 Insertando datos de ejemplo..."
docker-compose exec backend npx sequelize-cli db:seed:all

# Verificar resultados
echo "✅ Verificando datos insertados..."
echo "Categorías:"
docker-compose exec database psql -U app_user -d app_database -c "SELECT id, nombre FROM categorias;"

echo -e "\nProductos (primeros 5):"
docker-compose exec database psql -U app_user -d app_database -c "SELECT id, nombre, codigo, stock_actual FROM productos LIMIT 5;"

echo -e "\nMovimientos (primeros 5):"
docker-compose exec database psql -U app_user -d app_database -c "SELECT id, producto_id, tipo_movimiento, cantidad FROM movimientos_inventario LIMIT 5;"

echo -e "\n🎉 ¡Seeders ejecutados exitosamente!"
