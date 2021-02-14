module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: ["dist/src/entity/**/*.js"],
  migrations: ["dist/migration/**/*.js"],
  subscribers: ["dist/subscriber/**/*.js"],
  ssl: "true",
  synchronize: true,
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
