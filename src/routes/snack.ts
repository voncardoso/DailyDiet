import {FastifyInstance} from "fastify";
import {knex} from "../database";
import {randomUUID} from "node:crypto";
import {z} from "zod"
export async function snackRoutes(app: FastifyInstance){
    app.addHook('preHandler', async (request, reply) => {
        const sessionId = request.cookies.sessionId;
        if(!sessionId) {
            return reply.status(401).send({
                error: 'Unauthorized'
            })
        }
    })

    app.get("/", async (request, reply) => {
        const {sessionId} = request.cookies
        const snacks = await knex('snack').where({user_id: sessionId})

        return {snacks}
    })

    app.post("/", async (request, reply) => {
       const createSnackBodySchema = z.object({
           name: z.string(),
           description: z.string(),
           date: z.string(),
           diet: z.boolean(),
       })

        const {name, description, date, diet} = createSnackBodySchema.parse(request.body)
        let sessionId = request.cookies.sessionId
        if(!sessionId) {
            sessionId = randomUUID()
            reply.cookie('sessionId', sessionId, {
                path: '/',
                maxAge:  60 * 60 * 24 * 7 // 7 days
            })
        }
        await knex('snack').insert({
            id: randomUUID(),
            name,
            description,
            date,
            diet,
            user_id: sessionId
        })

        return reply.code(201).send("snack created")
    })

    app.delete("/:id", async (request, reply) => {
        const getSnackIdSchema = z.object({
            id: z.string()
        })

        const {id} = getSnackIdSchema.parse(request.params)
        await knex('snack').where({id: id}).del()

        return reply.send("snack deleted")
    })
}