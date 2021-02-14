# encurtadorURL

### 1. Clone o repositório e vá até o mesmo com cd encurtadorURL ou pela interface

### 2. Agora instale o yarn devido a minha escolha de gerenciador de pacotes
      npm install --global yarn
      
### 3. Depois rode o yarn, simplesmente digitando yarn no terminal para que assim ele baixe os pacotes necessários para o programa rodar

### 4. Antes de iniciar o programa devemos configurar o postgres, logo neste tutorial presumirei que possue o postgres instalado:
       a) Primeiro crie uma database com o nome encurtador no seu postgres
       b) No Ubuntu 20.04 é possivel se fazer isso com "sudo su - postgres", coloque sua senha, depois no terminal digite "psql"
          e depois "CREATE DATABASE encurtador;", lembre-se do ";" é importante no postgres.
          
### 5. Será necessário antes de inicializar criar um arquivo chamado .env, siga o exemplo do .env.example

### 6. Há alguns jeitos de iniciar o programa:
      b) digitando tsc e depois node dist/server.js para assim compilar o programa e executá-lo em forma de produção (ganho de performance)
      c) através do yarn e nodemon em 2 terminais, um com "yarn watch" e o outro com "yarn dev" (sem as aspas) , assim um terminal irá ficar
         compilando o programa quando o mesmo for alterado e o outro executando.
         
### 7. Documentação do Postman -> https://documenter.getpostman.com/view/7519945/TWDRtLFi
