# challenge-AluraGeek

## Configurando o projeto
#### 1. Faça um fork do projeto para seu GitHub e depois avalie meu projeto com uma estrela (star)

#### 2. Copie o endereço HTTPS do fork do GitHub que você fez

#### 3. Depois abra seu VS CODE

#### 4. No menu superior, vá em arquivo (File) e seleciona a opção abrir pasta (Open Folder...)

#### 5. Escolha uma pasta, por exemplo, downloads ou area de trabalho

#### 6. Agora precisamos clonar o projeto do seu GitHub para o seu computador

#### 7. Para isso, use o atalho control+aspas simples (CTRL+') para abrir o terminal do vscode e executar o comando para clonar:
```git clone ENDEREÇO_HTTPS_COPIADO```

#### 8. Após clonado, entre na pasta do projeto. Vá em arquivo (File) novamente e seleciona abrir pasta (Open Folder...) e selecione sua pasta clonada

#### 9. Para que o projeto funcione é preciso instalar 3 dependências: live server, node e json-server

#### 10. No menu lateral do vs code selecione Extensões (ou use CTRL+SHIFT+X), procure por Live Server e instale

#### 11. Use o atalho CTRL+" novamente para abrir o terminal e instale o node_modules com este comando:
```npm install npm@latest```

#### 12. Precisaremos também do json-server para rodar nosso servidor json local, use o código abaixo:
```npm i json-server```

#### 13. Agora rode o servidor com este comando:
```json-server utils/db.json```

#### 14. Pronto! Agora é só abrir o index.html com o plugin LIVE SERVER. Para isso, clique com botão direito do mouse em cima do index.html e selecione abrir  com o Live Server (Open with Live Server)