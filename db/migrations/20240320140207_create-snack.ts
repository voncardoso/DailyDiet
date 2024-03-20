import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('snack', (table) => {
        table.uuid("id").primary()
        table.uuid("user_id").notNullable()
        table.string("name").notNullable()
        table.string("description").notNullable()
        table.string("date").notNullable()
        table.float("diet").notNullable()

    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('snack')
}