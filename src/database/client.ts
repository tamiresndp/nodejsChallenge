import { drizzle} from 'drizzle-orm/node-postgres'

export const db = drizzle(process.env.DATABASE_URL, {
    logger: true
}) //conexão com o banco de dados
//drizzle é a instância do banco de dados que vamos usar para fazer as consultas
//process.env.DATABASE_URL é a variável de ambiente que contém a URL de conexão com o banco de dados
//node-postgres é o driver do banco de dados PostgreSQL que o Drizzle ORM usa para se conectar ao banco de dados    