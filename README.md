# NEST

- [🧱 Pipe ('Middlewares' | interceptadores)](https://docs.nestjs.com/websockets/pipes#binding-pipes)  
  Validation.pipe: interceptar a entrada de dados no controller, validar e autorizar

- [🧩 ConfigModule (Gerenciar o .env)](https://docs.nestjs.com/fundamentals/dynamic-modules#config-module-example)  
  ConfigModule: módulo dinâmico que auxilia a alteração das configurações da aplicação

- [🔒 Authentication](https://docs.nestjs.com/recipes/passport#implementing-passport-jwt)   
  Sobrescreve os processos do Passportjs  

- [👮 Guards](https://docs.nestjs.com/faq/request-lifecycle)  
  Autorização da requisição

- [🧪 Vitest](https://docs.nestjs.com/recipes/swc#vitest)  
  Executor de testes


>AUTH
>
>   - [🛂 Passport (Middleware de autenticação)](https://www.passportjs.org/)
>
>     - [🔐 passport-jwt (Estrategia de autenticação com JSON Web Token)](https://www.passportjs.org/packages/passport-jwt/)

   
> 🚨 Gerar chave privada e extrair publica com algoritmo RSA256  (No Windows)  
>   1 - Instalar openSSL  
>   2 - Executar os códigos abaixo no prompt OpenSSL  
>   * **Gerar** chave privada: 'openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048'    
>
>   * **Extrair** chave pública: 'openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048'
>
>⚠️ converter em base64 as duas chaves  (POWERSHELL)

````powershell
$base64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes("C:\Users\felip\Documents\Rocketseat\1felipeaac\private_key.pem"))
[IO.File]::WriteAllText("C:\Users\felip\Documents\Rocketseat\1felipeaac\private_key-base64.txt", $base64)

$base64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes("Path\public_key.pem"))
[IO.File]::WriteAllText("Path\public_key.pem-base64.txt", $base64)
````


    