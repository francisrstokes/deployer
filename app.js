'use strict';

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const {exec} = require('child-process-promise');
const {script, trustedToken, logger} = require('./config');

const router = new Router({
  prefix: `/v1.0.0/deployments`
});

const authenticate = (ctx, next) => {
  const {accessToken} = ctx.request.body;
  if (accessToken !== trustedToken) {
    return ctx.throw(401, 'Not authorized');
  }
  return next();

};

router
.use(authenticate)
.post('/', async ctx => {
  try {
    const startTime = new Date();
    logger.info(`Deployment started at: ${startTime}`);
    const {stdout, stderr} = await exec(`sh scripts/${script}`, {env: process.env});
    const endTime = new Date();
    logger.info(`Deployment finished at: ${endTime}`);
    logger.info(`stdout: ${stdout}`);
    ctx.body =
      ['start', startTime, 'end', endTime, 'stdout', stdout, 'stderr ', stderr].join('\n\n');
  } catch(e) {
    logger.error(e);
    ctx.throw(500, 'Internal error');
  }
});

const app = new Koa();
app
.use(bodyParser())
.use(router.allowedMethods({throw: true}))
.use(router.routes());

module.exports = app;
