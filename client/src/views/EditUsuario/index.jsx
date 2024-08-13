import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function EditUsuario() {
    const navigate = useNavigate();  // Para redirecionar após atualização
    const location = useLocation();  // Hook para acessar o estado
    const { usuario } = location.state || {};  // Extrai os dados do usuário do estado ou usa um objeto vazio

    const [nome, setNome] = useState(usuario?.nome || '');
    const [usuarioNome, setUsuarioNome] = useState(usuario?.usuario || '');  // Renomeado para evitar conflito de nomes
    const [senha, setSenha] = useState('');
    const [usuario_tipo, setUsuarioTipo] = useState(usuario?.usuario_tipo || '');
    const [loading, setLoading] = useState(false);  // Estado de carregamento, mas aqui inicia como falso

    useEffect(() => {
        // Redireciona para "contingencia" se o estado 'usuario' não estiver presente
        if (!usuario) {
            navigate('/contingencia');
        }
    }, [usuario, navigate]);

    async function atualizarUsuario(event) {
        event.preventDefault();  // Previne o recarregamento da página
        const usuarioData = { nome, usuario: usuarioNome, senha, usuario_tipo };
        try {
            const resposta = await fetch(`/usuarios/${usuario.usuario_id}`, {
                method: 'PUT',  // Método HTTP para atualização
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuarioData)  // Envia os dados como JSON
            });
            if (!resposta.ok) {
                throw new Error('Erro ao atualizar usuário');
            } else {
                alert('Usuário Atualizado');
                navigate('/gestaoUsuario');  // Redireciona para a página de gestão de usuários após a atualização
            }
        } catch (error) {
            console.error('Erro ao atualizar o usuário:', error);
        }
    }

    if (loading) {
        return <div>Carregando...</div>;  // Exibe mensagem de carregamento enquanto os dados são buscados
    }

    return (
        <div className='container justify-content-center col-5'>
            <h1 className='text-center'>Editar Usuário</h1>
            <form onSubmit={atualizarUsuario}>
                <label>Nome:</label>
                <input
                    className='form-control'
                    type="text"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                />
                <label>Usuário:</label>
                <input
                    className='form-control'
                    type="text"
                    value={usuarioNome}
                    onChange={e => setUsuarioNome(e.target.value)}
                />
                <label>Nova Senha:</label>
                <input
                    className='form-control'
                    type="password"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                />
                <label>Tipo de Usuário:</label>
                <select
                    className='form-select'
                    value={usuario_tipo}
                    onChange={e => setUsuarioTipo(e.target.value)}
                >
                    <option value="">Selecione</option>
                    <option value="A">Admin</option>
                    <option value="U">Usuário</option>
                </select>
                <a className='btn btn-danger mt-2 float-middle' href="/gestaoUsuario">Cancelar</a>
                <button className='btn btn-primary mt-2 float-end' type='submit'>Atualizar Usuário</button>
            </form>
        </div>
    );
}

export default EditUsuario;
