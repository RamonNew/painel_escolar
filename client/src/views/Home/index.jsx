import { useEffect, useState } from 'react';
import './Home.css'
import FuncoesExibir from './funcoesExibir';

function Home() {
  let [aulas, setAulas] = useState([]);
  let [imagens, setImagens] = useState([]);


  useEffect(() => {
    document.title = "Agenda de Salas SENAI Vitória";
    new FuncoesExibir();
    // Chama a função para carregar os usuários
    setAulas([
      {
        id: 1,
        inicio: "13:30",
        fim: "17:30",
        turma: "HTC DDS-3-16",
        instrutor: "Jeffrey Jonnes",
        uc: "Desenvolvimento Sistemas",
        ambiente: "LAB-5106"
      },
      {
        id: 2,
        inicio: "13:30",
        fim: "17:30",
        turma: "HTC DDS-3-16",
        instrutor: "Julio Honorato",
        uc: "Desenvolvimento Sistemas",
        ambiente: "LAB-5106"
      },
      {
        id: 3,
        inicio: "13:30",
        fim: "17:30",
        turma: "HTC DDS-3-16",
        instrutor: "Jamille Galazi",
        uc: "Desenvolvimento Sistemas",
        ambiente: "LAB-5106"
      },
      {
        id: 4,
        inicio: "13:30",
        fim: "17:30",
        turma: "HTC DDS-3-16",
        instrutor: "Jamille Galazi",
        uc: "Desenvolvimento Sistemas",
        ambiente: "LAB-5106"
      }
    ]);

    setImagens([
      {
        id: 1,
        endereco: "https://portal.fiero.org.br/storage/noticia/WKl2Bk5qmOIbzF3zCDrRRIbyjwMLfXCpJhe7FqPG.png",
        alt: "tabela massa corporal"
      },
      {
        id: 2,
        endereco: "https://cronos-media.sesisenaisp.org.br//api/media/1-0/files?img=img_1_230210_a391e771-b907-4a76-969f-3f4b68dea849_o.jpg",
        alt: "300 vagas curso"
      },
      {
        id: 3,
        endereco: "https://haddadpresidente.com.br/wp-content/uploads/2023/06/cursos-senai.jpg",
        alt: "cursos gratuitos"
      }]
    );
    console.debug(aulas)
  }, []);


  return (
    <div className=''>
      <div className="cabecalho">
        <div id="saudacao" className="saudacao">Sexta-Feira - Boa noite!!!</div>
        <div id="relogio" className="relogio">20:02:07</div>
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
                  <td>{aula.inicio.toUpperCase()}</td>
                  <td>{aula.fim}</td>
                  <td>{aula.turma.toUpperCase()}</td>
                  <td>{aula.instrutor.toUpperCase()}</td>
                  <td>{aula.uc.toUpperCase()}</td>
                  <td>{aula.ambiente.toUpperCase()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div><div id="lateral" className="lateral">
          {imagens.map(i => (
            <div key={i.id}>
              <img src={i.endereco} alt={i.alt} className = "imganun" />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Home;