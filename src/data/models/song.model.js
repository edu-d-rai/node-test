import { DataTypes } from 'sequelize';

const songModel = (sequelize) => {
  const Song = sequelize.define(
    'Song',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [0, 100],
        },
      },
      lyrics: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 1000],
        },
      },
      code: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
    },
    {
      freezeTableName: true,
    }
  );
  Song.associate = (models) => {
    Song.hasMany(models.Musician, {
      foreignKey: { name: 'preferredSong' },
      as: 'songMusicianFans',
      constraints: false,
    });
    Song.belongsTo(models.Album, { foreignKey: { name: 'album', allowNull: false }, as: 'album_' });
    Song.belongsTo(models.Musician, {
      foreignKey: { name: 'composer', allowNull: false },
      as: 'composer_',
    });
  };
};

export { songModel };
