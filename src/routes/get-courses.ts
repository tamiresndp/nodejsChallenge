import type { FastifyPluginAsyncZod} from 'fastify-type-provider-zod'
import { db } from '../database/client.ts' // Adjust the path as needed to where your db instance is exported
import { courses } from '../database/schema.ts' // Adjust the path as needed to where your courses table/schema is exported
import { z } from 'zod'


export const getCoursesRoute: FastifyPluginAsyncZod = async (server) => {
    server.get('/courses', async (request, reply) => {
        server.get('/courses', {
            schema: {
                tags: ['Courses'],
                summary: 'Get a course by ID',
                description: 'Endpoint to retrieve a course by its unique identifier',
                response: {
                    200: z.object({
                        courses: z.array(
                            z.object({
                                id: z.string().uuid(),
                                title: z.string().min(5, 'Title must be at least 5 characters long'),
                            })
                        )
                    }),
                    404: z.object({
                        message: z.string()
                    })
                }
            }
        }, async (request, reply) => {
            const result = await db.select({
                id: courses.id,
                title: courses.title
            }).from(courses)
        
            return reply.send({ courses: result })
        })
    })
}