const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Producto = sequelize.define('Producto', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        codigo: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00
        },
        stock_actual: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        stock_minimo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        categoria_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'categorias',
                key: 'id'
            }
        }
    }, {
        tableName: 'productos',
        timestamps: true,
        paranoid: true,
        indexes: [
            {
                unique: true,
                fields: ['codigo']
            },
            {
                fields: ['categoria_id']
            },
            {
                fields: ['activo']
            }
        ]
    });

    // Asociaciones
    Producto.associate = (models) => {
        Producto.belongsTo(models.Categoria, {
            foreignKey: 'categoria_id',
            as: 'categoria'
        });
        Producto.hasMany(models.MovimientoInventario, {
            foreignKey: 'producto_id',
            as: 'movimientos'
        });
    };

    return Producto;
};
