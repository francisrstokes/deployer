'use strict';

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const {exec} = require('child-process-promise');
const {trustedToken, logger} = require('./config');

const supportedApps = ['as2', 'pi'];

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
    const {type} = ctx.request.query;

    logger.info(`Deployment started at: ${startTime}`);

    let env;
    let script;

    if(type !== 'dockerCompose') {
      const {appName, port} = ctx.request.body;
      if (!supportedApps.includes(appName)) {
        logger.info(`App not supported: ${appName}`);
        ctx.throw(400, `App not supported: ${appName}`);
      }
      env = {APPNAME: appName, PORT: port};
      script = 'singleDocker.sh';
    } else {
      env = process.env;
      script = 'dockerCompose.sh';
    }

    const {stdout, stderr} = await exec(`sh scripts/${script}`, {env});
    const endTime = new Date();
    logger.info(`stdout: ${stdout}`);
    logger.info(`Deployment finished at: ${endTime}`);
    ctx.body =
      ['start', startTime, 'end', endTime, 'stdout', stdout, 'stderr ', stderr].join('\n\n');
  } catch(e) {
    logger.error(JSON.stringify(e, null, '  '));
    logger.info(`Deployment failed`);
    ctx.throw(500, 'Internal error');
  }
});

const app = new Koa();
app
.use(bodyParser())
.use(router.allowedMethods({throw: true}))
.use(router.routes());

module.exports = app;
