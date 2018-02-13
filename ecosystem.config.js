module.exports = {
    apps : [
        {
            name: "Deployer",
            script: "index.js",
            args: "-r dotenv/config",
            env: {
                COMMON_VARIABLE: "true"
            },
            env_production: {
                NODE_ENV: "production"
            }
        }
    ]
};

