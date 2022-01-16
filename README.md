## USERS SERVICE

- [Descrição](#descrição)
- [Instalação](#instalação)
- [Utilização](#utilização)
- [Termos de uso](#termos-de-uso)
- [Referências](#referências)

<br>

# Descrição

<p><b>Users service</b> é um serviço simples de gerenciamento de usuários. Esta aplicação utiliza o ambiente de execução Node.js e o framework Express.js</p>
<br>

# Instalação

<p>0. Primeiramente, é necessário já ter instalado na própria máquina:

<p> Um <b>editor de código</b>, conhecido também como <b>IDE</b>. Por exemplo, o <b>Visual Studio Code (VSCode)</b>.</p>

<p> Uma <b>ferramenta cliente de API REST</b>. Por exemplo, o <b>Insomnia</b> ou o <b>Postman</b>.</p>

<p>1. Fazer o clone do reposítório <b>Aplicação de notas</b> na sua máquina pelo terminal do computador ou pelo do IDE:</p>

```
git@gitlab.com:ABKURA/users-serveice.git
```

<p>Entrar na pasta criada:</p>

```
cd users-serveice
```

<p>E rodar a aplicação:</p>

```
code .
```

<p>2. Feita a clonagem, instalar no terminal:</p>

<ul>
<li>O gerenciador de pacotes <b>yarn</b>:</li>

```
npm install --global yarn
```

<li>O ambiente de execução <b>Node.js</b>. Disponível em https://nodejs.org/en/.</li>

<li>O framework <b>Express.js</b>:</li>

```
yarn add express
```

<li>A biblioteca <b>Nodemon</b> junto com o compilador <b>Sucrase</b>:</li>

```
yarn add sucrase nodemon -D
```

<li>A biblioteca <b>UUID</b>:</li>

```
yarn add uuid
```

<li>A biblioteca <b>YUP</b>:</li>

```
yarn add yup
```

<li>A biblioteca <b>jsonwebtoken</b>:</li>

```
yarn add jsonwebtoken
```

<li>A biblioteca <b>bcrypt</b>:</li>

```
yarn add bcrypt
```

<li>E o pacote <b>dotenv</b>:</li>

```
yarn add dotenv
```

</ul>

<p>3. Feitas as instalações precisamos criar nosso arquivo de variáveis de ambiente, o <b>.env</b>:</p>

```
touch .env
```

Dentro dele precisamos definir nossas duas variáveis de ambiente:

```
JWT_SECRET_KEY=chave_aleatória_secreta
JWT_EXPIRES_IN=tempo_de_vida_do_JWT (exemplos: 1000, "2 dias", "10h", "7d")
```

<b>Obs:</b> as informações contidas no arquivo <b>.env</b> não devem ser compartilhadas. O arquivo já consta no <b>.gitignore</b> para não ser subido no repositório.

# Utilização

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

# Termos de uso

<p>Esta aplicação atende a fins exclusivamente didáticos e não possui qualquer intuito comercial.</p>

# Referências

<p>Esta aplicação atende a fins exclusivamente didáticos e não possui qualquer intuito comercial.</p>
