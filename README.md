# encurtadorURL - docker

1. Clone o repositório e vá até o mesmo com cd encurtadorURL ou pela interface

 2. Agora instale o yarn devido a minha escolha de gerenciador de pacotes

        npm install --global yarn

      
 3. Depois rode o yarn, simplesmente digitando yarn no terminal para que assim ele baixe os pacotes necessários para o programa rodar

        yarn


 4. Antes de iniciar o programa devemos configurar o postgres, logo neste tutorial presumirei que possue o postgres instalado:
       1. Primeiro crie uma database com o nome encurtador no seu postgres
       2. No Ubuntu 20.04 é possivel se fazer isso com "sudo su - postgres", coloque sua senha, depois no terminal digite "psql"
          e depois "CREATE DATABASE encurtador;", lembre-se do ";" é importante no postgres.

              sudo su - postgres
              psql
              CREATE DATABASE encurtador;

          
 5. Será necessário antes de inicializar criar um arquivo chamado .env, siga o exemplo do .env.example

            touch .env

-------- passos diferentes do encurtadorURL --------

 6. Crie um arquivo de .dockerignore e coloque o dist e o node_modules para melhor cacheamento do container
 
 7. Execute o comando abaixo para criar a imagem
 
            docker build -t encurtador-multi-stage .
            
 8. Para rodar a imagem execute o comando abaixo caso esteja no linux e em mac/windows é só retirar o --network="host"
              
            linux = docker run --network="host" -p 8081:8081 encurtador-multi-stage
            
            windows/mac = docker run --network="host" -p 8081:8081 encurtador-multi-stage
            
      1. Para versões windows e mac vá até sua pasta .env e mude o 127.0.0.1 para host.docker.internal, veja no .env.example
      
              linux: DATABASE_URL = postges://postgres:12345@127.0.0.1:5432/encurtador
 
              windows/mac: DATABASE_URL = postges://postgres:12345@host.docker.internal:5432/encurtador
      
 9. Documentação do Postman -> https://documenter.getpostman.com/view/7519945/TWDRtLFi

 10. O servidor online no heroku -> https://encurtador-url-ts.herokuapp.com/
