import {useState, useEffect} from 'react'

function TelaLogin() {
    const[usuario,setUsuario] = useState('')
    const[senha,setSenha] = useState('')

    useEffect(()=>{
        document.title = "Tela Login"    
    })

    async function efetuarLogin(){
        try {
            const resposta = await fetch(`${process.env.REACT_APP_API_URL}/users/logar`,{
                method: "POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({usuario,senha})
            })
            if(!resposta.ok){
                alert("Usuário ou senha inválidos")
                throw new Error("Erro na requisição:" + resposta.status)
            }

            const dados = await resposta.json()
            localStorage.setItem('token',dados.token)
            window.location.href = "/contingencia"
        } catch (error) {
            console.error("Error ao fazer login",error)
        }
    }

    return (
        <div className='container d-flex justify-content-center'>
            <div className='col-3 mt-5'>
                <h1 className='text-center'>Logar</h1>
                <label>Login</label>
                <input 
                    class="form-control" 
                    type="text"
                    placeholder='Usuário'
                    value={usuario}
                    onChange={(e)=>setUsuario(e.target.value)}
                />
                <label htmlFor="">Senha</label>
                <input 
                    class="form-control" 
                    type="password" 
                    value={senha}
                    onChange={(e)=>setSenha(e.target.value)}
                />
                <div className='d-flex justify-content-end'>
                    <button class="btn btn-primary mt-3" onClick={efetuarLogin}>Logar</button>
                </div>
            </div>
        </div>
    )
}

export default TelaLogin