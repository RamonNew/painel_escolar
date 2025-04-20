import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function AdicionarAulas() {
  const [dataAula, setAula] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");
  const [turma, setTurma] = useState("");
  const [instrutor, setInstrutor] = useState("");
  const [unidadeCurricular, setUnidadeCurricular] = useState("");
  const [ambiente, setAmbiente] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate(); // Usado para redirecionar após o sucesso

  // Função para cadastrar a aula
  async function cadastrarAulas(e) {
    e.preventDefault();

    // Validar se os campos obrigatórios estão preenchidos
    if (!dataAula || !horaInicio || !horaFim || !turma || !instrutor || !unidadeCurricular || !ambiente) {
      setErro("Todos os campos são obrigatórios.");
      return;
    }

   

    const aulaData = {
      dataAula,
      horaInicio,
      horaFim,
      turma,
      instrutor,
      unidadeCurricular,
      ambiente,
    };

    try {
      // Fazendo POST para a API
      const resposta = await fetch(`${process.env.REACT_APP_API_URL}/classes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Definindo o corpo como JSON
        },
        body: JSON.stringify(aulaData)
      });

      // Verifica se a resposta da API foi bem-sucedida
      if (!resposta.ok) {
        const erroAPI = await resposta.json(); // Lê o erro retornado pela API
        setErro(erroAPI.error || "Erro ao cadastrar aula.");
      } else {
        alert('Aula Cadastrada com sucesso');
        console.debug("Aula inserida com sucesso");
        navigate('/contingencia'); // Redireciona para outra rota
      }
    } catch (error) {
      console.debug(error);
      setErro("Erro ao conectar com o servidor.");
    }
  }

  return (
    <div className="container justify-content-center col-md-5">
      <h1 className="text-center">Adicionar Aula</h1>
      <form onSubmit={cadastrarAulas}>
        <label htmlFor="dataAula">Data:</label>
        <input
          className="form-control"
          type="date"
          value={dataAula}
          onChange={(e) => setAula(e.target.value)}
        />
        <label htmlFor="horaInicio">Hora Início:</label>
        <input
          className="form-control"
          type="time"
          value={horaInicio}
          onChange={(e) => setHoraInicio(e.target.value)}
        />
        <label htmlFor="horaFim">Hora Fim:</label>
        <input
          className="form-control"
          type="time"
          value={horaFim}
          onChange={(e) => setHoraFim(e.target.value)}
        />
        <label htmlFor="turma">Turma:</label>
        <input
          className="form-control"
          type="text"
          value={turma}
          onChange={(e) => setTurma(e.target.value)}
        />
        <label htmlFor="instrutor">Instrutor:</label>
        <input
          className="form-control"
          type="text"
          value={instrutor}
          onChange={(e) => setInstrutor(e.target.value)}
        />
        <label htmlFor="unidadeCurricular">Unidade Curricular:</label>
        <input
          className="form-control"
          type="text"
          value={unidadeCurricular}
          onChange={(e) => setUnidadeCurricular(e.target.value)}
        />
        <label htmlFor="ambiente">Ambiente:</label>
        <input
          className="form-control"
          type="text"
          value={ambiente}
          onChange={(e) => setAmbiente(e.target.value)}
        />
        {erro && <div className="alert alert-danger mt-2">{erro}</div>}
        <Link className="btn btn-danger float-start mt-2" to="/contingencia">
          Cancelar
        </Link>
        <button className="btn btn-primary float-end mt-2" type="submit">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default AdicionarAulas;
