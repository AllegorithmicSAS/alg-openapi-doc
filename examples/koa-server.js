const Koa = require('koa');
const mount = require('koa-mount');

const { koaSwaggerApp } = require('..');

app = new Koa();
app.use(
  mount('/doc', koaSwaggerApp({ ymlConfigFile: `${__dirname}/petstore.yml` }))
);
app.listen(8080);
