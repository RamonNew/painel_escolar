atualizaHorario()
saudacaoHora()
carregarAulas()
carregarImagens()

//Criando Relogio
function atualizaHorario() {
    const relogio = document.getElementById('relogio')
    const hoje = new Date()
    let h = hoje.getHours()
    let m = hoje.getMinutes()
    let s = hoje.getSeconds()
    h = verificaTempo(h)
    m = verificaTempo(m)
    s = verificaTempo(s)
    relogio.innerHTML = h + ":" + m + ":" + s

    setTimeout(atualizaHorario, 1000)
}

//Adicionando o 0 em numeros menores que 10
function verificaTempo(t) {
    if (t < 10) {
        t = "0" + t
    }
    return t
}

//Adicionando  Saudação hora
function saudacaoHora(){
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

    saudacao.innerHTML  = diaSemana[dia]
    if(hora >= 18){
        saudacao.innerHTML += " - Boa Noite"
    }else if(hora>= 12){
        saudacao.innerHTML += " - Boa Tarde"
    }else if(hora>= 6){
        saudacao.innerHTML += " - Bom Dia"
    }else{
        saudacao.innerHTML += " - Boa Madrugada"
    }


}
function carregarAulas(){
    const aulas = [
        {id:1,
            inicio:"13:30",
            fim:"17:30",
            turma:"HTC DDS-3-16",
            instrutor:"Jeffrey Jonnes",
            uc:"Desenvolvimento Sistemas",
            ambiente:"LAB-5106"
        },
        {id:2,
            inicio:"13:30",
            fim:"17:30",
            turma:"HTC DDS-3-16",
            instrutor:"Julio Honorato",
            uc:"Desenvolvimento Sistemas",
            ambiente:"LAB-5106"
        },
        {id:3,
            inicio:"13:30",
            fim:"17:30",
            turma:"HTC DDS-3-16",
            instrutor:"Jamille Galazi",
            uc:"Desenvolvimento Sistemas",
            ambiente:"LAB-5106"
        }
    ]

    const tabelaAulas = document.getElementById('tabelaAulas')
    let elementosTabela = ""
    for(let i = 0; i < aulas.length;i++){
        elementosTabela += '<tr>'
        elementosTabela += '<td>' + aulas[i].inicio.toUpperCase()  + '</td>'
        elementosTabela += '<td>' + aulas[i].fim.toUpperCase()  + '</td>'
        elementosTabela += '<td>' + aulas[i].turma.toUpperCase()  + '</td>'
        elementosTabela += '<td>' + aulas[i].instrutor.toUpperCase()  + '</td>'
        elementosTabela += '<td>' + aulas[i].uc.toUpperCase()  + '</td>'
        elementosTabela += '<td>' + aulas[i].ambiente.toUpperCase() + '</td>'
        elementosTabela += '</tr>'
    }
    tabelaAulas.innerHTML += elementosTabela
}

function carregarImagens(){
    const lateral = document.getElementById('lateral')   
    
    const imagens =[
        {
            id:1,
            endereco:"https://www.likewanderlust.com/wp-content/uploads/2020/11/IMG_2456.jpg",
            alt:"tabela massa corporal"
        },
        {
            id:2,
            endereco:"img/02.jpg",
            alt:"300 vagas curso"
        },
        {
            id:3,
            endereco:"img/03.png",
            alt:"cursos gratuitos"
        }
    ]

    for(let i = 0; i < imagens.length; i++){
        let div = document.createElement('div')
        div.className = "imganun"

        let img = document.createElement('img')
        img.src = imagens[i].endereco
        img.alt = imagens[i].alt
        
        div.appendChild(img)
        lateral.appendChild(div)
    }
}