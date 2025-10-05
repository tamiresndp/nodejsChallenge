import type { FastifyPluginAsyncZod} from 'fastify-type-provider-zod'
import { db } from '../database/client.ts' //Adjust the path as needed to where your db instance is exported
import { courses } from '../database/schema.ts' // Adjust the path as needed to where your courses table/schema is exported
import { eq } from 'drizzle-orm' // Adjust the import path if you use a different ORM or location
import { z } from 'zod'

export const getCoursesByIdRoute: FastifyPluginAsyncZod = async (server) => {
    server.get('/courses/:id', {
        schema: {
            tags: ['Courses'],
            summary: 'Get a course by ID',
            description: 'Endpoint to retrieve a course by its unique identifier',
            response: {
                200: z.object({
                    course: z.object({
                        id: z.uuid(),
                        title: z.string().min(5, 'Title must be at least 5 characters long'),
                    })
                }),
                404: z.object({
                    message: z.string()
                })
            }
        },
    }, async (request, reply) => {
        const { id } = request.params as { id: string }

        const [course] = await db.select().from(courses).where(eq(courses.id, id))

        if (!course) {
            return reply.status(404).send({ message: 'Course not found!' })
        }

        return { course }
    })
}