// const fastify = require('fastify')// padrao node.js
// const crypto = require('crypto') //permite gerar ids aleatórios

import fastify from 'fastify'
import crypto from 'node:crypto'

const server = fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            },
        },
    },
})

const courses = [
    {id: '1', name: 'NodeJS'},
    {id: '2', name: 'ReactJS'},
    {id: '3', name: 'React Native'},
]

server.get('/courses', () => {
    return {courses}
})

server.get('/courses/:id', (request, reply) => {
    type Params ={
        id: string
    }

    const params = request.params  as Params//forçando o typescript a entender que o params é do tipo Params
    const courseId = params.id
    const course = courses.find(course => course.id === courseId)

    if (course) {
        return { course}
    }

    return reply.status(404).send({ message: 'Course not found!'})  
})

server.post('/courses', ( request, reply) =>{
    type Body = {
        title: string
    }

    const courseId = crypto.randomUUID()

    const body = request.body as Body
    const courseTitle = body.title //desestruturando o body para pegar o title

    if(!courseTitle) {
        return reply.status(400).send({ message: 'Title is required!'})
    }

    courses.push({id: courseId, title: courseTitle })

    return reply.status(201).send({courseId}) //sempre retornar um objetos das rotas
})

server.listen({port: 3333}).then(() => {
    console.log('HTTP server running!')
})