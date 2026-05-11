# Acapra - Sistema de Adoção de Animais

Este é o repositório oficial da aplicação web para a ONG **Acapra**. Trata-se de uma plataforma moderna construída para exibir animais disponíveis para adoção, permitindo filtros de busca e integração completa com um painel administrativo seguro.

O projeto é dividido em um **Back-end robusto em Python (FastAPI)** e um **Front-end interativo em React (Vite)**. Funcionalidades de adição e remoção de Pets podem ser manipuladas diretamente do Painel Administrativo.

---

## 🛠️ Tecnologias Utilizadas

**Front-end**:
- **React (Vite)** para construção de interface veloz e otimizada.
- **CSS Vanilla (Módulo Global)** utilizando variáveis com *glassmorphism* na paleta oficial da identidade da Acapra (Tons Terrosos e Laranja).
- **React Router Dom** para lidar com múltiplas páginas e autenticações do painel.
- **Lucide-react** para os ícones.

**Back-end**:
- **Python** com **FastAPI**.
- **SQLite** acoplado como motor de base de dados.
- **SQLAlchemy** (ORM) e **Pydantic** para validações de schemas lógicos bidirecionais das rotas.

---

## 🚀 Como Executar o Projeto Localmente

Para rodar este ecossistema por completo, você deve inicializar o servidor do Back-end e do Front-end em Terminais **separados**.

### 1️⃣ Inicializando o Servidor da API (Back-end)
Abra um terminal, aponte-o para base deste projeto e navegue até a pasta `backend`:

```bash
cd backend
```

Instale as dependências exigidas pelo Python:
```bash
py -m pip install -r requirements.txt
```

Suba o servidor do FastAPI. Ele criará o banco de dados `acapra.db` automaticamente se não existir:
```bash
py -m uvicorn main:app --reload
```
A API estará exposta ouvindo requisições na porta **8000** (`http://localhost:8000`).


### 2️⃣ Inicializando a Interface Web (Front-end)
Em um segundo terminal (*sem fechar o primeiro*), certifique-se de estar na **raiz principal do projeto** e instale as bibliotecas Node se for executar a primeira vez:

```bash
npm install
```

Inicie o servidor de desenvolvimento do Vite:
```bash
npm run dev
```
A sua aplicação cliente estará online! 

---

## 🔐 Áreas da Aplicação

- **Página de Adoções Pública:** 
  Abra no seu navegador `http://localhost:5173`. Todos os usuários comuns acessam essa área livremente.
  
- **Dashboard do Administrador (Acapra):** 
  Acesse `http://localhost:5173/login`. Efetue o login com as seguintes credenciais padrão (em uso para este ambiente local):
  - **Login:** `admin`
  - **Senha:** `admin123`
  *(Nota: pelo dashboard, você poderá deletar ou salvar novos animais que estarão salvos de forma estática via SQLite).*

---

