# Produtos Validade API
Deploy: [Produtos Validade API](https://angular-produtos.herokuapp.com/)
![](overview.gif)
### Stack Utilizada
* [Node.JS](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [Sequelize](https://sequelize.org/)
* [MySQL](https://www.mysql.com/)
* [express-validator](https://express-validator.github.io/)
* [Jest](https://jestjs.io/)
* [Angular](https://angular.io/)
* [Material UI Angular](https://material.angular.io//)
### Como executar

Para executar é necessário ter o MySQL instalado.
Crie um arquivo *.env* no diretório raiz do projeto com o conteúdo:
```
DB_USER=Usuário do MySQL
DB_PASS=Senha do MySQL
DB_NAME=Nome do banco de dados
DB_HOST=Endereço de IP do banco de dados (localhost ou 127.0.0.1 caso esteja na máquina local)
```

Depois de configurado o arquivo *.env* instale as dependências do projeto e execute o script *dev* para iniciar o servidor Node back-end.
Execute o *ng serve* para iniciar o front-end Angular.

#### NPM
```sh
$ npm i
$ npm run dev
$ ng serve
```
