var dbConfig = {
  synchronize: false,
};

// module.exports = {
//   type: 'sqlite',
//   database: 'test.sqlite',
//   entities:
//     process.env.NODE_ENV === 'development'
//       ? ['**/*.entity.js']
//       : ['**/*.entity.ts'], // for test env, jest uses ts-node
//   synchronize: process.env.NODE_ENV !== 'production',
// };

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: '**/*.entity.js',
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: '**/*.entity.ts',
    });
    break;
  case 'production':
    break;
  default:
    throw new Error('unknown env!');
}

module.exports = dbConfig;
