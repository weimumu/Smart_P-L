# Smart_P-L
City Financial Innovation Application Competition

And the complete version is currently running on `http://139.199.174.146:8080`

It will take some minutes the first time when you open the main page because of the small Wideband.

## notice
Before deployment , pls create a configuration file `back-end/config/mongo.js` with the content below (and replace the placeholders with proper values) to configure server information:

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

### deployment

there are a few `.sh` files to help simplify the deployment procedure. Just follow the instructions below:

1. `./install.sh`
2. `./build.sh`
3. `./start.sh`

and the website will be perfectly deployed listening port 8080! Now you can access the website using browser by URL `http://YOUR_SERVER_HOST:8080`.



​    

