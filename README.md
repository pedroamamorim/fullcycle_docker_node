# fullcycle_docker_node

Repo com desafio 2 do módulo de docker

Nginx com aplicação nodeJS realizando operações CRUD em banco MySQL.

### Instruções de uso
Rode os containers (MySQL, NGINX e NodeJS) do compose.yml com o comando `docker-compose up -d` ou `docker compose up -d`

Em seguida acesse o Nginx pelo endereço `http://localhost:8080/`

O Nginx redirecionará o usuário para http://localhost:3000/

A rota padrão deve mostrar uma página com os nomes cadastrados no banco de dados

### Outras rotas que podem ser usadas na aplicação 

`DELETE http://localhost:3000/delete`
Corpo da requisição:
{
	"id": 2
}

`POST http://localhost:3000/insert`
Corpo da requisição:
{
	"name": "Pedro"
}

`PUT http://localhost:3000/update`
Corpo da requisição:
{
	"id": 1,
	"name": "John"
}