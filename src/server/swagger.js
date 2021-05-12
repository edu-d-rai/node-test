const swaggerDocument = {
  swagger: '2.0',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    
    '/m2/': {
      get: {
        summary: 'Lists all the m2s',
        tags: ['m2'],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Returns a list',
            schema: {
              $ref: '#/definitions/M2',
            },
          },
        },
      },
      post: {
        summary: 'Creates a m2',
        tags: ['m2'],
        parameters: [
          {
            name: 'm2',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/M2',
            },
          },
        ],
        produces: ['application/json'],
        responses: {
          201: {
            description: 'Returns a new m2',
            schema: {
              $ref: '#/definitions/M2',
            },
          },
        },
      },
    },
    '/m2/{id}': {
      get: {
        summary: 'Gets a m2 by its primary key',
        tags: ['m2'],
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
            description: 'Returns a m2 with primary key',
            schema: {
              $ref: '#/definitions/M2',
            },
          },
        },
      },
      delete: {
        summary: 'Deletes a m2 by its primary key',
        tags: ['m2'],
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
        summary: 'Overrides the values of a m2',
        tags: ['m2'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              $ref: '#/definitions/M2',
            },
          },
          {
            name: 'm2',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/M2',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a m2',
            schema: {
              $ref: '#/definitions/M2',
            },
          },
        },
      },
      patch: {
        tags: ['m2'],
        summary: 'patch a m2',
        parameters: [
          {
            name: 'id',
            in: 'path',
            schema: {
              $ref: '#/definitions/M2',
            },
          },
          {
            name: 'm2',
            in: 'body',
            schema: {
              $ref: '#/definitions/M2',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a m2 and its partially overwritten values',
            schema: {
              $ref: '#/definitions/M2',
            },
          },
        },
      },
    },

    
    '/m1/': {
      get: {
        summary: 'Lists all the m1s',
        tags: ['m1'],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Returns a list',
            schema: {
              $ref: '#/definitions/M1',
            },
          },
        },
      },
      post: {
        summary: 'Creates a m1',
        tags: ['m1'],
        parameters: [
          {
            name: 'm1',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/M1',
            },
          },
        ],
        produces: ['application/json'],
        responses: {
          201: {
            description: 'Returns a new m1',
            schema: {
              $ref: '#/definitions/M1',
            },
          },
        },
      },
    },
    '/m1/{id}': {
      get: {
        summary: 'Gets a m1 by its primary key',
        tags: ['m1'],
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
            description: 'Returns a m1 with primary key',
            schema: {
              $ref: '#/definitions/M1',
            },
          },
        },
      },
      delete: {
        summary: 'Deletes a m1 by its primary key',
        tags: ['m1'],
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
        summary: 'Overrides the values of a m1',
        tags: ['m1'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              $ref: '#/definitions/M1',
            },
          },
          {
            name: 'm1',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/M1',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a m1',
            schema: {
              $ref: '#/definitions/M1',
            },
          },
        },
      },
      patch: {
        tags: ['m1'],
        summary: 'patch a m1',
        parameters: [
          {
            name: 'id',
            in: 'path',
            schema: {
              $ref: '#/definitions/M1',
            },
          },
          {
            name: 'm1',
            in: 'body',
            schema: {
              $ref: '#/definitions/M1',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a m1 and its partially overwritten values',
            schema: {
              $ref: '#/definitions/M1',
            },
          },
        },
      },
    },

  },
  definitions: {
    M1: {
      required: [],
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          readOnly: true,
        },
        m2s: {
          type: 'array',
          items: {
            $ref: '#/definitions/M2/properties/id',
          },
          uniqueItems: true,
        },
      },
    },

    M2: {
      required: [],
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          readOnly: true,
        },
        m1s: {
          type: 'array',
          items: {
            $ref: '#/definitions/M1/properties/id',
          },
          uniqueItems: true,
        },
      },
    },

  },
};

export { swaggerDocument };
