import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // Importa useParams para capturar o ID da URL

function EditUsuario() {
    const { id } = useParams();  // Extrai o 'id' do usuário da URL

    // Estados para armazenar os detalhes do usuário
    const [nome, setNome] = useState('');
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [usuario_tipo, setUsuarioTipo] = useState('');
    const [loading, setLoading] = useState(true);  // Controle do estado de carregamento

    useEffect(() => {
        // Função para carregar os dados do usuário da API ao montar o componente
        async function buscarUsuario() {
            try {
                const resposta = await fetch(`/usuarios/${id}`);  // Requisição GET para a API
                const dados = await resposta.json();
                if (resposta.ok) {
                    setNome(dados.nome);
                    setUsuario(dados.usuario);
                    setUsuarioTipo(dados.usuario_tipo);
                    // A senha não é carregada por razões de segurança
                } else {
                    throw new Error('Falha ao carregar dados do usuário');
                }
            } catch (error) {
                console.error('Erro ao buscar os dados do usuário:', error);
            }
            setLoading(false);  // Indica que o carregamento foi concluído
        }

        buscarUsuario();
    }, [id]);  // Dependência do useEffect para recarregar quando o ID muda

    // Função para lidar com a submissão do formulário e atualização do usuário
    async function atualizarUsuario(event) {
        event.preventDefault();  // Previne o recarregamento da página
        const usuarioData = { nome, usuario, senha, usuario_tipo };
        try {
            const resposta = await fetch(`/usuarios/${id}`, {
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
                window.location.href = '/';  // Redireciona para a página inicial após a atualização
            }
        } catch (error) {
            console.error('Erro ao atualizar o usuário:', error);
        }
    }

    if (loading) {
        return <div>Carregando...</div>;  // Exibe mensagem de carregamento enquanto os dados são buscados
    }

    return (
        <div className='container'>
            <h1>Editar Usuário</h1>
            <form onSubmit={atualizarUsuario}>
                <label>Nome:</label>
                <input type="text" value={nome} onChange={e => setNome(e.target.value)} />
                <label>Usuário:</label>
                <input type="text" value={usuario} onChange={e => setUsuario(e.target.value)} />
                <label>Nova Senha:</label>
                <input type="password" value={senha} onChange={e => setSenha(e.target.value)} />
                <label>Tipo de Usuário:</label>
                <select value={usuario_tipo} onChange={e => setUsuarioTipo(e.target.value)}>
                    <option value="">Selecione</option>
                    <option value="A">Admin</option>
                    <option value="U">Usuário</option>
                </select>
                <button type='submit'>Atualizar Usuário</button>
            </form>
        </div>
    );
}

export default EditUsuario;