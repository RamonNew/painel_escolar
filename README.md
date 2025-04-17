# 📊 Painel Escolar

Sistema web desenvolvido para exibir informações de aulas em tempo real em ambientes educacionais, como instituições de ensino técnico e superior. Ideal para exibição em televisores ou painéis interativos nos corredores e salas de aula.

---

## 🧩 Funcionalidades

### 🎓 Visão do Aluno
- Visualização das aulas programadas do dia
- Destaque para horários, ambientes e professores
- Anúncios informativos exibidos lateralmente

### 🛠️ Visão do Administrador
- Cadastro, edição e exclusão de aulas
- Filtro por período (manhã, tarde, noite) e dias da semana
- Marcação de entrega de chaves para o professor
- Gerenciamento de anúncios

---

## 💡 Tecnologias Utilizadas

### Frontend
- [React](https://reactjs.org/)
- [Bootstrap](https://getbootstrap.com/)
- [Axios](https://axios-http.com/) para consumo da API

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)

### Banco de Dados
- [MariaDB](https://mariadb.org/) como sistema de gerenciamento de banco de dados relacional

---

## 🗂️ Estrutura do Projeto

\`\`\`
painel_escolar/
├── client/          # Aplicação frontend React
├── server/          # API backend Express
├── aulas.sql        # Script de criação da base de dados (compatível com MariaDB)
├── README.md        # Documentação do projeto
\`\`\`

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js instalado
- Git instalado
- Servidor MariaDB ativo

### Passos

\`\`\`bash
# Clone o repositório
git clone https://github.com/RamonNew/painel_escolar
cd painel_escolar

# Instale as dependências do backend
cd server
npm install

# Inicie o backend
npm start
\`\`\`

\`\`\`bash
# Em outra aba, vá para o diretório do frontend
cd ../client
npm install

# Inicie o frontend
npm start
\`\`\`

Acesse o painel em `http://localhost:3000`.

---

## 🛠️ Banco de Dados

- O arquivo `aulas.sql` contém o script de criação e inserção de dados da base em MariaDB.
- Certifique-se de criar o banco de dados e executar o script antes de iniciar o backend.

---

## 📌 Próximas Melhorias

- Autenticação de usuários (admin)
- Dashboard com estatísticas
- Responsividade aprimorada para diferentes resoluções
- Integração com API de horários dinâmicos

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

## 🙋‍♂️ Autor

Desenvolvido por **Ramon de Holanda**  
[GitHub](https://github.com/RamonNew) · [LinkedIn](https://www.linkedin.com/in/ramon-de-holanda/)
