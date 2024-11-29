import jwt from 'jsonwebtoken';
import Users from '../models/user.js';

const authMiddleware = async (req, res, next) => {
    try {
        // Obtém o Token
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Acesso Negado. Token não fornecido.' });
        }

        // Decodifica o token
        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret);

        // Busca o usuário no banco de dados
        const user = await Users.findById(decoded.id).select('-senha'); // Exclui a senha da exibição
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        // Adiciona o usuário ao objeto req
        req.user = user;

        next(); // Continua para a próxima função na rota
    } catch (error) {
        console.error('Erro na autenticação:', error.message);
        return res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
};

export default authMiddleware;
