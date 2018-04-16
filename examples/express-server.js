const express = require('express');
const { expressRouter } = require('..');

const app = express();

app.use('/doc', expressRouter({ ymlConfigFile: `${__dirname}/petstore.yml` }));

app.listen(8080);
