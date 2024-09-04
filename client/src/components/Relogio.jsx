import { useEffect, useState } from 'react';

function Relogio() {
    const [relogio,setRelogio] = useState('')
    useEffect(() => {
        atualizaHorario();
    }, [])
    function atualizaHorario() {
        //Atribuindo a uma variavel o elemento com id relogio
        //const relogio = document.getElementById('relogio');

        //Obtendo data-hora de agora
        const agora = new Date();
        //console.log(agora);

        //Obetendo hora, minutos e segundos da hora atual
        const horasMinutosSegundos = agora.toLocaleTimeString('pt-br', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        //Adicionando a página o relógio
        //relogio.innerHTML = horasMinutosSegundos;
        setRelogio(horasMinutosSegundos);

        //Aplicando recursividade para o relógio atualizando a cada 1000 milisegundos(1 segundo)
        setTimeout(atualizaHorario, 1000);
    }

    //Adicionando o 0 em numeros menores que 10
    // function verificaTempo(t) {
    //     if (t < 10) {
    //         t = "0" + t
    //     }
    //     return t
    // }
    return (
        <div id='relogio' className="relogio">{relogio}</div>
    )
}

export default Relogio;