import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './GerenciarCSV.css'; // Adicione este import para o arquivo CSS

function GerenciarCSV() {
  const [arquivo, setArquivo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleUpload(event) {
    event.preventDefault();

    if (!window.confirm("Você realmente deseja fazer um novo upload de CSV? Isso limpará todas as aulas e aplicará os dados do novo CSV.")) {
      return;
    }

    const formData = new FormData();
    formData.append('csv', arquivo);
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/upload-csv`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      alert('Arquivo CSV enviado com sucesso');
      setArquivo(null);
    } catch (error) {
      console.error('Erro ao enviar o arquivo CSV!', error);
      alert('Erro ao enviar o arquivo CSV!');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='container'>
      {isLoading && (
        <div className='loading-overlay'>
          <div className='loading-message'>Aguarde...</div>
        </div>
      )}
      <h1 className='my-4'>Gerenciar CSV</h1>
      <form onSubmit={handleUpload} className='mb-4'>
        <div className='mb-3'>
          <label htmlFor='csv' className='form-label'>Upload de Arquivo CSV</label>
          <input
            type='file'
            className='form-control'
            id='csv'
            accept='.csv'
            onChange={(e) => setArquivo(e.target.files[0])}
          />
        </div>
        <button type='submit' className='btn btn-primary'>Upload</button>
      </form>
    </div>
  );
}

export default GerenciarCSV;
