import clientes from "../models/customer.js";

/*
 ClienteController - Controle de Clientes
 Esta classe implementa as operações de CRUD para gerenciar clientes no banco de dados.
  
  CRUD:
  - C (Create): Adiciona novos clientes ao banco.
  - R (Read): Recupera informações de clientes.
  - U (Update): Atualiza dados de clientes existentes.
  - D (Delete): Remove clientes do banco de dados.
 */

class ClienteController {

    // R - Recupera a lista de todos os clientes cadastrados
    static async customerFind(req, res) {
        try {
            const customerList = await clientes.find({});
            if (customerList.length === 0) {
                return res.status(404).json({ message: "Nenhum cliente encontrado." });
            }
            res.status(200).json(customerList);
        } catch (error) {
            console.error(`Erro ao buscar clientes: ${error.message}`); // Log do erro para depuração
            res.status(500).json({
                message: `${error.message} - Falha na requisição`,
            });
        }
    };

    // C - Adiciona um novo cliente ao banco de dados
    static async addCustomer(req, res){
        try {
            const newCustomer =  await clientes.create(req.body);
            res.status(200).json({message: `Novo cliente cadastrado ${newCustomer}`});
        } catch (error) {
            res.status(500).json({
                message: `Erro ao adicionar cliente ${error.message}`
            });
            
        }

    };

    // R - Busca informações de um cliente pelo CPF
    static async findCustomerbyCpf (req, res){
        try {
            const cpf = req.params.cpf;
            const customerFound = await clientes.findOne({cpf:cpf});
            res.status(200).json(customerFound);
        } catch (error) {
            res.status(500).json({message: `Erro ao procurar cliente ${error.message}`})
        }

    };

    // U - Atualiza as informações de um cliente existente pelo CPF
    static async updateCustomer (req, res){
        try {
            const { cpf } = req.params;
    
            const updateCustomer = await clientes.findOneAndUpdate({ cpf } , req.body, { new: true } );

            if (!updateCustomer) {
                return res.status(404).json({ message: "Cliente não encontrado." });
            }
            res.status(200).json({ message: "Cliente atualizado"});
            
        } catch (error) {
            res.status(500).json({ message: `Erro ao atualizar cliente: ${error.message}` });
        }
    };

    // D - Remove um cliente do banco de dados pelo CPF
    static async deleteCustomer (req, res){
        try {
            const {cpf} = req.params;

            const deletedCustomer = await clientes.findOneAndDelete({cpf});

            if (!deletedCustomer) {
                return res.status(404).json({message: "Cliente não encontrado." })
            };

            res.status(200).json({ message: "Cliente excluído com sucesso" });
            
        } catch (error) {
            res.status(500).json({ message: `${error.message} - falha na exclusão` });
            
        };
    }


}

export default ClienteController;
