import { DataTypes } from 'sequelize';

const m2Model = (sequelize) => {
  const M2 = sequelize.define('M2', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {
    freezeTableName: true,
  });
  M2.associate = (models) => {
    M2.belongsToMany(models.M1,
            { as: 'm1s',
              through: 'M1M2',
            });
  };
};

export { m2Model };

