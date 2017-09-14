# Smart_P-L
City Fiancial Innovation Application Competition

## notice
create a config file `back-end/config/mongo.js` with the content below (and replace the placeholders with proper values) to configure server infomations:

```javascript
const config = {
  user: USERNAME,
  password: PASSWORD,
  host: SERVER_HOST,
  port: MONGODB_PORT,
  db: DB_NAME
};

if (process.env.MOCHA_TEST) {
  config.db = TEST_DB_NAME;
}

module.exports = config;

```
