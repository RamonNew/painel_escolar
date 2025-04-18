import UsuarioModel from "../models/UsuarioModel.js";
import jwt from "jsonwebtoken";

import { configDotenv } from "dotenv";

configDotenv();

const secret = process.env.SECRET_KEY;

export const index = async (req, res) => {
  try {
    const [status, resposta] = await UsuarioModel.mostrarTodos();
    console.debug("Mostrando Usuarios");
    res.status(status).json(resposta);
  } catch (error) {
    console.debug(error);
    res.status(500).json({ error: "Erro ao listar usuários" });
  }
};

export const show = async (req, res) => {
  const { usuario_id } = req.params;
  try {
    const [status, resposta] = await UsuarioModel.mostrarUsuario(usuario_id);
    res.status(status).json(resposta);
  } catch (error) {
    console.debug(error);
    res.status(500).json({ error: "Erro ao mostrar usuário" });
  }
};

export const create = async (req, res) => {
  const { nome, usuario, senha, usuario_tipo } = req.body;
  try {
    const [status, resposta] = await UsuarioModel.inserir(
      nome,
      usuario,
      senha,
      usuario_tipo
    );
    res.status(status).json(resposta);
  } catch (error) {
    console.debug(error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
};

export const destroy = async (req, res) => {
  const { usuario_id } = req.params;
  try {
    const [status, resposta] = await UsuarioModel.deletarUsuario(usuario_id);
    res.status(status).json(resposta);
  } catch (error) {
    console.debug(error);
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
};

export const logar = async (req, res) => {
  const { usuario, senha } = req.body;
  try {
    const [status, mensagem, usuario_id, usuario_tipo] =
      await UsuarioModel.verificaUsuarioSenha(usuario, senha);
    if (status === 200) {
      const token = jwt.sign({ usuario_id, usuario_tipo }, secret, {
        expiresIn: 14400,
      });
      res.status(status).json({ token });
    } else {
      res.status(status).json({ mensagem });
    }
  } catch (error) {
    console.debug(error);
    res.status(500).json({ error: "Erro ao autenticar usuário" });
  }
};

export const update = async (req, res) => {
  const { usuario_id } = req.params;
  const { nome, usuario, senha, usuario_tipo } = req.body;
  console.debug(senha);
  try {
    const [status, resposta] = await UsuarioModel.atualizarUsuario(
      usuario_id,
      nome,
      usuario,
      senha,
      usuario_tipo
    );
    console.debug("Usuário atualizado com sucesso");
    res.status(status).json(resposta);
  } catch (error) {
    console.debug(error);
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
};

export const verificaToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).json({ error: "Nenhum token fornecido" });
  }

  jwt.verify(token, secret, (erro, decoded) => {
    if (erro) {
      return res.status(401).json({ error: "Falha na autenticação do token" });
    } else {
      req.usuario_id = decoded.usuario_id;
      req.usuario_tipo = decoded.usuario_tipo;
      console.debug(`Id: ${decoded.usuario_id}, Tipo: ${decoded.usuario_tipo}`);
      next();
    }
  });
};
