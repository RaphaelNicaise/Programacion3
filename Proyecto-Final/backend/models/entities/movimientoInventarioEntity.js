const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const MovimientoInventario = sequelize.define('MovimientoInventario', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        producto_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'productos',
                key: 'id'
            }
        },
        tipo_movimiento: {
            type: DataTypes.ENUM('entrada', 'salida', 'ajuste'),
            allowNull: false
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        stock_anterior: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        stock_nuevo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fecha_movimiento: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'movimientos_inventario',
        timestamps: true,
        paranoid: false, // No necesitamos soft delete para movimientos
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [
            {
                fields: ['producto_id']
            },
            {
                fields: ['tipo_movimiento']
            },
            {
                fields: ['fecha_movimiento']
            },
            {
                fields: ['producto_id', 'fecha_movimiento']
            }
        ]
    });

    // Asociaciones
    MovimientoInventario.associate = (models) => {
        MovimientoInventario.belongsTo(models.Producto, {
            foreignKey: 'producto_id',
            as: 'producto'
        });
    };

    return MovimientoInventario;
};
