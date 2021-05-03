# movies-api

Esta aplicação é um CRUD completo para filmes. Os recursos gerenciados pela aplicação são os filmes propriamente ditos (movies) e suas avaliações (ratings).

O projeto foi desenvolvido com a seguinte stack:
- Node.js (v14.16.1)
- Express
- Joi
- Knex
- Jest
- Postgres

## Executando a aplicação
1. Crie um arquivo .test.env seguindo o modelo apresentado no arquivo .env.example. Neste arquivo devem constar os dados para conexão com o banco de dados.
2. Execute o comando abaixo para instalar as dependências:
```
npm install
```
3. Execute o comando abaixo para rodar as migrations e criar as tabelas necessárias:
```
npx knex --esm migrate:latest
```
4. Execute o comando abaixo para popular o banco de dados com dados fake:
```
npx knex --esm seed:run
```
5. Para iniciar o servidor local, digite o comando abaixo. A aplicação estará ouvindo na porta 3001.
```
npm start
```
6. Se desejar executar os testes, utilize o comando abaixo:
```
npm run test
```

## Endpoints
### Movies

### GET /movies - Lista filmes

Exemplo de resposta:
```json
[
  {
    "movie_id": 1,
    "year": "2002",
    "runtime": "121 min",
    "plot": "When bitten by a genetically modified spider, a nerdy, shy, and awkward high school student gains spider-like abilities that he eventually must use to fight evil as a superhero after tragedy befalls his family.",
    "title": "Spider-Man"
  },
  {
    "movie_id": 2,
    "year": "2008",
    "runtime": "126 min",
    "plot": "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
    "title": "Iron Man"
  },
  {
    "movie_id": 3,
    "year": "2012",
    "runtime": "143 min",
    "plot": "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
    "title": "The Avengers"
  }
]
```

Quando invocado sem parâmetros, retorna todos os filmes disponíveis. Aceita os seguintes parâmetros:
- `?rating=true`: lista somente os filmes avaliados.
- `?rating=false</pre>` lista somente os filmes *NÃO* avaliados.
- `?id=2&id=3`: lista somente os filmes com ids 2 e 3. Pode ser usada qualquer quantidade de ids.
- `?rating=true&id=2&id=3`: Dentre os filmes 2 e 3, lista os que foram avaliados. Pode ser usada qualquer quantidade de ids.
- `rating=false&id=2&id=3`: Dentre os filmes 2 e 3, lista os que *NÃO* foram avaliados. Pode ser usada qualquer quantidade de ids.

Códigos de retorno possíveis:
- 200: operação bem-sucedida.

### GET /movies/:id - Consulta filme com id informado

Exemplo de resposta:
```json
{
  "movie_id": 1,
  "year": "2002",
  "runtime": "121 min",
  "plot": "When bitten by a genetically modified spider, a nerdy, shy, and awkward high school student gains spider-like abilities that he eventually must use to fight evil as a superhero after tragedy befalls his family.",
  "title": "Spider-Man",
  "actors": [
    "Tobey Maguire",
    "Willem Dafoe",
    "Kirsten Dunst",
    "James Franco"
  ],
  "genre": [
    "Action",
    "Adventure",
    "Sci-Fi"
  ],
  "ratings_ids": [
    2
  ]
}
```

Códigos de retorno possíveis:
- 200: operação bem-sucedida.
- 404: filme solicitado não existe.

### POST /movies - Insere filme

O filme a ser inserido deve ser enviado no corpo da requisição.
Exemplo de corpo de requisição:
```json
{
      "title": "Avengers: Age of Ultron 5",
      "year": "2015",
      "runtime": "141 min",
      "genre": ["Action", "Adventure", "Sci-Fi", "comédia"],
      "actors": ["Robert Downey Jr.", "Chris Hemsworth", "Mark Ruffalo", "Chris Evans", "Ator 1"],
      "plot": "When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it's up to Earth's mightiest heroes to stop the villainous Ultron from enacting his terrible plan."
}
```

Exemplo de resposta:
```json
{
  "movie_id": 4,
  "year": "2015",
  "runtime": "141 min",
  "plot": "When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it's up to Earth's mightiest heroes to stop the villainous Ultron from enacting his terrible plan.",
  "title": "Avengers: Age of Ultron 5",
  "actors": [
    "Robert Downey Jr.",
    "Chris Hemsworth",
    "Mark Ruffalo",
    "Chris Evans",
  ],
  "genre": [
    "Action",
    "Adventure",
    "Sci-Fi",
  ],
  "ratings_ids": []
}
```
Códigos de retorno possíveis:
- 201: operação bem-sucedida.
- 400: erro de validação. Response contém campo `error` com mensagem explicativa.
- 409: Filme já cadastrado. Response contém campo `error` com mensagem explicativa.

### PUT /movies/:id - Atualiza filme com id informado

Os dados enviados sobrescrevem os dados presentes no BD. Dados não enviados não são alterados.

Exemplo de requisição:
```json
{
	"genre": ["comédia"]
}
```
Códigos de retorno possíveis:
- 204: operação bem-sucedida.
- 400: erro de validação. Response contém campo `error` com mensagem explicativa.


### DELETE /movies/:id - Deleta filme com id informado

Nada é enviado no corpo da requisição.

Códigos de retorno possíveis:
- 200: operação bem-sucedida.
- 404: filme não existe.

## Ratings
### GET /ratings - Lista avaliações

Exemplo de resposta:
```json
[
  {
    "rating_id": 1,
    "content": "The best movie of my entire life!",
    "score": 5,
    "movie_id": 3
  },
  {
    "rating_id": 2,
    "content": "The worst movie of my entire life!",
    "score": 1,
    "movie_id": 1
  }
]
```

Quando invocado sem parâmetros, retorna todas as avaliações disponíveis. Aceita os seguintes parâmetros:
- `?movie_id=1`: lista somente as avaliações do filme com id 1.

Códigos de retorno possíveis:
- 200: operação bem-sucedida.

### POST /ratings - Avalia filme

A avaliação deve ser enviada no corpo da requisição.

Exemplo de requisição:
```json
{
	"content": "This movie is just ok.",
	"score": 3,
	"movie_id": 3
}
```

Exemplo de resposta:
```json
{
  "rating_id": 3,
  "content": "This movie is just ok.",
  "score": 3,
  "movie_id": 3
}
```

Códigos de retorno possíveis:
- 201: operação bem-sucedida.
- 400: erro de validação. Response contém campo `error` com mensagem explicativa.
- 404: filme referenciado não existe.