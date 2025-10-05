import type { FastifyPluginAsyncZod} from 'fastify-type-provider-zod'
import { db } from '../database/client.ts' //Adjust the path as needed to where your db instance is exported
import { courses } from '../database/schema.ts' // Adjust the path as needed to where your courses table/schema is exported
import { z } from 'zod'

export const createCoursesRoute: FastifyPluginAsyncZod = async (server) => {
    server.post('/courses', {
        schema: {
            tags: ['Courses'],
            summary: 'Create a new course',
            description: 'Endpoint to create a new course with a title',
            body: z.object({
                title: z.string().min(5, 'Title must be at least 5 characters long'),
            }),
            response:{
                201: z.object({
                    courseId: z.uuid().describe('The unique identifier of the created course'),
                })
            }
        },
    }, async (request, reply) => {
        const { title } = request.body

        const [course] = await db.insert(courses).values({ title }).returning()

        return reply.status(201).send({ course })
    })
}