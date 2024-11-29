import Users from '../models/user.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


class userController{

    static async register(req, res){
        try {
            const {nome, email, senha, confirmaSenha} = req.body

            //validando dados
            //faço o uso de Object.entries para iterar em pares de chaves e valores
            const requiredValues = {nome, email, senha}
            for (const [key, value] of Object.entries(requiredValues)){
                if (!value) {
                    return res.status(422).json({message: `O campo ${key} é obrigatório`})
                }
            };

            if (senha !== confirmaSenha) {
                return res.status(422).json({ message: 'As senhas não coincidem.'});
            }

            //checando usuário
            const userExists = await Users.findOne({email});

            if (userExists) {
                return res.status(422).json({message: `Email ja cadastrado`});
            }

            //criando senha
            const salt = await bcrypt.genSalt(12);
            const senhaHash = await bcrypt.hash(senha, salt);
                    
            //criando usuário
            await Users.create({
                nome,
                email,
                senha:senhaHash
            });

            return res.status(201).json({ message: 'Usuário cadastrado com sucesso!' })

        } catch (error) {
            res.status(500).json({message:`Erro na requisição ${error.message}`})
            
        }

    };


    static async login(req, res){
        try {
            const { email, senha} = req.body

            const requiredValues = {email, senha}
            for (const [key, value] of Object.entries(requiredValues)){
                if (!value) {
                    return res.status(422).json({message: `O campo ${key} é obrigatório`})
                }
            };
            //validando usuário
            const user = await Users.findOne({email})
            if (!user) {
                return res.status(404).json({message: "Usuário não encontrado"})
            }

            //validando senha
            const checkPassword = await bcrypt.compare(senha, user.senha)
            if (!checkPassword) {
                return res.status(422).json({message: "senha inválida"})
            }

            const secret = process.env.JWT_SECRET
            const token = jwt.sign({
                id: user._id,
            }, secret)

            res.status(200).json({message: `Autenticação realizado com sucesso!`, token})

        } catch (error) {
            
        }
    };


    static async profile(req, res){
        try {
            const user = req.user;
            res.status(200).json({message: "Perfil do usuário", user});
        } catch (error) {
            console.error('Erro ao buscas perfil', error.message);
            res.status(500).json({message: "Erro no servidor!"})
        }
        
    }


};


export default userController;

