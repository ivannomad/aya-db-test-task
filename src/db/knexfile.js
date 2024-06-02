const knexfile = {
  development: {
    client: 'better-sqlite3',
    connection: {
      filename: 'src/db/database.db'
    },
    useNullAsDefault: true,
  },
};

export default knexfile;
