import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import Home from './views/Home'
import RotasInternas from './RotasInternas';
import TelaLogin from './views/TelaLogin';
import Impressao from './views/Impressao';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tela-login' element={<TelaLogin />} />
        <Route path='/impressao' element={<Impressao />} />
        <Route path='/*' element={<RotasInternas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
