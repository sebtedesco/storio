require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/storages-map/city/:city/state/:state', (req, res, next) => {
  const city = req.params.city;
  const state = req.params.state;
  if (!city || !state) {
    throw new ClientError('Missing city and/or state', 400);
  }
  const sql = `
    SELECT title, "pricePerDay", latitude, longitude
  FROM storages AS "s"
  JOIN addresses AS "a"
  ON s."addressId" = a."addressId"
  WHERE a.city = $1
  AND a.state = $2`;
  const values = [city, state];
  db.query(sql, values)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.get(
  '/api/storages-list/city/:city/state/:state',
  (req, res, next) => {
    const city = req.params.city;
    const state = req.params.state;
    if (!city || !state) {
      throw new ClientError('Missing city and/or state', 400);
    }
    const sql = `
    SELECT "storagePicturePath", title, "pricePerDay", width, height, depth
    FROM storages AS "s"
    JOIN addresses AS "a"
    ON s."addressId" = a."addressId"
    WHERE a.city = $1
    AND a.state = $2`;
    const values = [city, state];
    db.query(sql, values)
      .then(result => {
        res.status(200).json(result.rows);
      })
      .catch(err => next(err));
  }
);

app.get('/api/storage-details/:storageId', (req, res, next) => {
  const storageId = req.params.storageId;
  if (isNaN(storageId)) {
    throw new ClientError('Please enter a valid storageId', 400);
  }
  const sql = `
  SELECT "storagePicturePath", title, "pricePerDay", width, height, depth, "maxValue"
  FROM storages AS "s"
  JOIN users AS "u"
  ON s."hostId" = u."userId"
  WHERE s."storageId" = $1`;
  const values = [storageId];
  db.query(sql, values)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(`No storage with storageId ${storageId}`, 404);
      }
      res.status(200).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/messages/:signedInUserId/:correspondentUserId', (req, res, next) => {
  const signedInUserId = req.params.signedInUserId;
  const correspondentUserId = req.params.correspondentUserId;
  if (isNaN(signedInUserId) || isNaN(correspondentUserId)) {
    throw (new ClientError('User IDs must be numbers', 400));
  }
  const sql = `
  select *
    from messages
    where ("fromId" = $2
    and   "toId"   = $1)
    or    ("fromId" = $1
    and   "toId"   = $2)
  `;
  const paramValues = [req.params.signedInUserId, req.params.correspondentUserId];
  db.query(sql, paramValues)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/messages/', (req, res, next) => {
  const signedInUserId = req.body.signedInUserId;
  const correspondentUserId = req.body.correspondentUserId;
  const message = req.body.message;
  if (!signedInUserId || !correspondentUserId || !message) {
    throw new ClientError('sender ID, receiver ID, and message required', 400);
  } else if (isNaN(signedInUserId) || isNaN(correspondentUserId)) {
    throw new ClientError('ID must be an integer', 400);
  } else if (signedInUserId === correspondentUserId) {
    throw new ClientError('sender ID and receiver ID must be different', 400);
  }
  const sql = `
  insert into "messages"
         ("messageId", "fromId", "toId", "message", "messagedAt")
  values (default, $1, $2, $3, default)
  returning *
  `;
  const valuesArray = [signedInUserId, correspondentUserId, message];
  db.query(sql, valuesArray)
    .then(result => {
      res.status(200).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
