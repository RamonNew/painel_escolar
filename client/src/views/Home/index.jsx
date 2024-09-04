import { useEffect, useState, useRef } from 'react';
import Relogio from '../../components/Relogio';
import Saudacao from '../../components/Saudacao';
import Ambiente from '../../components/Ambiente';
import AbreviaUC from '../../components/AbreviaUC';


function Home() {
  let [aulas, setAulas] = useState([]);
  let [imagens, setImagens] = useState([]);
  const iframeRef = useRef(null);

  useEffect(() => {
    document.title = "Agenda de Salas SENAI Vitória";
    //const funcoes = new FuncoesExibir();
    listarAulas();
    listarAnuncios();

    const intervalId = setInterval(() => {
      listarAulas();
      listarAnuncios(); // Verifica também as imagens
      //funcoes.saudacaoHora(); // Chama a função no mesmo intervalo que busca aulas
    }, 20000); // Atualiza a cada 30 segundos

    return () => clearInterval(intervalId); // Limpa o intervalo quando o componente é desmontado

  }, []);

  async function listarAnuncios() {
    try {
      // Faz a chamada para a API através do proxy
      const resposta = await fetch('/imagens');
      if (!resposta.ok) {
        throw new Error(`HTTP error! status: ${resposta.status}`);
      }
      const dados = await resposta.json();

      console.debug(dados);

      // Verifica se as novas imagens são diferentes das atuais
      const imagensDiferentes = JSON.stringify(dados) !== JSON.stringify(imagens);
      if (imagensDiferentes) {
        setImagens(dados);
      }
    } catch (erro) {
      throw new Error('Erro na consulta!' + erro);
    }
  }

  async function listarAulas() {
    try {
      // Faz a chamada para a API através do proxy
      const resposta = await fetch('/aulas');
      if (!resposta.ok) {
        throw new Error(`HTTP error! status: ${resposta.status}`);
      }
      const dados = await resposta.json();

      console.debug(dados);
      setAulas(dados);
    } catch (erro) {
      throw new Error('Erro na consulta!' + erro);
    }
  }

  function formatarHora(dataHoraISO) {
    const data = new Date(dataHoraISO);
    return data.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  function splitName(name) {
    name = name.toUpperCase();
    const pieces = name.split(' ');
    if (pieces.length === 1) {
      return pieces[0]; // Retorna o nome se for apenas uma palavra
    }
    return pieces[0] + ' ' + pieces[pieces.length - 1];
  }

  const serverUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;

  return (
    <>
      <div id="cabecalho" className="cabecalho">
        <Saudacao/>
        <Relogio/>
      </div>
      <div className="conteudo">
        <div className="aulas">
          <table id="tabelaAulas">
            <thead>
              <tr>
                <th>Inicio</th>
                <th>Fim</th>
                <th>Turma</th>
                <th>Instrutor</th>
                <th>Unidade Curricular</th>
                <th>Ambiente</th>
              </tr>
            </thead>
            <tbody>
              {aulas.map(aula => (
                <tr key={aula.id}>
                  <td>{formatarHora(aula.data_hora_inicio)}</td>
                  <td>{formatarHora(aula.data_hora_fim)}</td>
                  <td>{aula.turma.toUpperCase()}</td>
                  <td>{splitName(aula.instrutor)}</td>
                  {/* <td>{uniName(aula.unidade_curricular)}</td> */}
                  <td><AbreviaUC nomeUC={aula.unidade_curricular} /></td>
                  <td><Ambiente nomeAmbiente={aula.ambiente} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div id="lateral" className="lateral">
          {imagens.map((i, index) => (
            <>
              <div key={i.id}>
                <img src={`${serverUrl}/public/${i.caminho}`} alt={i.alt} className="imganun" />
              </div>
              {index === 0 && (
                <iframe
                  id='youtube-iframe'
                  className="imganun"
                  src="https://www.youtube.com/embed/videoseries?loop=1&autoplay=1&mute=0&list=PLQjyOwYs8LxLFm0XJuw-_IGOxrFCjD2NE"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ width: "100%", maxHeight: "100%" }}
                ></iframe>
              )}
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
