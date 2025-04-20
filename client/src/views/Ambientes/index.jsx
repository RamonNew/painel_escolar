import { useState } from "react";

function Ambientes() {
  const [dataAula, setDataAula] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [ambientes, setAmbientes] = useState([]);

  async function buscarAmbientes(e) {
    e.preventDefault();

    if (!dataAula || !periodo) {
      console.error('Data ou período não foi fornecido');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/rooms/available`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: dataAula,
          periodo
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar ambientes');
      }

      const responseData = await response.json();
      setAmbientes(responseData);
    } catch (error) {
      console.error('Erro ao buscar ambientes:', error);
    }
  }

  return (
    <div className="container">
      <h1 className="text-center">Disponibilidade de Ambientes</h1>
      <form onSubmit={buscarAmbientes}>
        <div className="row">
          <div className="col">
            <label>Data:</label>
            <input
              type="date"
              className="form-control"
              value={dataAula}
              onChange={(e) => setDataAula(e.target.value)}
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col">
            <label>
              <input
                type="radio"
                name="periodo"
                value="manha"
                checked={periodo === 'manha'}
                onChange={(e) => setPeriodo(e.target.value)}
              />
              Manhã
            </label>
          </div>
          <div className="col">
            <label>
              <input
                type="radio"
                name="periodo"
                value="tarde"
                checked={periodo === 'tarde'}
                onChange={(e) => setPeriodo(e.target.value)}
              />
              Tarde
            </label>
          </div>
          <div className="col">
            <label>
              <input
                type="radio"
                name="periodo"
                value="noite"
                checked={periodo === 'noite'}
                onChange={(e) => setPeriodo(e.target.value)}
              />
              Noite
            </label>
          </div>
        </div>

        <button className="btn btn-primary mt-3" type="submit">
          Buscar Ambientes
        </button>
      </form>

      <div className="mt-5">
        <h2>Ambientes Disponíveis</h2>
        <ul className="list-group">
          {ambientes.map((ambiente) => (
            <li
              key={ambiente.nome}
              className={`list-group-item ${ambiente.ocupado ? 'bg-warning' : ''}`}
            >
              {ambiente.ambiente} {ambiente.ocupado?'ocupado':'disponível'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Ambientes;
