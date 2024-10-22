export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentation API MIT - Pet Paws',
      version: '1.0.0',
      description: 'A request for post and user of the db',
    },

    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },

  apis: ['./src/api/**/*.ts', './src/auth/**/*.ts'],
};
