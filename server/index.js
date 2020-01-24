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

app.get('/api/storages/', (req, res, next) => {
  if (!req.body.city || !req.body.state) {
    throw new ClientError('Missing city and/or state', 400);
  }
  const sql =
 `SELECT *
  FROM storages AS "s"
  JOIN addresses AS "a"
  ON s."addressId" = a."addressId"
  WHERE a.city = $1
  AND a.state = $2`;
  const values = [req.body.city, req.body.state];
  db.query(sql, values)
    .then(result => {
      res.status(200).json(result.rows);
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
      if (!result.rows[0]) {
        throw (new ClientError('No messages between users', 404));
      }
      res.status(200).json(result.rows);
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
