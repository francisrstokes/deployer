module.exports = {
    apps : [
        {
            name: "Deployer",
            script: "index.js",
            env: {
                COMMON_VARIABLE: "true"
            },
            env_production: {
                NODE_ENV: "production"
            }
        }
    ]
};

