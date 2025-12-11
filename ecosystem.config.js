module.exports = {
  apps: [
    {
      name: "my-express-ts",
      script: "dist/server.js",
      instances: "1", 
      exec_mode: "fork",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      },
      watch: false,
      log_date_format: "YYYY-MM-DD HH:mm Z",
      error_file: "logs/error.log",
      out_file: "logs/out.log"
    }
  ]
};
