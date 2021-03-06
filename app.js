'use strict';

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const {exec} = require('child-process-promise');

const reducer = (accumulator, currentValue) =>
  `${accumulator}-e ${currentValue[0]}='${currentValue[1]}' `;
const dockerizeEnv = env => Object.entries(env).reduce(reducer, '');

const {
  trustedToken, logger, DOCKER_USERNAME, DOCKER_PASSWORD, AWS_DEFAULT_REGION,
  AWS_SECRET_ACCESS_KEY, AWS_ACCESS_KEY_ID
} = require('./config');

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

    const projectEnv = {
      DOCKER_USERNAME, DOCKER_PASSWORD, AWS_DEFAULT_REGION,
      AWS_SECRET_ACCESS_KEY, AWS_ACCESS_KEY_ID, ...ctx.request.body.env
    };

    const script = (type !== 'dockerCompose') ? 'singleDocker.sh' : 'dockerCompose.sh';

    const {stdout, stderr} = await exec(
      `sh scripts/${script}`, {env: projectEnv}
    );
    const endTime = new Date();
    logger.info(`stdout: ${stdout}`);
    logger.info(`Deployment finished at: ${endTime}`);
    ctx.body =
      ['start', startTime, 'end', endTime, 'stdout', stdout, 'stderr ', stderr].join('\n\n');
  } catch(e) {
    logger.error(JSON.stringify(e, null, '  '));
    logger.info(`Deployment failed`);
    ctx.throw(500, e);
  }
});

const app = new Koa();
app
.use(bodyParser())
.use(router.allowedMethods({throw: true}))
.use(router.routes());

module.exports = app;
