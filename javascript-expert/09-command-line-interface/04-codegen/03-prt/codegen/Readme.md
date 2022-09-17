```
    transformar em executavel => chmod +x index.js
    
    criar comando executavel => {
        no package.json => "bin": {
            "<nome-comando>": "./src/index.js"
        }
        executar para gerar comando => npm link
        executar para remover comando => npm unlink -g @andreis3/codegen
    }
```