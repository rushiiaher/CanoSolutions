module.exports = {
  apps: [
    {
      name: 'canosolutions',
      script: 'pnpm',
      args: 'start',
      cwd: '/var/www/canosolutions',
      env: {
        NODE_ENV: 'production',
        PORT: 3005
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      error_file: '/var/log/pm2/canosolutions-error.log',
      out_file: '/var/log/pm2/canosolutions-out.log',
      log_file: '/var/log/pm2/canosolutions.log'
    }
  ]
};