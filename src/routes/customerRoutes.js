import express from 'express';
import ClienteController from '../controllers/customerController.js';

/*
Definição das Rotas para o Recurso "Clientes"
Este módulo configura as rotas da aplicação relacionadas à entidade "clientes".
Cada rota corresponde a uma operação específica do CRUD (Create, Read, Update, Delete).
As rotas são controladas pelos métodos do ClienteController.

Rotas:
- GET /clientes: Lista todos os clientes cadastrados.
- GET /clientes/:cpf: Busca um cliente específico pelo CPF.
- POST /clientes: Adiciona um novo cliente ao banco de dados.
- PUT /clientes/:cpf: Atualiza as informações de um cliente pelo CPF.
- DELETE /clientes/:cpf: Remove um cliente do banco de dados pelo CPF.
*/

const routes = express.Router();

/*
GET /clientes
Controlador: ClienteController.customerFind
Descrição: Retorna a lista de todos os clientes cadastrados no banco de dados.
*/
routes.get("/clientes", ClienteController.customerFind);
/*
GET /clientes/:cpf
Controlador: ClienteController.findCustomerbyCpf
Descrição: Busca e retorna um cliente específico com base no CPF fornecido como parâmetro na URL.
*/
routes.get("/clientes/:cpf", ClienteController.findCustomerbyCpf);
/*
POST /clientes
Controlador: ClienteController.addCustomer
Descrição: Adiciona um novo cliente ao banco de dados. Os dados do cliente devem ser enviados no corpo da requisição.
*/
routes.post("/clientes", ClienteController.addCustomer);
/*
PUT /clientes/:cpf
Controlador: ClienteController.updateCustomer
Descrição: Atualiza as informações de um cliente existente com base no CPF fornecido. Os dados atualizados devem ser enviados no corpo da requisição.
*/
routes.put("/clientes/:cpf", ClienteController.updateCustomer);
/*
DELETE /clientes/:cpf
Controlador: ClienteController.deleteCustomer
Descrição: Remove um cliente do banco de dados com base no CPF fornecido como parâmetro na URL.
*/
routes.delete("/clientes/:cpf", ClienteController.deleteCustomer);



export default routes;