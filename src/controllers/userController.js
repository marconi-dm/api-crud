import Users from '../models/user.js';



class userController{

    static async register(req, res){
        try {
            const {nome, email, senha, confirmaSenha} = req.body

            if (!nome) {
                
                return res.status(422).json({message: "O nome é obrigatório"})
            }
        } catch (error) {
            res.status(500).json({message:`Erro na requisição ${error.message}`})
            
        }
        
    }


};


export default userController;

