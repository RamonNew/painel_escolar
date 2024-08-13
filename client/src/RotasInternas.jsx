import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddUsuario from './views/AdicionarUsuarios';
import GestaoUsuarios from './views/GestaoUsuarios';
import EditUsuario from './views/EditUsuario';
import Contingencia from './views/Contingencia';
import GerenciarImagens from './views/GerenciarImagens';
import GerenciarCSV from './views/GerenciarCSV';
import RequireAuth from './components/RequireAuth'

function RotasInternas() {
    return (
        <div>
            <Navbar />
            <RequireAuth />
            <Routes>
                <Route path='/adicionarUsuario' element={<AddUsuario />} />
                <Route path='/gestaoUsuario' element={<GestaoUsuarios />} />
                <Route path='/editUsuario/' element={<EditUsuario />} />
                <Route path='/contingencia' element={<Contingencia />} />
                <Route path='/gerenciarimagens' element={<GerenciarImagens />} />
                <Route path='/gerenciarcsv' element={<GerenciarCSV />} />
            </Routes>
        </div>
    )
}

export default RotasInternas