import database from '..';

/**
 * Deletes all data from DB, I can call it before every test
 */
function truncate() {
  return Promise.all(
    Object.keys(database.connection.models).map(key => {
      return database.connection.models[key].destroy({
        truncate: true,
        force: true,
      });
    })
  );
}

truncate();
