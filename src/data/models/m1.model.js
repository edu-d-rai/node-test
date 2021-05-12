import { DataTypes } from 'sequelize';

const m1Model = (sequelize) => {
  const M1 = sequelize.define('M1', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {
    freezeTableName: true,
  });
  M1.associate = (models) => {
    M1.belongsToMany(models.M2,
            { as: 'm2s',
              through: 'M1M2',
            });
  };
};

export { m1Model };

