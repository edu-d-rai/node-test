const swaggerDocument = {
  swagger: '2.0',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    '/musician-api/': {
      get: {
        summary: 'Lists all the musicians',
        tags: ['musician-api'],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Returns a list',
            schema: {
              $ref: '#/definitions/Musician',
            },
          },
        },
      },
      post: {
        summary: 'Creates a musician',
        tags: ['musician-api'],
        parameters: [
          {
            name: 'musician',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/Musician',
            },
          },
        ],
        produces: ['application/json'],
        responses: {
          201: {
            description: 'Returns a new musician',
            schema: {
              $ref: '#/definitions/Musician',
            },
          },
        },
      },
    },
    '/musician-api/{id}': {
      get: {
        summary: 'Gets a musician by its primary key',
        tags: ['musician-api'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'Returns a musician with primary key',
            schema: {
              $ref: '#/definitions/Musician',
            },
          },
        },
      },
      delete: {
        summary: 'Deletes a musician by its primary key',
        tags: ['musician-api'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
        },
      },
      put: {
        summary: 'Overrides the values of a musician',
        tags: ['musician-api'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              $ref: '#/definitions/Musician',
            },
          },
          {
            name: 'musician',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/Musician',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a musician',
            schema: {
              $ref: '#/definitions/Musician',
            },
          },
        },
      },
      patch: {
        tags: ['musician-api'],
        summary: 'patch a musician',
        parameters: [
          {
            name: 'id',
            in: 'path',
            schema: {
              $ref: '#/definitions/Musician',
            },
          },
          {
            name: 'musician',
            in: 'body',
            schema: {
              $ref: '#/definitions/Musician',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a musician and its partially overwritten values',
            schema: {
              $ref: '#/definitions/Musician',
            },
          },
        },
      },
    },

    '/album-api/': {
      get: {
        summary: 'Lists all the albums',
        tags: ['album-api'],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Returns a list',
            schema: {
              $ref: '#/definitions/Album',
            },
          },
        },
      },
      post: {
        summary: 'Creates a album',
        tags: ['album-api'],
        parameters: [
          {
            name: 'album',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/Album',
            },
          },
        ],
        produces: ['application/json'],
        responses: {
          201: {
            description: 'Returns a new album',
            schema: {
              $ref: '#/definitions/Album',
            },
          },
        },
      },
    },
    '/album-api/{id}': {
      get: {
        summary: 'Gets a album by its primary key',
        tags: ['album-api'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            description: 'Returns a album with primary key',
            schema: {
              $ref: '#/definitions/Album',
            },
          },
        },
      },
      delete: {
        summary: 'Deletes a album by its primary key',
        tags: ['album-api'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
        },
      },
      put: {
        summary: 'Overrides the values of a album',
        tags: ['album-api'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              $ref: '#/definitions/Album',
            },
          },
          {
            name: 'album',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/Album',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a album',
            schema: {
              $ref: '#/definitions/Album',
            },
          },
        },
      },
      patch: {
        tags: ['album-api'],
        summary: 'patch a album',
        parameters: [
          {
            name: 'id',
            in: 'path',
            schema: {
              $ref: '#/definitions/Album',
            },
          },
          {
            name: 'album',
            in: 'body',
            schema: {
              $ref: '#/definitions/Album',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a album and its partially overwritten values',
            schema: {
              $ref: '#/definitions/Album',
            },
          },
        },
      },
    },

    '/song-api/': {
      get: {
        summary: 'Lists all the songs',
        tags: ['song-api'],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Returns a list',
            schema: {
              $ref: '#/definitions/Song',
            },
          },
        },
      },
      post: {
        summary: 'Creates a song',
        tags: ['song-api'],
        parameters: [
          {
            name: 'song',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/Song',
            },
          },
        ],
        produces: ['application/json'],
        responses: {
          201: {
            description: 'Returns a new song',
            schema: {
              $ref: '#/definitions/Song',
            },
          },
        },
      },
    },
    '/song-api/{id}': {
      get: {
        summary: 'Gets a song by its primary key',
        tags: ['song-api'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            description: 'Returns a song with primary key',
            schema: {
              $ref: '#/definitions/Song',
            },
          },
        },
      },
      delete: {
        summary: 'Deletes a song by its primary key',
        tags: ['song-api'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
        },
      },
      put: {
        summary: 'Overrides the values of a song',
        tags: ['song-api'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              $ref: '#/definitions/Song',
            },
          },
          {
            name: 'song',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/Song',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a song',
            schema: {
              $ref: '#/definitions/Song',
            },
          },
        },
      },
      patch: {
        tags: ['song-api'],
        summary: 'patch a song',
        parameters: [
          {
            name: 'id',
            in: 'path',
            schema: {
              $ref: '#/definitions/Song',
            },
          },
          {
            name: 'song',
            in: 'body',
            schema: {
              $ref: '#/definitions/Song',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a song and its partially overwritten values',
            schema: {
              $ref: '#/definitions/Song',
            },
          },
        },
      },
    },

    '/concert-api/': {
      get: {
        summary: 'Lists all the concerts',
        tags: ['concert-api'],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Returns a list',
            schema: {
              $ref: '#/definitions/Concert',
            },
          },
        },
      },
      post: {
        summary: 'Creates a concert',
        tags: ['concert-api'],
        parameters: [
          {
            name: 'concert',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/Concert',
            },
          },
        ],
        produces: ['application/json'],
        responses: {
          201: {
            description: 'Returns a new concert',
            schema: {
              $ref: '#/definitions/Concert',
            },
          },
        },
      },
    },
    '/concert-api/{name}': {
      get: {
        summary: 'Gets a concert by its primary key',
        tags: ['concert-api'],
        parameters: [
          {
            name: 'name',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'Returns a concert with primary key',
            schema: {
              $ref: '#/definitions/Concert',
            },
          },
        },
      },
      delete: {
        summary: 'Deletes a concert by its primary key',
        tags: ['concert-api'],
        parameters: [
          {
            name: 'name',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
        },
      },
      put: {
        summary: 'Overrides the values of a concert',
        tags: ['concert-api'],
        parameters: [
          {
            name: 'name',
            in: 'path',
            required: true,
            schema: {
              $ref: '#/definitions/Concert',
            },
          },
          {
            name: 'concert',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/Concert',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a concert',
            schema: {
              $ref: '#/definitions/Concert',
            },
          },
        },
      },
      patch: {
        tags: ['concert-api'],
        summary: 'patch a concert',
        parameters: [
          {
            name: 'name',
            in: 'path',
            schema: {
              $ref: '#/definitions/Concert',
            },
          },
          {
            name: 'concert',
            in: 'body',
            schema: {
              $ref: '#/definitions/Concert',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a concert and its partially overwritten values',
            schema: {
              $ref: '#/definitions/Concert',
            },
          },
        },
      },
    },

    '/musician-fetch-influencer/{id}': {
      get: {
        summary: 'Gets a musician by its primary key',
        tags: ['musician-fetch-influencer'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'Returns a musician with primary key',
            schema: {
              $ref: '#/definitions/Musician',
            },
          },
        },
      },
    },

    '/musician-update-influencer/{id}': {
      put: {
        summary: 'Overrides the values of a musician',
        tags: ['musician-update-influencer'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              $ref: '#/definitions/Musician',
            },
          },
          {
            name: 'musician',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/Musician',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a musician',
            schema: {
              $ref: '#/definitions/Musician',
            },
          },
        },
      },
      patch: {
        tags: ['musician-update-influencer'],
        summary: 'patch a musician',
        parameters: [
          {
            name: 'id',
            in: 'path',
            schema: {
              $ref: '#/definitions/Musician',
            },
          },
          {
            name: 'musician',
            in: 'body',
            schema: {
              $ref: '#/definitions/Musician',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a musician and its partially overwritten values',
            schema: {
              $ref: '#/definitions/Musician',
            },
          },
        },
      },
    },

    '/musician-fetch-all/': {
      get: {
        summary: 'Lists all the musicians',
        tags: ['musician-fetch-all'],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Returns a list',
            schema: {
              $ref: '#/definitions/Musician',
            },
          },
        },
      },
    },
    '/musician-fetch-all/{id}': {
      get: {
        summary: 'Gets a musician by its primary key',
        tags: ['musician-fetch-all'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'Returns a musician with primary key',
            schema: {
              $ref: '#/definitions/Musician',
            },
          },
        },
      },
    },

    '/musician-only-fetch-api/': {
      get: {
        summary: 'Lists all the musicians',
        tags: ['musician-only-fetch-api'],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Returns a list',
            schema: {
              $ref: '#/definitions/Musician',
            },
          },
        },
      },
    },
    '/musician-only-fetch-api/{id}': {
      get: {
        summary: 'Gets a musician by its primary key',
        tags: ['musician-only-fetch-api'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'Returns a musician with primary key',
            schema: {
              $ref: '#/definitions/Musician',
            },
          },
        },
      },
    },

    '/get-albums-by-stars/': {
      get: {
        summary: 'Lists all the albums',
        tags: ['get-albums-by-stars'],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Returns a list',
            schema: {
              $ref: '#/definitions/Album',
            },
          },
        },
      },
    },

    '/get-album-songs/': {
      get: {
        summary: 'Lists all the songs',
        tags: ['get-album-songs'],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Returns a list',
            schema: {
              $ref: '#/definitions/Song',
            },
          },
        },
      },
    },
  },
  definitions: {
    Musician: {
      required: [],
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
          readOnly: true,
        },
        firstName: {
          type: 'string',
          maxLength: 70,
        },
        lastName: {
          type: 'string',
          maxLength: 40,
        },
        instrument: {
          type: 'string',
          enum: ['guitar', 'piano', 'drums', 'bass', 'voice'],
        },
        age: {
          type: 'integer',
          format: 'int32',
          minimum: 0,
        },
        fans: {
          type: 'integer',
          format: 'int64',
          minimum: 0,
        },
        inspiredAt: {
          type: 'string',
        },
        influencer: {
          $ref: '#/definitions/Musician/properties/id',
        },
        preferredSong: {
          $ref: '#/definitions/Song/properties/id',
        },
        prodRecords: {
          type: 'array',
          items: {
            $ref: '#/definitions/Album/properties/id',
          },
          uniqueItems: true,
        },
        mainConcerts: {
          type: 'array',
          items: {
            $ref: '#/definitions/Concert/properties/name',
          },
          uniqueItems: true,
        },
        secondaryConcerts: {
          type: 'array',
          items: {
            $ref: '#/definitions/Concert/properties/name',
          },
          uniqueItems: true,
        },
        influencedMusicians: {
          type: 'array',
          items: {
            $ref: '#/definitions/Musician/properties/id',
          },
          uniqueItems: true,
        },
        composedSongs: {
          type: 'array',
          items: {
            $ref: '#/definitions/Song/properties/id',
          },
          uniqueItems: true,
        },
        albums: {
          type: 'array',
          items: {
            $ref: '#/definitions/Album/properties/id',
          },
          uniqueItems: true,
        },
        collabAlbums: {
          type: 'array',
          items: {
            $ref: '#/definitions/Album/properties/id',
          },
          uniqueItems: true,
        },
      },
    },

    Album: {
      required: ['name'],
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          readOnly: true,
        },
        name: {
          type: 'string',
          uniqueItems: true,
          maxLength: 80,
        },
        genre: {
          type: 'string',
          enum: ['rock', 'pop', 'folk'],
        },
        releaseDate: {
          type: 'string',
          format: 'date',
        },
        numStars: {
          type: 'integer',
          format: 'int32',
          minimum: 0,
          maximum: 5,
        },
        ranking: {
          type: 'number',
          format: 'float',
          minimum: 2.0,
          maximum: 10.2,
        },
        upc: {
          type: 'string',
          maxLength: 12,
        },
        producer: {
          $ref: '#/definitions/Musician/properties/id',
        },
        songs: {
          type: 'array',
          items: {
            $ref: '#/definitions/Song/properties/id',
          },
          uniqueItems: true,
        },
        interpreters: {
          type: 'array',
          items: {
            $ref: '#/definitions/Musician/properties/id',
          },
          uniqueItems: true,
        },
        collaborators: {
          type: 'array',
          items: {
            $ref: '#/definitions/Musician/properties/id',
          },
          uniqueItems: true,
        },
      },
    },

    Song: {
      required: ['id', 'name'],
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
        },
        name: {
          type: 'string',
          maxLength: 100,
        },
        lyrics: {
          type: 'string',
          maxLength: 1000,
        },
        code: {
          type: 'string',
          format: 'uuid',
          readOnly: true,
        },
        album: {
          $ref: '#/definitions/Album/properties/id',
        },
        composer: {
          $ref: '#/definitions/Musician/properties/id',
        },
        songMusicianFans: {
          type: 'array',
          items: {
            $ref: '#/definitions/Musician/properties/id',
          },
          uniqueItems: true,
        },
      },
    },

    Concert: {
      required: ['name', 'place'],
      properties: {
        name: {
          type: 'string',
          maxLength: 50,
        },
        place: {
          type: 'string',
          maxLength: 200,
        },
        date: {
          type: 'string',
          format: 'date-time',
        },
        isFree: {
          type: 'boolean',
        },
        mainArtist: {
          $ref: '#/definitions/Musician/properties/id',
        },
        secondaryArtist: {
          $ref: '#/definitions/Musician/properties/id',
        },
      },
    },
  },
};

export { swaggerDocument };
