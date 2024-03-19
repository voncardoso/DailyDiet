import {knex as setupKnex, Knex } from "knex";

export const config: Knex.Config = {
    client: "sqlite3",
    connection: {
        filename: "./db/db.db"
    },
    useNullAsDefault: true,
    migrations: {
        extension: "ts",
        tableName: "./db/migrations"
    }
}

export const knex = setupKnex(config);