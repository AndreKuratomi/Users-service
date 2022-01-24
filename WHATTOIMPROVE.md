Seguem os feedbacks:

2. Você poderia ter utilizado o yup para fazer o hash da senha com o transform.

3. No seu middleware de validação do schema, você não passa os valores da validação para o request, isso facilitaria o acesso aos dados transformados como o uuid e o createdOn que você utiliza a função default.

4. Você não faz a verificação no seu middleware de autenticação para caso o usuário não forneça o token, isso poderá estourar um erro.

5. Seu middleware de autorização não está bloqueando o acesso para que um usuário não altere a senha de outros usuários.

6. Ocorre um erro quando tentamos alterar a senha do usuário (Error: Illegal arguments: undefined, number)
