//USER.MODEL SIN HASH:
const initUser = require('./entities/user.entity');
const bcrypt = require('bcrypt');

function createUserModel(sequelize) {
  const User = initUser(sequelize);

  // Método para encontrar usuario por username y password
  User.findByCredentials = async (username, password) => {
    return await User.findOne({
      where: {
        username: username,
        password: password,
        activo: true
      }
    });
  };

  // Método para obtener un usuario por ID
  User.getUserById = async (id) => {
    return await User.findOne({
      where: {
        id: id,
        activo: true
      }
    });
  };

  // Método para crear un nuevo usuario
  User.crearUsuario = async (datosUsuario) => {
    return await User.create(datosUsuario);
  };

  // Método para actualizar un usuario
  User.actualizarUsuario = async (id, datosActualizacion) => {
    const [numActualizados] = await User.update(datosActualizacion, {
      where: {
        id: id,
        activo: true
      }
    });
    
    if (numActualizados > 0) {
      return await User.findByPk(id);
    }
    
    return null;
  };

  // Método para eliminar un usuario (eliminación lógica)
  User.eliminarUsuario = async (id) => {
    const numActualizados = await User.update({ activo: false }, {
      where: {
        id: id
      }
    });
    
    return numActualizados;
  };

  return User;
}

module.exports = createUserModel;