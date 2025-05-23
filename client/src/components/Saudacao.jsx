import { useEffect } from "react"
let saudacao = ''
function Saudacao() {
    useEffect(()=>{
        saudacaoHora();
    },[]);

    function saudacaoHora() {
        const hoje = new Date()
        const hora = hoje.getHours()
        //const saudacao = document.getElementById("saudacao")
        //let saudacao = ''
        saudacao = '';
        const dia = hoje.getDay()
        const diaSemana = ["Domingo",
            "Segunda-Feira",
            "Terça-Feira",
            "Quarta-Feira",
            "Quinta-Feira",
            "Sexta-Feira",
            "Sábado"]

        //saudacao.innerHTML = diaSemana[dia]
        saudacao += diaSemana[dia]
        if (hora >= 18) {
            saudacao += " - Boa Noite"
            //saudacao.innerHTML += " - Boa Noite"
        } else if (hora >= 12) {
            saudacao += " - Boa Tarde"
            //saudacao.innerHTML += " - Boa Tarde"
        } else if (hora >= 6) {
            saudacao += " - Bom Dia"
            //saudacao.innerHTML += " - Bom Dia"
        } else {
            saudacao += " - Boa Madrugada"
            //saudacao.innerHTML += " - Boa Madrugada"
        }
        setTimeout(() => saudacaoHora(), 1000);
    }
    return (
        <div id="saudacao" className="saudacao">{saudacao}</div>
    )
}

export default Saudacao;