import { useEffect, useState } from 'react'

function GestaoUsuarios() {
    // Estado para armazenar usuários
    const [usuarios, setUsuarios] = useState([])
    useEffect(() => {
        document.title = "Página de gerenciamento"
        carregarUsuarios()
    }, [])

    // Função para carregar usuários
    async function carregarUsuarios() {
        try {
            // Faz a chamada para a API através do proxy
            const resposta = await fetch('/usuarios')
            if (!resposta) {
                throw new Error("Erro requisição:" + resposta.status)
            } else { // Não é necessário o else
                const dados = await resposta.json()
                setUsuarios(dados)
            }
        } catch (error) {
            console.error("Errro ao buscar os usuaários", error)
        }
    }

    // Função de deletar um usuário
    async function deletarUsuario(usuario_id) {
        if (window.confirm("Tem certeza que deseja deletar esse usuário?")) {
            try {
                const resposta = await fetch('/usuarios/' + usuario_id, {
                    method: 'DELETE',
                })
                if (!resposta.ok) {
                    throw new Error("Falha ao deletar usuário")
                } else {//else não obrigatório
                    carregarUsuarios()
                }

            } catch (error) {
                console.error("Erro ao deletar usuários:", error)
            }
        }
    }
    return (
        <div className='container'>
            <div>
                <h1>Gestão de Usuários</h1>
                <a className='btn btn-primary' href="/adicionarUsuario">Adicionar Usuário</a>
            </div>
            <table class="table table-striped table-hove">
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Usuário</th>
                    <th>Tipo</th>
                    <th>Ações</th>
                </tr>
                {usuarios.map(usuario => (
                    <tr key={usuario.usuario_id}>
                        <td>{usuario.usuario_id}</td>
                        <td>{usuario.nome}</td>
                        <td>{usuario.usuario}</td>
                        <td>{usuario.usuario_tipo}</td>
                        <td>
                            {/* Criando rota editar */}
                            <button className="btn btn-primary" onClick={() => window.location.href = `/editUsuario/${usuario.usuario_id}`}>Editar</button>
                            <button onClick={() => deletarUsuario(usuario.usuario_id)} class="btn btn-danger">Deletar</button>
                        </td>
                    </tr>

                ))}
            </table>
        </div>
    )
}

export default GestaoUsuarios