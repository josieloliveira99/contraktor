## Contraktor

Aplicativo realizado como parte de processo seletivo feito em React (frontend) e Laravel (api).

O que ele não realiza:

- Autenticação de usuários.
- Validação dos campos de formulários.
- Validação dos campos de busca.
- Validação do tipo de arquivo a ser submetido via upload.
- Busca complexa no banco de dados.

O que ele realiza:

- Cadastro de partes e contratos.
- Upload de arquivo de pdf/docx como parte do cadastro de contrato.
- Visualização do arquivo submetido via upload.
- Recuperação e visualização das partes cadastradas.
- Recuperação e visualização dos contratos cadastrados.
- Recuperação do relacionamento entre as partes e os contratos.

## Etapas para a instalação

Através do terminal clone o repositório com o comando:
```
git clone git@github.com:josieloliveira99/contraktor.git
```
Entre no diretório onde o projeto foi clonado e através do terminal execute os seguinte comandos:
```
composer install
```
```
npm run dev
```
```
npm install
```
Crie um banco de dados para hospedar os dados da aplicação

Copie o arquivo .env.example, mude seu nome para .env, e altere os seguintes dados:

```
DB_DATABASE= "nome do banco de dados criado"

DB_USERNAME= "usuário do banco de dados"

DB_PASSWORD= "senha do banco de dados"
```

No terminal execute os seguintes comandos:

``` 
php artisan generate:key
```
``` 
make migrations
```

Ao executar os próximos comandos, será habilitado um servidor no endereço http://127.0.0.1:8000 onde será possível acessar o aplicativo por esta url

``` 
php artisan serve
```

Caso queira modificar o conteúdo dos arquivos do React rodar o seguinte comando 

``` 
npm run watch
```

## Orientações

Ao iniciar o aplicativo o banco de dados estará em branco.

Após ter algum item cadastrado será possível pesquisá-lo. Como o campo de busca está sem validação, caso clique no botão de buscar sem que algo tenha sido digitado, serão retornados todos os registros. Para se realizar a busca é necessário digitar exatamente com a mesma grafia em que o item foi cadastrado ou pelo menos com algumas palavras sequenciais tal qual foi cadastrado. Exemplo de item cadastrado:

```
Adesão ao plano de saúde
```

Para recuperá-lo deve-se digitar:

```
Adesão ao plano de saúde
```
ou
```
Adesão ao plano
```
ou
```
plano de saúde
```
Não se deve digitar por exemplo:

```
adesão plano
```
Para o cadastro de items todos os dados devem ser preenchidos, inclusive o campo de data no cadastro de contratos. Deve-se clicar no campo e escolher uma data, mesmo que o campo já venha preenchido por default.

As páginas de listagem de itens, caso sejam atualizadas no navegador ou caso tenham seu endereço digitado diretamente na barra de url não funcionarão e deverão apresentar uma página em branco. Para retornar ao aplicativo é necessário voltar para a página inicial do servidor, ou seja, a url base.

Foi utilizada a sintaxe mais antiga do React para a codificação dos componentes pois para utilizar a nova sintaxe eram necessárias configurações extras que ainda não tenho total domínio e que, portanto, demandariam um tempo maior para o desenvolvimento da aplicação.




