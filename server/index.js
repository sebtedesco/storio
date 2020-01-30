require('dotenv/config');
const express = require('express');
const path = require('path');
const multer = require('multer');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();
const imagesStorages = multer.diskStorage({
  destination: './server/public/images/storages/',
  filename: function (req, file, cb) {
    cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname));
  }
});
const uploadStoragePicture = multer({
  storage: imagesStorages
}).single('storage-picture');

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.post('/api/upload-storage-image', (req, res, next) => {
  uploadStoragePicture(req, res, err => {
    if (err) {
      next(err);
      return false;
    } else {
      res.json(`/images/storages/${req.file.filename}`);
      return true;
    }
  });
});

app.get('/api/users/:userId', (req, res, next) => {
  db.query(`
  select * from users where "userId" = $1
  `, [req.params.userId])
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

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
    SELECT "storageId", title, "pricePerDay", "storagePicturePath", latitude, longitude
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
    SELECT "storageId", "storagePicturePath", title, "pricePerDay", width, height, depth
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
  // first name, last name, profile picture path, city state, longDescription;
  const sql = `
  SELECT "storageId", "hostId", "storagePicturePath", title, "pricePerDay", width, height, depth, "maxValue", "firstName", "lastName", "profilePicturePath", city, state, "longDescription"
  FROM storages AS "s"
  JOIN users AS "u" ON s."hostId" = u."userId"
  JOIN addresses AS "a" ON a."addressId" = s."addressId"
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

app.get('/api/storages-user/signInUserId/:signedInUserId', (req, res, next) => {
  const signedInUserId = req.params.signedInUserId;
  if (isNaN(signedInUserId)) {
    throw (new ClientError('User IDs must be numbers', 400));
  }
  const sql = `
    select
      "storageId",
      "storagePicturePath",
      "title",
      "addressId",
      "hostId",
      "isAvailable"
    from storages
      where "hostId" = $1
  `;
  const values = [signedInUserId];
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
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/conversations/signedInUserId/:userId', (req, res, next) => {
  const signedInUserId = req.params.userId;
  if (isNaN(signedInUserId)) {
    throw (new ClientError('User IDs must be numbers', 400));
  }
  const sql = `
  select
    distinct on
    (u."profilePicturePath") u."profilePicturePath",
    u."userId",
    u."firstName",
    u."lastName",
    m."fromId",
    m."toId"
  from users as u
  inner join messages as m on m."fromId" = u."userId"
                          or m."toId"   = u."userId"
    where u."userId" != $1
    and   (m."fromId"  = $1 or m."toId" = $1)
  `;
  const values = [signedInUserId];
  db.query(sql, values)
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
  } else if (signedInUserId === parseInt(correspondentUserId, 10)) {
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
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.post('/api/listing/', (req, res, next) => {
  // console.log("top of post: ", req.body.address);
  // console.log(req.body.newListing);
  const address = req.body.address;
  const latitude = address.latitude;
  const longitude = address.longitude;
  const zip = address.zip;
  const newListing = req.body.newListing;
  if (!req.body.address.street1 || !req.body.address.city || !req.body.address.state || !zip || !latitude || !longitude) {
    throw new ClientError('Street1, City, State, Latitude, and Longtitude fields must be filled', 400);
  } else if (isNaN(parseInt(zip))) {
    throw new ClientError('Zip Code must be a positive integer', 400);
  } else if (isNaN(parseFloat(latitude)) || isNaN(parseFloat(longitude))) {
    throw new ClientError('You must enter an addressId', 400);
  }
  const addressSql = `
  insert into addresses ("addressId", "street1", "street2", city, state, zip, longitude, latitude)
  values (default, $1, $2, $3, $4, $5, $6, $7)
  returning "addressId"`;
  const values = [
    address.street1, address.street2, address.city, address.state, zip, longitude, latitude];
  db.query(addressSql, values)
    .then(response => {
      // console.log(response.rows[0]);
      const addressId = response.rows[0].addressId;
      // if (isNaN(parseInt(newListing.width)) || isNaN(parseInt(newListing.depth)) || isNaN(parseInt(newListing.height)) || isNaN(parseInt(newListing.pricePerDay)) || isNaN(parseInt(newListing.maxValue))) {
      //   throw new ClientError('Street1, City, State, Latitude, and Longtitude fields must be filled', 400);
      // }
      const storageSql = `
      insert into storages ("storageId", width, depth, height, "storagePicturePath", "pricePerDay", "maxValue", title, "longDescription", "addressId", "hostId", "isAvailable")
      values (default, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      returning *`;
      const values = [newListing.width, newListing.depth, newListing.height, newListing.storagePicturePath, newListing.pricePerDay, newListing.maxValue, newListing.title, newListing.longDescription, addressId, newListing.hostId, true];
      // console.log(values);
      return db.query(storageSql, values);
    })
    .then(response => {
      // console.log('response: ', response);
      res.status(201).json(response.rows[0]);
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

// http -v post: 3000/api/listing address:='{"street1": "123 apples", "city": "Boulder", "state": "CO", "zip": 80304, "longitude": 33333.333, "latitude": "44444.444"}' newListing:='{"width": 4, "depth": 2 "height": 6, "storagePicturePath": "picpath", "pricePerDay": 3000, "maxValue": 10000000, "title": "Great storage downtown", "longDescription": "LONGGG description", "hostId": 3}'
