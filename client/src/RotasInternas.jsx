import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddUsuario from './views/AdicionarUsuarios';
import GestaoUsuarios from './views/GestaoUsuarios';
import EditUsuario from './views/EditUsuario';
import Contingencia from './views/Contingencia';
import GerenciarImagens from './views/GerenciarImagens';

function RotasInternas() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path='/adicionarUsuario' element={<AddUsuario />} />
                <Route path='/gestaoUsuario' element={<GestaoUsuarios />} />
                <Route path='/editUsuario/:id' element={<EditUsuario />} />
                <Route path='/contingencia' element={<Contingencia />} />
                <Route path='/gerenciarimagens' element={<GerenciarImagens />} />
            </Routes>
        </div>
    )
}

export default RotasInternas