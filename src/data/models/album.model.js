import { DataTypes, Sequelize } from 'sequelize';
import { albumGenreChoices } from 'server/utils/constants/fieldChoices';

const albumModel = (sequelize) => {
  const Album = sequelize.define(
    'Album',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          len: [0, 80],
        },
      },
      genre: {
        type: DataTypes.STRING,
        validate: {
          isIn: [albumGenreChoices],
        },
      },
      releaseDate: {
        type: DataTypes.DATEONLY,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        validate: {
          isDate: true,
        },
      },
      numStars: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
          max: 5,
        },
      },
      ranking: {
        type: DataTypes.FLOAT,
        defaultValue: 3.0,
        validate: {
          min: 2.0,
          max: 10.2,
        },
      },
      upc: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 12],
        },
      },
    },
    {
      freezeTableName: true,
    }
  );
  Album.associate = (models) => {
    Album.hasMany(models.Song, {
      foreignKey: { name: 'album', allowNull: false },
      as: 'songs',

      onDelete: 'cascade',
    });
    Album.belongsTo(models.Musician, {
      foreignKey: { name: 'producer' },
      as: 'producer_',
      constraints: false,
    });
    Album.belongsToMany(models.Musician, { as: 'interpreters', through: 'RecordsInterpreters' });
    Album.belongsToMany(models.Musician, { as: 'collaborators', through: 'RecordsCollaborators' });
  };
};

export { albumModel };
