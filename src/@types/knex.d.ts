import {Knex} from "knex"

declare module "knex/types/tables" {
    export interface Tables {
        users: {
            id: number;
            username: string;
            password: string;
            session_id: string;
        }
    }
}
