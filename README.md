# Easy Pallet Front

Este projeto possibilita gerenciar informações relacionadas a cargas, listas, produtos e usuários.

Link de acesso: https://easy-pallet-front.vercel.app/

## Sumário
  * [Funcionalidades](#funcionalidades)
  * [Passo a passo para rodar o projeto localmente](#passo-a-passo-para-rodar-o-projeto-localmente)

## Funcionalidades

### Autenticação (login)
- [x] Tela de login
- [x] Botão de logout

### Cargas (loads)
- [x] Tabela e paginação com as informações
- [x] Botão de criação de uma nova carga
- [x] Botão que permita a edição dos atributos da carga
- [x] Botão de exclusão da carga
- [x] Botão/clique que liste as listas dessa carga (redireciona para a tela de listas)

### Listas (orders)
- [x] Tabela e paginação com as informações
- [x] Botão de criação de uma nova lista
- [x] Botão que permita a edição dos atributos da lista
- [x] Botão de exclusão da lista
- [x] Botão/clique que liste os produtos desta lista (order_products)

### Produtos das Listas (order_products)
- [x] Tabela com as informações (sem paginação)
- [x] Botão de criação de um novo produto da lista
- [x] Botão que permita a edição dos atributos de um produto da lista
- [x] Botão de exclusão de um produto da lista

### Produtos (products)
- [x] Tabela e paginação com as informações
- [x] Botão de criação de um novo produto
- [x] Botão que permita a edição dos atributos do produto
- [x] Botão de exclusão do produto

### Usuários (users)
- [x] Tabela e paginação com as informações
- [x] Botão de criação de um novo usuário
- [x] Botão que permita a edição dos atributos do usuário
- [x] Botão de exclusão do usuário

### Importação de Dados

- [ ] Importação de dados de planilhas de cargas
- [x] Importação de dados de planilhas de produtos
- [x] Importação de dados de planilhas de usuários

## Passo a passo para rodar o projeto localmente

1. Clone o projeto:

```
 git clone git@github.com:thalis-freitas/easy_pallet_front.git
```

2. Entre na pasta do projeto:

```
 cd easy_pallet_front/
```

3. Instale as dependências:

```
 npm install
```

5. Suba o servidor:

```
 npm run dev
```

6. Acesse http://localhost:5173/
