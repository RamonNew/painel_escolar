import React from "react";

const ListaUsuarios = ({ usuarios,deletarUsuario,editarUsuario }) => {
  return (
    <div className="container">
      {/* Cabeçalhos das colunas */}
      <div className="row fw-bold mb-2">
        <div className="col-md-4">Nome | Login</div>
        <div className="col-md-4">Permissões</div>
        <div className="col-md-4">Ações</div>
      </div>

      {/* Lista de usuários */}
      <ul className="list-group">
        {usuarios.map((usuario) => (
          <li key={usuario.usuario_id} className="list-group-item">
            <div className="row align-items-center">
              <div className="col-md-4">
                <strong>{usuario.nome}</strong>
                <br />
                <span className="text-muted">{usuario.usuario}</span>
              </div>
              <div className="col-md-4">
                <span
                  className={`badge rounded-pill text-bg-${
                    usuario.usuario_tipo === "A" ? "success" : "secondary"
                  }`}
                >
                  {usuario.usuario_tipo === "A" ? "Administrador" : "Usuário"}
                </span>
              </div>
              <div className="col-md-4">
                <button
                  className="btn btn-primary btn-sm me-2"
                   onClick={() => editarUsuario(usuario)}
                >
                  Editar
                </button>
                <button
                   onClick={() => deletarUsuario(usuario.usuario_id)}
                  className="btn btn-danger btn-sm"
                >
                  Deletar
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaUsuarios;
