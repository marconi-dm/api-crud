import mongoose, { mongo } from "mongoose";
const { Schema } = mongoose;
/*
Modelo de Clientes
Este módulo define o schema e o modelo para os clientes no banco de dados MongoDB utilizando o Mongoose.

Descrição Geral:
- O schema `costumerSchema` especifica a estrutura e as regras para os documentos na coleção `clientes`.
- Inclui campos obrigatórios e configurações, como unicidade para o CPF.
- A configuração `versionKey: false` desativa o campo padrão `__v` do Mongoose, usado para controle de versão.

Estrutura:
- id: Identificador único do cliente, gerado automaticamente.
- nome: Nome do cliente, obrigatório.
- cpf: Cadastro de Pessoa Física, obrigatório e único.
- nascimento: Data de nascimento do cliente, obrigatória.
*/
const costumerSchema = new Schema({
    id:{type: Schema.Types.ObjectId },
    nome: {type: String, required: true},
    cpf: {type: String, required: true, unique: true},
    nascimento: {type: String, required: true},
}, { versionKey: false });

// Criação do modelo "clientes" com base no schema
const clientes = mongoose.model('clientes', costumerSchema)
// Exporta o modelo para ser utilizado em outros módulos
export default clientes;