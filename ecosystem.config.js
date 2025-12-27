module.exports = {
    apps: [
        {
            name: 'canosolutions-website',
            script: 'server.js',
            env: {
                NODE_ENV: 'production',
                PORT: 3000
            }
        }
    ]
}
