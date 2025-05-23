import { useEffect, useState } from "react";
import AbreviaUC from "../../components/AbreviaUC";
import Ambiente from "../../components/Ambiente";
import ModalMensagem from "../../components/ModalMensagem";
//import './Home.css';

function Contingencia() {
  const [aulas, setAulas] = useState([]);
  const [dataInicioFiltro, setDataInicioFiltro] = useState("");
  const [dataFimFiltro, setDataFimFiltro] = useState("");
  const [periodosFiltro, setPeriodosFiltro] = useState({
    manha: false,
    tarde: false,
    noite: false,
  });
  const [turmaFiltro, setTurmaFiltro] = useState(""); // Novo estado para o filtro de turma
  const [login, setLogin] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [dadosModal, setDadosModal] = useState({
    titulo: "",
    mensagem: "",
    tipo: "",
  });

  useEffect(() => {
    document.title = "Agenda de Salas SENAI Vitória";
    listarAulas();
  }, []);

  async function listarAulas() {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/classes`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const dados = await response.json();
      setAulas(dados);
    } catch (error) {
      console.error("Erro na consulta!", error);
    }
  }

  async function filtrarAulas(event) {
    event.preventDefault();
    const periodosSelecionados = Object.entries(periodosFiltro)
      .filter(([periodo, selecionado]) => selecionado)
      .map(([periodo]) => periodo);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/classes/date-period`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dataInicio: dataInicioFiltro,
          dataFim: dataFimFiltro,
          periodos: periodosSelecionados,
          turma: turmaFiltro, // Adiciona o filtro de turma à requisição
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const dados = await response.json();
      setAulas(dados);
    } catch (error) {
      console.error("Erro ao filtrar aulas!", error);
    }
  }

  async function salvarAula(aula) {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/classes/${aula.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(aula),
      });
      const resposta = await response.json();
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      //alert('Aula alterada');
      // Atualiza a lista de aulas após a alteração
      setAulas((prevAulas) =>
        prevAulas.map((a) => (a.id === aula.id ? aula : a))
      );
      setDadosModal({
        titulo: "Sucesso",
        mensagem: resposta.mensagem,
        tipo: "text-white bg-success",
      });
      setMostrarModal(true);
    } catch (error) {
      console.error("Erro ao salvar aula!", error);
    }
  }

  async function atualizarChave(id, chave) {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/classes/door-key/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chave }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Atualiza a lista de aulas após alterar a chave
      setAulas((prevAulas) =>
        prevAulas.map((aula) => (aula.id === id ? { ...aula, chave } : aula))
      );
    } catch (error) {
      console.error("Erro ao atualizar chave!", error);
    }
  }

  function formatarData(dataHoraISO) {
    const data = new Date(dataHoraISO);
    return data.toLocaleDateString("pt-BR");
  }

  function formatarHora(dataHoraISO) {
    const data = new Date(dataHoraISO);
    return data.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="px-2">
      {isLoggedIn && (
        <div>
          Bem-Vindo, {login} <br />
          Essas informações <font color="red">PODEM</font> ser acessadas por
          você
        </div>
      )}
      <div className="conteudo">
        {mostrarModal && (
          <ModalMensagem
            titulo={dadosModal.titulo}
            mensagem={dadosModal.mensagem}
            onClose={() => setMostrarModal(false)}
            tipo={dadosModal.tipo}
          />
        )}
        <div id="filtros" className="col-4">
          <form className="filtros mt-3" onSubmit={filtrarAulas}>
            <div className="row">
              <label className="fw-bold col">
                Data Início:
                <input
                  className="form-control"
                  type="date"
                  value={dataInicioFiltro}
                  onChange={(e) => setDataInicioFiltro(e.target.value)}
                />
              </label>
              <label className="fw-bold col">
                Data Fim:
                <input
                  className="form-control"
                  type="date"
                  value={dataFimFiltro}
                  onChange={(e) => setDataFimFiltro(e.target.value)}
                />
              </label>
            </div>
            <div className="row">
              <label className="col my-auto">
                <input
                  className="my-auto"
                  type="checkbox"
                  name="periodo"
                  value="manha"
                  checked={periodosFiltro.manha}
                  onChange={(e) =>
                    setPeriodosFiltro({
                      ...periodosFiltro,
                      manha: e.target.checked,
                    })
                  }
                />
                Manhã
              </label>
              <label className="col my-auto">
                <input
                  type="checkbox"
                  name="periodo"
                  value="tarde"
                  checked={periodosFiltro.tarde}
                  onChange={(e) =>
                    setPeriodosFiltro({
                      ...periodosFiltro,
                      tarde: e.target.checked,
                    })
                  }
                />
                Tarde
              </label>
              <label className="col my-auto">
                <input
                  type="checkbox"
                  name="periodo"
                  value="noite"
                  checked={periodosFiltro.noite}
                  onChange={(e) =>
                    setPeriodosFiltro({
                      ...periodosFiltro,
                      noite: e.target.checked,
                    })
                  }
                />
                Noite
              </label>
            </div>
            <div className="row align-items-center">
              <div className="col">
                <label className="fw-bold col">
                  Turma:
                  <input
                    className="form-control"
                    type="text"
                    value={turmaFiltro}
                    onChange={(e) => setTurmaFiltro(e.target.value)} // Atualiza o estado do filtro de turma
                  />
                </label>
              </div>
              <div className="col-auto">
                <button className="ms-1 btn btn-primary" type="submit">
                  Filtrar
                </button>
              </div>
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
              <th scope="col" className="printNone">
                Chave
              </th>
              <th scope="col" className="printNone">
                Salvar
              </th>
            </tr>
          </thead>
          <tbody>
            {aulas.map((aula) => (
              <tr key={aula.id} className={aula.chave ? "chave-verde" : ""}>
                <td>{formatarData(aula.data_hora_inicio)}</td>
                <td>{formatarHora(aula.data_hora_inicio)}</td>
                <td>{formatarHora(aula.data_hora_fim)}</td>
                <td>{aula.turma.toUpperCase()}</td>
                <td>
                  <input
                    name="instrutor"
                    type="text"
                    value={aula.instrutor}
                    style={{ textTransform: "uppercase" }}
                    onChange={(e) =>
                      setAulas(
                        aulas.map((a) =>
                          a.id === aula.id
                            ? { ...a, instrutor: e.target.value }
                            : a
                        )
                      )
                    }
                  />
                </td>
                <td className="apenasImprimir">
                  <AbreviaUC nomeUC={aula.unidade_curricular} />
                </td>
                <td className="printNone">
                  <input
                    name="unidade_curricular"
                    type="text"
                    style={{ textTransform: "uppercase" }}
                    value={aula.unidade_curricular}
                    onChange={(e) =>
                      setAulas(
                        aulas.map((a) =>
                          a.id === aula.id
                            ? { ...a, unidade_curricular: e.target.value }
                            : a
                        )
                      )
                    }
                  />
                </td>
                <td className="apenasImprimir">
                  <Ambiente nomeAmbiente={aula.ambiente} />
                </td>
                <td className="printNone">
                  <input
                    name="ambiente"
                    type="text"
                    value={aula.ambiente}
                    style={{ textTransform: "uppercase" }}
                    onChange={(e) =>
                      setAulas(
                        aulas.map((a) =>
                          a.id === aula.id
                            ? { ...a, ambiente: e.target.value }
                            : a
                        )
                      )
                    }
                  />
                </td>
                <td className="printNone">
                  <input
                    type="checkbox"
                    checked={aula.chave}
                    onChange={(e) => atualizarChave(aula.id, e.target.checked)}
                  />
                </td>
                <td className="printNone">
                  <button
                    className="btn btn-success"
                    onClick={() => salvarAula(aula)}
                  >
                    Salvar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Contingencia;
