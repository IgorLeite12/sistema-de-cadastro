# Sistema de Cadastro

Este projeto foi desenvolvido para praticar os conhecimentos adquiridos no [curso de Angular](https://www.udemy.com/share/10cYWX3@ItjdIjpmgcA-r5Ys0jY9slHqBCIuzzT4O58mygpzqdw_pMEHg-qSz9qTtgYD0TCMkA==/). Ele utiliza bibliotecas modernas para facilitar o desenvolvimento.

## Descrição
Sistema de cadastro simples em Angular, permitindo cadastrar, editar, excluir e listar usuários. Os dados são armazenados em memória (LocalStorage) e manipulados por um serviço Angular.

## Pré-requisitos
- [Node.js](https://nodejs.org/pt) **(versão recomendada: v22.15.1 ou superior)**
- [Angular CLI](https://angular.dev/installation) **(19.0 ou superior)**
- npm **(já incluído com o Node.js)**

## Funcionalidades
- Uso do [UUID](https://www.npmjs.com/package/uuid) para geração de IDs únicos para usuários.
- Validação de formulários com [Reactive Forms](https://angular.dev/guide/forms/reactive-forms).
- Interface moderna com [Angular Material](https://material.angular.io/).
- Consumo da API [Brasil.api.com](https://brasilapi.com.br/) para estados e cidades.

### A aplicação é dividida em componentes:
- **ConsultationComponent**: Lista de usuários cadastrados.
- **RegistrationComponent**: Formulário de cadastro e edição de usuários.

## Instalação e Execução
1. **Clone o repositório:**
   ```bash
   git clone https://github.com/IgorLeite12/sistema-de-cadastro.git
   ```
2. **Acesse o diretório do projeto:**
   ```bash
   cd sistema-de-cadastro
   ```
3. **Instale as dependências:**
   ```bash
   npm install
   ```
4. **Inicie o servidor de desenvolvimento:**
   ```bash
   ng serve
   ```

Acesse a aplicação em [http://localhost:4200](http://localhost:4200).
