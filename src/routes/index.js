import express from 'express';
import customers from './customerRoutes.js';
import users from './userRoutes.js';
import cors from 'cors';
/*
Definição das Rotas Principais da Aplicação
Este módulo funciona como um "barrel", centralizando e configurando as rotas principais da aplicação.
As rotas específicas são importadas e registradas no `app`, que é a instância do servidor Express.

Descrição Geral:
- A rota base `/` serve como ponto de verificação para garantir que a API está funcionando.
- As rotas relacionadas à entidade "clientes" são importadas e registradas para uso.
- O middleware `express.json()` é utilizado para garantir que o corpo das requisições seja interpretado como JSON.
*/
const routes = (app) => {
    app.use(
        cors({
            origin:'https://basic-crm-gamma.vercel.app'
        })
    )
    // Define a rota base "/"
    app.route("/").get((req, res) => res.status(200).send("API Running"));
    // Registra o middleware para interpretar JSON e as rotas de clientes
    app.use(express.json(), customers, users,);
};


export default routes;
