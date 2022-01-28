Seguem os feedbacks:

2. Você poderia ter utilizado o yup para fazer o hash da senha com o transform.

3. No seu middleware de validação do schema, você não passa os valores da validação para o request, isso facilitaria o acesso aos dados transformados como o uuid e o createdOn que você utiliza a função default.
