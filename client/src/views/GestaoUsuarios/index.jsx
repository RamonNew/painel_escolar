import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Importação corrigida
import ListaUsuarios from "../../components/ListaUsuarios";

function GestaoUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Página de gerenciamento";

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const usuarioTipo = decodedToken.usuario_tipo;

        // Verifica se o usuário é um administrador
        if (usuarioTipo !== "A") {
          navigate("/contingencia"); // Redireciona para "contingencia" se não for admin
        } else {
          carregarUsuarios(); // Carrega os usuários se for admin
        }
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        localStorage.removeItem("token");
        navigate("/logar");
      }
    } else {
      navigate("/logar"); // Redireciona para login se não houver token
    }
  }, [navigate]);

  async function carregarUsuarios() {
    try {
      const resposta = await fetch("/usuarios");
      if (!resposta.ok) {
        throw new Error("Erro requisição: " + resposta.status);
      } else {
        const dados = await resposta.json();
        setUsuarios(dados);
      }
    } catch (error) {
      console.error("Erro ao buscar os usuários", error);
    }
  }

  async function deletarUsuario(usuario_id) {
    if (window.confirm("Tem certeza que deseja deletar esse usuário?")) {
      try {
        const resposta = await fetch("/usuarios/" + usuario_id, {
          method: "DELETE",
        });
        if (!resposta.ok) {
          throw new Error("Falha ao deletar usuário");
        } else {
          carregarUsuarios();
        }
      } catch (error) {
        console.error("Erro ao deletar usuários:", error);
      }
    }
  }

  function editarUsuario(usuario) {
    // Navega para a página de edição com os dados do usuário como estado
    navigate("/editUsuario", { state: { usuario } });
  }

  return (
    <div className="container">
      <div>
        <h1>Gestão de Usuários</h1>
        <p>Adicione, edite e delete usuários</p>
      </div>
      <div>
        
      </div>
      <div className="fs-3 text fw-bold d-flex">
          Todos Usuários
        <span className="text-secondary">{" "}{usuarios.length}</span>
        <a className="btn btn-dark ms-auto" href="/adicionarUsuario">
         + Adicionar Usuário
        </a>
      </div>
      <ListaUsuarios
        usuarios={usuarios}
        deletarUsuario={deletarUsuario}
        editarUsuario={editarUsuario}
      />
    </div>
  );
}

export default GestaoUsuarios;
