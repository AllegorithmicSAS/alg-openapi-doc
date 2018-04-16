const Koa = require('koa');
const mount = require('koa-mount');
const serve = require('koa-static');
const fs = require('mz/fs');
const YAML = require('js-yaml');

const koaSwaggerApp = ({ ymlConfigFile }) => {
  const app = new Koa();

  app.use(
    mount('/swagger.json', async ctx => {
      ctx.body = YAML.load(await fs.readFile(ymlConfigFile));
    })
  );

  app.use(mount('/', serve(`${__dirname}/swagger-ui`)));

  return app;
};

exports.koaSwaggerApp = koaSwaggerApp;
