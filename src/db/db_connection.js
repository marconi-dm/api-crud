import mongoose, {mongo} from 'mongoose';
/**
 Conexão com o Banco de Dados MongoDB
 Este módulo gerencia a conexão assíncrona com o banco de dados MongoDB utilizando o Mongoose.
 
 Fluxo:
  - A função `db_con` estabelece a conexão com o MongoDB utilizando a URI fornecida na variável de ambiente `DB_CONNECTION`.
  - Em caso de falha, a função captura o erro e o registra no console.
  
  Pontos Importantes:
  - A conexão é gerenciada de forma assíncrona, permitindo que a aplicação continue operando enquanto o banco responde.
  - O uso de variáveis de ambiente para armazenar a URI garante maior segurança e flexibilidade.
 */

db_con().catch(erro => console.log(erro));

async function db_con() {
    // Estabelece a conexão com o MongoDB utilizando a URI fornecida na variável de ambiente
    mongoose.connect(process.env.DB_CONNECTION);
    // Retorna a conexão estabelecida
    return mongoose.connection;

};

// Exporta a função para que seja utilizada em outras partes do projeto
export default db_con;