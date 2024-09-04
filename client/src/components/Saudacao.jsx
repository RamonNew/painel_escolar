import { useEffect } from "react"

function Saudacao() {
    useEffect(()=>{
        saudacaoHora();
    },[]);

    function saudacaoHora() {
        const hoje = new Date()
        const hora = hoje.getHours()
        const saudacao = document.getElementById("saudacao")
        const dia = hoje.getDay()
        const diaSemana = ["Domingo",
            "Segunda-Feira",
            "Terça-Feira",
            "Quarta-Feira",
            "Quinta-Feira",
            "Sexta-Feira",
            "Sábado"]

        saudacao.innerHTML = diaSemana[dia]
        if (hora >= 18) {
            saudacao.innerHTML += " - Boa Noite"
        } else if (hora >= 12) {
            saudacao.innerHTML += " - Boa Tarde"
        } else if (hora >= 6) {
            saudacao.innerHTML += " - Bom Dia"
        } else {
            saudacao.innerHTML += " - Boa Madrugada"
        }
        setTimeout(() => saudacaoHora(), 1000);
    }
    return (
        <div id="saudacao" className="saudacao">Sexta-Feira - Boa noite!!!</div>
    )
}

export default Saudacao;