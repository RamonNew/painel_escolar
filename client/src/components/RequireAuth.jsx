import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Corrigindo a importação

const RequireAuth = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/tela-login");
            alert("Efetue login");
        } else {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                if (decodedToken.exp < currentTime) {
                    localStorage.removeItem("token");
                    navigate("/logar");
                    alert("Sessão expirada. Efetue login novamente");
                }
            } catch (error) {
                console.error("Erro ao decodificar o token:", error);
                localStorage.removeItem("token");
                navigate("/logar");
            }
        }
    }, [navigate]);

    return children;
};

export default RequireAuth;
