import { albumValidation } from './album.validation';
import { concertValidation } from './concert.validation';
import { getAlbumSongsValidation } from './getAlbumSongs.validation';
import { getAlbumsByStarsValidation } from './getAlbumsByStars.validation';
import { musicianValidation } from './musician.validation';
import { musicianFetchAllValidation } from './musicianFetchAll.validation';
import { musicianFetchInfluencerValidation } from './musicianFetchInfluencer.validation';
import { musicianOnlyFetchApiValidation } from './musicianOnlyFetchApi.validation';
import { musicianUpdateInfluencerValidation } from './musicianUpdateInfluencer.validation';
import { songValidation } from './song.validation';

const options = { keyByField: true };

export {
  musicianValidation,
  albumValidation,
  songValidation,
  concertValidation,
  musicianFetchInfluencerValidation,
  musicianUpdateInfluencerValidation,
  musicianFetchAllValidation,
  musicianOnlyFetchApiValidation,
  getAlbumsByStarsValidation,
  getAlbumSongsValidation,
  options,
};
