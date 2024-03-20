import {FastifyInstance} from "fastify";
import {knex} from "../database";
import {z} from "zod"
import {randomUUID} from "node:crypto";

export async function userRoutes(app: FastifyInstance){
    app.get("/",  async (request, reply) => {
        const table = await knex('user').select("*")

        return table
    })

    app.post("/", async (request, reply) => {
        const createUserBodySchema = z.object({
            username: z.string(),
            email: z.string().email(),
        })

        const {username, email} = createUserBodySchema.parse(request.body)

        await knex('user').insert({
            id: randomUUID(),
            username,
            email,
            session_id: randomUUID()
        })

        return reply.code(201).send("user created")
    })
}