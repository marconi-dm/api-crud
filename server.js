import "dotenv/config";
import express from 'express';
import db_con from './src/db/db_connection.js';
import routes from './src/routes/index.js';

/*
A constante 'con' recebe a conexão com o banco de dados retornada pela função 'db_con'.
Essa função é assíncrona e aguarda o término da conexão antes de prosseguir.
*/
const con = await db_con();

/*
Os métodos 'on' e 'once' são usados para tratar eventos da conexão com o banco de dados via 'mongoose'.
- 'on': Escuta continuamente eventos, como erros.
- 'once': Escuta apenas uma vez o evento 'open', que sinaliza que a conexão foi estabelecida com sucesso.
*/
con.on("error", (erro) => {
    console.error('Erro de conexão:', erro);
});

con.once("open", () => {
    console.log("Conexão feita com sucesso");
});

/*
A constante 'app' inicializa o servidor usando o framework Express.
Com 'app', podemos definir rotas, middlewares e configurar respostas para requisições HTTP.
*/
const app = express();

/*
As rotas da aplicação são definidas no arquivo 'routes/index.js'.
Aqui, elas são importadas e associadas ao app.
*/
routes(app);

/*
Define uma rota base '/' que responde com a mensagem 'API Running'.
Essa rota pode ser usada para verificar se o servidor está funcionando.
*/
app.get('/', (req, res) => {
    res.send('API Running');
});

/*
Exporta a instância 'app' para que seja usada no deployment no Vercel.
*/
export default app;
