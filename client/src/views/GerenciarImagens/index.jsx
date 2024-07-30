import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './GerenciarImagens.css'; // Importando o arquivo CSS

function GerenciarImagens() {
  const [imagens, setImagens] = useState([]);
  const [arquivo, setArquivo] = useState(null);
  const [alternativo, setAlternativo] = useState('');

  useEffect(() => {
    listarImagens();
  }, []);

  async function listarImagens() {
    try {
      const response = await fetch('/imagens');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const dados = await response.json();
      setImagens(dados);
    } catch (error) {
      console.error('Erro na consulta!', error);
    }
  }

  async function handleUpload(event) {
    event.preventDefault();

    if (!alternativo) {
      alert('Por favor, preencha o texto alternativo antes de enviar a imagem.');
      return;
    }

    const formData = new FormData();
    formData.append('imagem', arquivo);
    formData.append('alternativo', alternativo);

    try {
      const response = await fetch('/imagens', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      alert('Imagem enviada com sucesso');
      window.location.reload(); // Recarregar a página
    } catch (error) {
      console.error('Erro ao enviar imagem!', error);
    }
  }

  async function handleDelete(id) {
    try {
      const response = await fetch(`/imagens/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      alert('Imagem deletada com sucesso');
      listarImagens();
    } catch (error) {
      console.error('Erro ao deletar imagem!', error);
    }
  }

  const serverUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;

  return (
    <div className='container'>
      <h1 className='my-4'>Gerenciar Imagens</h1>
      <form onSubmit={handleUpload} className='mb-4'>
        <div className='mb-3'>
          <label htmlFor='imagem' className='form-label'>Upload de Imagem</label>
          <input
            type='file'
            className='form-control'
            id='imagem'
            onChange={(e) => setArquivo(e.target.files[0])}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='alternativo' className='form-label'>Texto Alternativo</label>
          <input
            type='text'
            className='form-control'
            id='alternativo'
            value={alternativo}
            onChange={(e) => setAlternativo(e.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-primary'>Upload</button>
      </form>
      <div className='row'>
        {imagens.map((imagem) => (
          <div className='col-md-4' key={imagem.id}>
            <div className='card mb-4'>
              <img
                src={`${serverUrl}/public/${imagem.caminho}`}
                className='card-img-top img-fix' // Adicionando a classe img-fix
                alt={imagem.alternativo}
              />
              <div className='card-body'>
                <p className='card-text'>{imagem.alternativo}</p>
                <button
                  className='btn btn-danger'
                  onClick={() => handleDelete(imagem.id)}
                >
                  Deletar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GerenciarImagens;
