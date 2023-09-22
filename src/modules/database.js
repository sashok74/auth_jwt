import firebird from 'node-firebird';

const dbOptions = {
  host: '192.168.0.100',
  port: 3050,
  database: 'auth',
  user: 'SYSDBA',
  password: 'planomer',
  lowercase_keys: true, // set to true to lowercase keys
  role: null, // default
  pageSize: 4096, // default when creating database
};

function executeQuery(ssql, params) {
  return new Promise((resolve, reject) => {
    firebird.attach(dbOptions, (err, db) => {
      if (err) {
        return reject(err);
      }

      db.query(ssql, params, (err, result) => {
        db.detach();

        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    });
  });
}

export { executeQuery };
