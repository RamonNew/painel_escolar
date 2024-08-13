import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Importação corrigida

function Navbar() {
    const [nome, setNome] = useState('Painel');
    const [usuarioTipo, setUsuarioTipo] = useState(null); // Estado para armazenar o tipo de usuário
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const usuario_id = decodedToken.usuario_id;
                carregarNomeUsuario(usuario_id, token);
            } catch (error) {
                console.error("Erro ao decodificar o token:", error);
                localStorage.removeItem("token");
                navigate("/logar");
            }
        } else {
            navigate("/logar"); // Redireciona se não houver token
        }
    }, [navigate]);

    async function carregarNomeUsuario(usuario_id, token) {
        try {
            const resposta = await fetch(`/usuarios/${usuario_id}`, {
                headers: {
                    'x-access-token': token
                }
            });

            if (!resposta.ok) {
                throw new Error(`HTTP error! status: ${resposta.status}`);
            }

            const dados = await resposta.json();
            setNome(dados.nome);
            setUsuarioTipo(dados.usuario_tipo); // Armazena o tipo de usuário
        } catch (error) {
            console.error("Erro ao carregar nome do usuário:", error);
            localStorage.removeItem("token");
            navigate("/logar");
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/logar");
    };

    return (
        <div className="menu">
            <nav className="navbar navbar-expand-md navbar-light bg-info">
                <span href="/" className="navbar-brand ms-5">{nome}</span>
                <div className="collapse navbar-collapse justify-content-center px-2" id="menu">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a href="/" className="nav-link">Inicio</a>
                        </li>
                        <li className="nav-item">
                            <a href="/contingencia" className="nav-link">Aulas</a>
                        </li>
                        <li className="nav-item">
                            <a href="/gerenciarimagens" className="nav-link">Anúncios</a>
                        </li>
                        <li className="nav-item">
                            <a href="/gerenciarcsv" className="nav-link">CSV</a>
                        </li>
                        {/* Renderiza o item de menu "Gestão de Usuários" apenas se usuario_tipo for "A" */}
                        {usuarioTipo === 'A' && (
                            <li className="nav-item">
                                <a href="/gestaoUsuario" className="nav-link">Usuários</a>
                            </li>
                        )}
                    </ul>
                </div>
                <button className="btn btn-danger me-5" onClick={handleLogout}>Logout</button>
                <button className="navbar-toggler mx-2" type="button" data-bs-toggle="collapse"
                    data-bs-target="#menu" aria-controls="menu"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </nav>
        </div>
    );
}

export default Navbar;