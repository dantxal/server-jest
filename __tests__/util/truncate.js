import database from '../../src/database';

/**
 * Deletes all data from DB, I can call it before every test
 */
export default function truncate() {
  return Promise.all(
    Object.keys(database.connection.models).map(key => {
      return database.connection.models[key].destroy({
        truncate: true,
        force: true,
      });
    })
  );
}
