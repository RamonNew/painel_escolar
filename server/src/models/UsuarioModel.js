import mysql from 'mysql2/promise';
import db from '../conexao.js';
import bcrypt from 'bcryptjs';

class UsuarioModel {
    constructor() {
        this.conexao = mysql.createPool(db);
    }

    async mostrarUsuario(usuario_id) {
        const sql = 'SELECT * FROM usuarios WHERE usuario_id = ?';
        try {
            const [retorno] = await this.conexao.query(sql, [usuario_id]);
            if (retorno.length === 0) {
                return [404, 'Usuário não encontrado'];
            } else {
                return [200, retorno[0]];
            }
        } catch (erro) {
            console.debug(erro);
            return [400, erro];
        }
    }

    async deletarUsuario(usuario_id) {
        const sql = 'DELETE FROM usuarios WHERE usuario_id = ?';
        try {
            const [retorno] = await this.conexao.query(sql, [usuario_id]);
            if (retorno.affectedRows === 0) {
                return [404, 'Usuário não encontrado'];
            } else {
                return [202, 'Usuário deletado com sucesso!'];
            }
        } catch (erro) {
            console.debug(erro);
            return [400, erro];
        }
    }

    async atualizarUsuario(usuario_id, nome, usuario, senha, usuario_tipo) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(senha, salt);
        const sql = 'UPDATE usuarios SET nome = ?, usuario = ?, senha = ?, usuario_tipo = ? WHERE usuario_id = ?';
        const params = [nome, usuario, hash, usuario_tipo, usuario_id];

        try {
            const [retorno] = await this.conexao.query(sql, params);
            if (retorno.affectedRows === 0) {
                return [404, 'Usuário não encontrado'];
            } else {
                return [200, 'Usuário atualizado com sucesso!'];
            }
        } catch (erro) {
            console.debug(erro);
            return [400, erro];
        }
    }

    async mostrarTodos() {
        const sql = 'SELECT * FROM usuarios';
        try {
            const [retorno] = await this.conexao.query(sql);
            return [200, retorno];
        } catch (erro) {
            console.debug(erro);
            return [400, erro];
        }
    }

    async inserir(nome, usuario, senha, usuario_tipo) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(senha, salt);
        const sql = 'INSERT INTO usuarios (nome, usuario, senha, usuario_tipo) VALUES (?, ?, ?, ?)';
        const params = [nome, usuario, hash, usuario_tipo];

        try {
            const [retorno] = await this.conexao.query(sql, params);
            return [201, 'Usuário Inserido'];
        } catch (erro) {
            console.debug(erro);
            return [400, erro];
        }
    }

    async verificaUsuarioSenha(usuario, senha) {
        const sql = 'SELECT * FROM usuarios WHERE usuario = ?';
        try {
            const [retorno] = await this.conexao.query(sql, [usuario]);
            if (retorno.length === 0) {
                return [401, 'Usuário ou senha inválido'];
            } else {
                let hash = retorno[0].senha;
                let logado = bcrypt.compareSync(senha, hash);
                if (logado) {
                    let { usuario_id, usuario_tipo } = retorno[0];
                    return [200, 'Logado', usuario_id, usuario_tipo];
                } else {
                    return [401, 'Usuário ou senha inválido'];
                }
            }
        } catch (erro) {
            console.debug(erro);
            return [400, erro];
        }
    }
}

export default new UsuarioModel();
