import { DataTypes, Sequelize } from 'sequelize';

const concertModel = (sequelize) => {
  const Concert = sequelize.define(
    'Concert',
    {
      name: {
        type: DataTypes.STRING,
        primaryKey: true,
        validate: {
          len: [0, 50],
        },
      },
      place: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [0, 200],
        },
      },
      date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        validate: {
          isDate: true,
        },
      },
      isFree: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      freezeTableName: true,
    }
  );
  Concert.associate = (models) => {
    Concert.belongsTo(models.Musician, {
      foreignKey: { name: 'mainArtist', allowNull: false },
      as: 'mainArtist_',
    });
    Concert.belongsTo(models.Musician, {
      foreignKey: { name: 'secondaryArtist' },
      as: 'secondaryArtist_',
      constraints: false,
    });
  };
};

export { concertModel };
