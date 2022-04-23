module.exports = {
  apps: [
    {
      script: 'server.js',
      cwd: './backend/',
      name: 'Backend',
      watch: true,
      ignore_watch: ["node_modules"],
      env: {
        SERVER_PORT: 2000,
        DATABASE_PORT: 5432,
        DATABASE_NAME: 'pet_sauro',
        DATABASE_PASSWORD: '991930265',
        DATABASE_USER: 'postgres',
        DATABASE_HOST: 'localhost'
      },
      env_production: { 
        SERVER_PORT: 4000,
        DATABASE_PORT: 5432,
        DATABASE_NAME: 'pet_sauro',
        DATABASE_PASSWORD: '991930265',
        DATABASE_USER: 'postgres',
        DATABASE_HOST: 'localhost'
      }
    },
    {
      script: 'server.js',
      cwd: './frontend/',
      name: 'Frontend',
      watch: true,
      ignore_watch: ["node_modules"],
      env: {
        SERVER_PORT: 8080
      },
      env_production: {
        SERVER_PORT: 8080
      }
    }
  ]
}
