## USERS SERVICE

- [Descrição](#descrição)
- [Instalação](#instalação)
- [Utilização](#utilização)
- [Termos de uso](#termos-de-uso)
- [Referências](#referências)

<br>

# RGB(0,255,0) Descrição

<p><b>Users service</b> é um serviço simples de gerenciamento de usuários. Esta aplicação utiliza o ambiente de execução Node.js e o framework Express.js</p>
<br>

# ![RGB(0,255,0)] Instalação

<h5>0. Primeiramente, é necessário já ter instalado na própria máquina:</h5>

- <p> Um <b>editor de código</b>, conhecido também como <b>IDE</b>. Por exemplo, o <b>[Visual Studio Code (VSCode)](https://code.visualstudio.com/)</b>.</p>

- <p> Uma <b>ferramenta cliente de API REST</b>. Por exemplo, o <b>[Insomnia](https://insomnia.rest/download)</b> ou o <b>[Postman](https://www.postman.com/product/rest-client/)</b>.</p>

- <p> E versionar o diretório para receber o clone da aplicação:</p>

```
git init
```

<br>
<h5>1. Fazer o clone do reposítório <u style="text-decoration: underline">Users service</u> na sua máquina pelo terminal do computador ou pelo do IDE:</h5>

```
git clone git@gitlab.com:ABKURA/users-serveice.git
```

<p>Entrar na pasta criada:</p>

```
cd users-serveice
```

<p>Instalar as dependências:</p>

```
yarn
```

<p><b>Obs:</b> caso não tenha o gerenciador de pacotes <b>yarn</b> instalar desta maneira:</p>

```
npm install --global yarn
```

<p>E rodar a aplicação:</p>

```
code .
```

<br>

<h5>2. Feitas as instalações precisamos criar nosso arquivo de variáveis de ambiente, o <u style="text-decoration: underline">.env</u>:</h5>

```
touch .env
```

Dentro dele precisamos definir nossas duas variáveis de ambiente:

```
JWT_SECRET_KEY=chave_aleatória_secreta
JWT_EXPIRES_IN=tempo_de_vida_do_JWT (exemplos: 1000, "2 dias", "10h", "7d")
```

<b>Obs:</b> as informações contidas no arquivo <b>.env</b> não devem ser compartilhadas. O arquivo já consta no <b>.gitignore</b> para não ser subido no repositório.

`RGB(0,255,0)` `RGB(0,255,0)`Utilização

<p>Antes de passarmos para o API Client precisamos rodar o CLI</p>

```
yarn user-services
```

<p>A aplicação rodará com o <b>localhost:3000</b>. Adicionar depois deste as rotas e suas terminações, ou <b>endpoints</b>, que veremos a seguir.</p>

<p>Após o CLI rodar de modo bem sucedido com o API Client aberto vamos utilizar as seguintes rotas:</p>

<h3>Rotas</h3>

<h4>Cadastro</h4>

Cadastro de usuários (Método POST): <b>/signup</b> (ou localhost:3000/signup)

Exemplo a ser colocado no body da requisição:

```
{
    "age": 18,
    "username": "daniel",
    "email": "daniel@kenzie.com",
    "password": "abcd"
}
```

E a resposta esperada:

```
Status: 201 CREATED
```

```
{
    "uuid": "4b72c6f3-6d0a-(X)6a1-86c6-687d52de4fc7",
    "createdOn": "2021-11-18T01:23:52.910Z",
    "email": "daniel@kenzie.com",
    "age": 18,
    "username": "daniel"
}
```

Caso falte algum item no body da requisição:

```
{
    "username": "daniel",
    "email": "daniel@kenzie.com",
    "password": "abcd"
}
```

A resposta esperada deverá ser:

```
Status: 422 UNPROCESSABLE ENTITY
```

```
{
    "message": "age is a required field"
}
```

<h4>Login</h4>

Login do usuário recém cadastrado (Método POST): <b>/login</b> (ou localhost:3000/login)

Exemplo a ser colocado no body da requisição:

```
{
    "username": "lucas",
    "password": "abcd"
}
```

E a resposta esperada:

```
Status: 200 OK
```

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI.eyJ1c2VybmFtZSI6Imx1Y2FzIi
              jc4ZGE2N2VhLTMwM2EtNDYxOC1imOWFkZDY1MiIsImlhdCI6MTYzNz
              XhwIjoxNjM3MjAyMjQyfQ._XIs736ET7wEMJ5Ldvcsjqsg4Nvs40mM"
}
```

<h4>Listagem</h4>

Listagem dos usuários cadastrados (Método GET): <b>/users</b> (ou localhost:3000/users)

Exemplo a ser colocado no body da requisição:

```
(Requisição feita sem body)
```

E a resposta esperada:

```
Status: 200 OK
```

```
[
    {
        "password": "$2b$10$7GIfNyBYboR/FM4dB.
                     Qu.MREt3HkCL2jvAkkAOm.6dyO",
        "uuid": "4b72c6f3-6d0a-(X)6a1-86c6-687d52de4fc7",
        "createdOn": "2021-11-23T22:16:36.104Z",
        "email": "lucas@kenzie.com",
        "age": 21,
        "username": "lucas"
    }
]
```

<h4>Atualização de senha:</h4>

Atualização da senha do usuário cadastrado (Método PUT): <b>/users/uuid**/password</b> (ou localhost:3000/users/uuid**/password)

\*\*preencher com o uuid do usuário anteriormente cadastrado.

Exemplo a ser colocado no body da requisição:

```
{
    "password": "0000000"
}
```

E a resposta esperada:

```
Status: 204 NO CONTENT
```

# `RGB(0,255,0)` Termos de uso

<p>Esta aplicação atende a fins exclusivamente didáticos e não possui qualquer intuito comercial.</p>

# `RGB(0,255,0)` Referências

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/en/4x/api.html)
- [Nodemon](https://nodemon.io/)
- [Sucrase](https://dev.to/evandersonvasconcelos/how-to-use-the-syntax-import-export-on-nodejs-o5b)
- [Yup](https://github.com/jquense/yup)
- [JWT](https://github.com/auth0/node-jsonwebtoken)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [Dotenv](https://www.npmjs.com/package/dotenv)
