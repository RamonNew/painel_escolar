import React, { useEffect, useState } from 'react';
//import './Home.css';

function Contingencia() {
  const [aulas, setAulas] = useState([]);
  const [dataInicioFiltro, setDataInicioFiltro] = useState('');
  const [dataFimFiltro, setDataFimFiltro] = useState('');
  const [periodosFiltro, setPeriodosFiltro] = useState({
    manha: false,
    tarde: false,
    noite: false,
  });
  const [login, setLogin] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    document.title = "Agenda de Salas SENAI Vitória";
    listarAulas();
  }, []);

  async function listarAulas() {
    try {
      const response = await fetch('/aulas');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const dados = await response.json();
      setAulas(dados);
    } catch (error) {
      console.error('Erro na consulta!', error);
    }
  }

  async function filtrarAulas(event) {
    event.preventDefault();
    const periodosSelecionados = Object.entries(periodosFiltro)
      .filter(([periodo, selecionado]) => selecionado)
      .map(([periodo]) => periodo);
    if (periodosSelecionados.length === 0) {
      alert('Selecione pelo menos um período');
      return;
    }
    try {
      const response = await fetch('/aulas/data-periodo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          dataInicio: dataInicioFiltro,
          dataFim: dataFimFiltro,
          periodos: periodosSelecionados
        })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const dados = await response.json();
      setAulas(dados);
    } catch (error) {
      console.error('Erro ao filtrar aulas!', error);
    }
  }

  async function salvarAula(aula) {
    try {
      const response = await fetch(`/aulas/${aula.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(aula)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      alert('Aula alterada');
      window.location.reload();
    } catch (error) {
      console.error('Erro ao salvar aula!', error);
    }
  }

  async function atualizarChave(id, chave) {
    try {
      const response = await fetch(`/chave/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ chave })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Atualiza a lista de aulas após alterar a chave
      setAulas(prevAulas => prevAulas.map(aula => aula.id === id ? { ...aula, chave } : aula));
    } catch (error) {
      console.error('Erro ao atualizar chave!', error);
    }
  }

  function formatarData(dataHoraISO) {
    const data = new Date(dataHoraISO);
    return data.toLocaleDateString('pt-BR');
  }

  function formatarHora(dataHoraISO) {
    const data = new Date(dataHoraISO);
    return data.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  const motivos = [
    { value: 1, label: 'Falta de Agendamento' },
    { value: 2, label: 'Ambiente com Defeito' },
    { value: 3, label: 'Falha agendamento SPE' },
    { value: 4, label: 'Outros' }
  ];

  return (
    <div className='px-2'>
      {isLoggedIn && <div>Bem-Vindo, {login} <br />Essas informações <font color='red'>PODEM</font> ser acessadas por você</div>}
      <div className="conteudo">
        <div id='filtros' className='col-4'>
          <form className='filtros mt-3' onSubmit={filtrarAulas}>
            <div className='row'>

              <label className='fw-bold col'>
                Data Início:
                <input
                  class="form-control"
                  type="date"
                  value={dataInicioFiltro}
                  onChange={(e) => setDataInicioFiltro(e.target.value)}
                />
              </label>
              <label className='fw-bold col'>
                Data Fim:
                <input
                  class="form-control"
                  type="date"
                  value={dataFimFiltro}
                  onChange={(e) => setDataFimFiltro(e.target.value)}
                />
              </label>
            </div>
            <div className='row'>
              <label className='col my-auto'>
                <input
                  className='my-auto'
                  type="checkbox"
                  name="periodo"
                  value="manha"
                  checked={periodosFiltro.manha}
                  onChange={(e) => setPeriodosFiltro({ ...periodosFiltro, manha: e.target.checked })}
                />
                Manhã
              </label>
              <label className='col my-auto'>
                <input
                  type="checkbox"
                  name="periodo"
                  value="tarde"
                  checked={periodosFiltro.tarde}
                  onChange={(e) => setPeriodosFiltro({ ...periodosFiltro, tarde: e.target.checked })}
                />
                Tarde
              </label>
              <label className='col my-auto'>
                <input
                  type="checkbox"
                  name="periodo"
                  value="noite"
                  checked={periodosFiltro.noite}
                  onChange={(e) => setPeriodosFiltro({ ...periodosFiltro, noite: e.target.checked })}
                />
                Noite
              </label>

              <button className='ms-1 my-2 btn btn-primary col' type="submit">Filtrar</button>

            </div>
          </form>
        </div>
        <table id="tabelaAulas" className="">
          <thead>
            <tr>
              <th scope="col">Data</th>
              <th scope="col">Inicio</th>
              <th scope="col">Fim</th>
              <th scope="col">Turma</th>
              <th scope="col">Instrutor</th>
              <th scope="col">Unidade Curricular</th>
              <th scope="col">Ambiente</th>
              <th scope="col">Chave</th>
              <th scope="col">Salvar</th>
            </tr>
          </thead>
          <tbody>
            {aulas.map(aula => (
              <tr key={aula.id} className={aula.chave ? 'chave-verde' : ''}>
                <td>{formatarData(aula.data_hora_inicio)}</td>
                <td>{formatarHora(aula.data_hora_inicio)}</td>
                <td>{formatarHora(aula.data_hora_fim)}</td>
                <td>{aula.turma.toUpperCase()}</td>
                <td>
                  <input
                    name="instrutor"
                    type="text"
                    value={aula.instrutor}
                    onChange={(e) => setAulas(aulas.map(a => a.id === aula.id ? { ...a, instrutor: e.target.value } : a))}
                  />
                </td>
                <td>
                  <input
                    name="unidade_curricular"
                    type="text"
                    value={aula.unidade_curricular}
                    onChange={(e) => setAulas(aulas.map(a => a.id === aula.id ? { ...a, unidade_curricular: e.target.value } : a))}
                  />
                </td>
                <td>
                  <input
                    name="ambiente"
                    type="text"
                    value={aula.ambiente}
                    onChange={(e) => setAulas(aulas.map(a => a.id === aula.id ? { ...a, ambiente: e.target.value } : a))}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={aula.chave}
                    onChange={(e) => atualizarChave(aula.id, e.target.checked)}
                  />
                </td>
                <td>
                  <button className='btn btn-success' onClick={() => salvarAula(aula)}>Salvar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <a href="anun.php">Anúncios Laterais</a>
      </div>
    </div>
  );
}

export default Contingencia;
