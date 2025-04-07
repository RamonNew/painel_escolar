import mysql from "mysql2/promise";
import db from "../conexao.js";
import path from "path";
import fs from "fs/promises";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ImagemModel {
  constructor() {
    this.conexao = mysql.createPool(db);
  }

  async mostrarTodos() {
    const sql = "SELECT * FROM anuncios";
    try {
      const [retorno] = await this.conexao.query(sql);
      return [200, retorno];
    } catch (erro) {
      console.debug(erro);
      return [400, erro];
    }
  }

  async mostrarPorId(id) {
    const sql = "SELECT * FROM anuncios WHERE id = ?";
    try {
      const [retorno] = await this.conexao.query(sql, [id]);
      if (retorno.length > 0) {
        return [200, retorno[0]];
      } else {
        return [404, "Imagem não encontrada"];
      }
    } catch (erro) {
      console.debug(erro);
      return [400, erro];
    }
  }

  async inserir(arquivo, alternativo, nomeImagem) {
    const sql = "INSERT INTO anuncios (alternativo, caminho) VALUES (?, ?)";
    const params = [alternativo, nomeImagem];
    try {
      const [retorno] = await this.conexao.query(sql, params);
      await arquivo.mv(path.join(__dirname, "../public/img/", nomeImagem));
      return [201, { mensagem: "Imagem inserida com sucesso" }];
    } catch (erro) {
      console.debug(erro);
      return [400, erro];
    }
  }

  async atualizar(id, alternativo, nomeImagem) {
    let sql = "UPDATE anuncios SET ";
    const updates = [];
    const params = [];

    if (alternativo) {
      updates.push("alternativo = ?");
      params.push(alternativo);
    }
    if (nomeImagem) {
      updates.push("caminho = ?");
      params.push(nomeImagem);
    }

    if (updates.length === 0) {
      return [400, "Nenhum campo para atualizar"];
    }

    sql += updates.join(", ") + " WHERE id = ?";
    params.push(id);

    try {
      const [retorno] = await this.conexao.query(sql, params);
      if (nomeImagem) {
        await arquivo.mv(path.join(__dirname, "../public/img/", nomeImagem));
      }
      return [200, retorno];
    } catch (erro) {
      console.debug(erro);
      return [400, erro];
    }
  }

  async deletar(id) {
    const sql = "SELECT caminho FROM anuncios WHERE id = ?";
    try {
      const [retorno] = await this.conexao.query(sql, [id]);
      if (retorno.length > 0) {
        const caminho = retorno[0].caminho;
        await this.conexao.query("DELETE FROM anuncios WHERE id = ?", [id]);
        await fs.unlink(path.join(__dirname, "../public/img/", caminho));
        return [200, { mensagem: "Imagem deletada com sucesso" }];
      } else {
        return [404, "Imagem não encontrada"];
      }
    } catch (erro) {
      console.debug(erro);
      return [400, erro];
    }
  }
}

export default new ImagemModel();
