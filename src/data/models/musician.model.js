import { DataTypes } from 'sequelize';
import { musicianInstrumentChoices } from 'server/utils/constants/fieldChoices';

const musicianModel = (sequelize) => {
  const Musician = sequelize.define(
    'Musician',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 70],
        },
      },
      lastName: {
        type: DataTypes.STRING,
        validate: {
          len: [0, 40],
        },
      },
      instrument: {
        type: DataTypes.STRING,
        validate: {
          isIn: [musicianInstrumentChoices],
        },
      },
      age: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
        },
      },
      fans: {
        type: DataTypes.BIGINT,
        validate: {
          min: 0,
        },
      },
      inspiredAt: {
        type: DataTypes.TIME,
      },
    },
    {
      freezeTableName: true,
    }
  );
  Musician.associate = (models) => {
    Musician.hasMany(models.Album, {
      foreignKey: { name: 'producer' },
      as: 'prodRecords',
      constraints: false,
    });
    Musician.hasMany(models.Concert, {
      foreignKey: { name: 'mainArtist', allowNull: false },
      as: 'mainConcerts',

      onDelete: 'cascade',
    });
    Musician.hasMany(models.Concert, {
      foreignKey: { name: 'secondaryArtist' },
      as: 'secondaryConcerts',
      constraints: false,
    });
    Musician.hasMany(models.Musician, {
      foreignKey: { name: 'influencer' },
      as: 'influencedMusicians',
      constraints: false,
    });
    Musician.hasMany(models.Song, {
      foreignKey: { name: 'composer', allowNull: false },
      as: 'composedSongs',

      onDelete: 'cascade',
    });
    Musician.belongsTo(models.Musician, {
      foreignKey: { name: 'influencer' },
      as: 'influencer_',
      constraints: false,
    });
    Musician.belongsTo(models.Song, {
      foreignKey: { name: 'preferredSong' },
      as: 'preferredSong_',
      constraints: false,
    });
    Musician.belongsToMany(models.Album, { as: 'albums', through: 'RecordsInterpreters' });
    Musician.belongsToMany(models.Album, { as: 'collabAlbums', through: 'RecordsCollaborators' });
  };
};

export { musicianModel };
