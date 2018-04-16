const Koa = require('koa');
const mount = require('koa-mount');
const serve = require('koa-static');
const fs = require('mz/fs');
const YAML = require('js-yaml');
const express = require('express');

const koaSwaggerApp = ({ ymlConfigFile }) => {
  const app = new Koa();

  app.use(
    mount('/swagger.json', async ctx => {
      ctx.body = YAML.load(await fs.readFile(ymlConfigFile));
    })
  );

  app.use(mount('/', serve(`${__dirname}/static`)));

  return app;
};

const expressRouter = ({ ymlConfigFile }) => {
  const router = express.Router();
  router.use(express.static(`${__dirname}/static`));
  router.get('/swagger.json', (req, res, next) => {
    fs
      .readFile(ymlConfigFile)
      .then(buf => {
        res.json(YAML.load(buf));
      })
      .catch(next);
  });
  return router;
};

exports.koaSwaggerApp = koaSwaggerApp;
exports.expressRouter = expressRouter;
