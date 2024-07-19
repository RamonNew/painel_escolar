
class FuncoesExibir {
    constructor() {
        this.saudacaoHora()
        this.atualizaHorario()
    }

    //Criando Relogio
    atualizaHorario() {
        const relogio = document.getElementById('relogio')
        const hoje = new Date()
        let h = hoje.getHours()
        let m = hoje.getMinutes()
        let s = hoje.getSeconds()
        h = this.verificaTempo(h)
        m = this.verificaTempo(m)
        s = this.verificaTempo(s)
        relogio.innerHTML = h + ":" + m + ":" + s

        setTimeout(() => this.atualizaHorario(), 1000)
    }

    //Adicionando o 0 em numeros menores que 10
    verificaTempo(t) {
        if (t < 10) {
            t = "0" + t
        }
        return t
    }

    //Adicionando  Saudação hora
    saudacaoHora() {
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

    }
}
export default FuncoesExibir