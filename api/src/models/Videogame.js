const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    releaseDate: {
      type: DataTypes.DATEONLY,
      get: function() {
        return this.getDataValue('releaseDate')
        .toLocaleString('en-GB', { timeZone: 'UTC' });
      }
    },
    raiting: {
      type: DataTypes.FLOAT,
    },
    platforms: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    timestamps: false
  });
};
