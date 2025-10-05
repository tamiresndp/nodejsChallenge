// const fastify = require('fastify')// padrao node.js
// const crypto = require('crypto') //permite gerar ids aleatórios
import { fastifySwagger } from '@fastify/swagger' //documentação da API
import fastify from 'fastify'
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod' //tipagem do fastify
import { createCoursesRoute } from './src/routes/create-courses.ts' //importando a rota de criação de cursos
import { getCoursesRoute } from './src/routes/get-courses.ts' //importando a rota de listagem de cursos
import { getCoursesByIdRoute } from './src/routes/get-courses-by-id.ts' //importando a rota de listagem de cursos por id    
import scalarAPIReference from '@scalar/fastify-api-reference'
//instância do servidor Fastify

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
}).withTypeProvider<ZodTypeProvider>() //adicionando o type provider do zod
if (process.env.NODE_ENV === 'development') {
    server.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'Node.js API',
            description: 'API para gerenciar cursos',
            version: '1.0.0',
        },
    },
    transform: jsonSchemaTransform, //transformando o schema do zod para o formato do OpenAPI
    routePrefix: '/documentation',
    exposeRoute: true,
})

server.register(scalarAPIReference, {
    routePrefix: '/docs',
})
//registrando o plugin do Scalar API Reference no Fastify
}

server.setValidatorCompiler(validatorCompiler) //transformando os dados de saída com uma outra rota
server.setSerializerCompiler(serializerCompiler)
server.register(createCoursesRoute) //registrando a rota de criação de cursos
server.register(getCoursesRoute) //registrando a rota de listagem de cursos
server.register(getCoursesByIdRoute) //registrando a rota de listagem de cursos por id







server.listen({port: 3333}).then(() => {
    console.log('HTTP server running!')
})

