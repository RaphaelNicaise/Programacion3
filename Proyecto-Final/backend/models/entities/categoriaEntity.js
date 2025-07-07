const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Categoria = sequelize.define('Categoria', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        nombre: { type: DataTypes.STRING(100), allowNull: false, unique: true },
        descripcion: { type: DataTypes.TEXT }
    }, {
        tableName: 'categorias',
        timestamps: true,
        paranoid: true
    });

    // Asociaciones
    Categoria.associate = (models) => {
        Categoria.hasMany(models.Producto, {
            foreignKey: 'categoria_id',
            as: 'productos'
        });
    };

    return Categoria;
};
