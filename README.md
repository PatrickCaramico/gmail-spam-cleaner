# Gmail Spam Cleaner Automation 📬🤖

Um aplicativo premium e moderno para limpar sua aba de Spam do Gmail com um único clique, utilizando o poder do **n8n**.

![Screenshot do Projeto](https://images.unsplash.com/photo-1557200134-90327ee9fafa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80) <!-- Placeholder para uma imagem legal -->

## ✨ Funcionalidades

- **Interface Premium**: Design em Dark Mode com efeito Glassmorphism.
- **Limpeza em Lote**: Apaga múltiplos e-mails de spam de uma só vez.
- **Automação Inteligente**: Além do botão manual, o sistema limpa sua caixa automaticamente a cada hora no n8n.
- **Feedback em Tempo Real**: Status visual durante o processamento.

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3 (Vanilla), JavaScript (ES6+).
- **Backend/Automação**: [n8n](https://n8n.io/).
- **API**: Gmail API.

## 🚀 Como Usar

### 1. Configurar o n8n
- Importe o arquivo `n8n_workflow.json` para o seu n8n.
- Configure suas credenciais do Gmail nos nós correspondentes.
- Ative o fluxo (Publish).
- Copie a **Production URL** do nó Webhook.

### 2. Configurar o Frontend
- Abra o `index.html` no seu navegador.
- Cole a URL do Webhook no campo indicado.
- Clique em **LIMPAR ABA SPAM**.

## 📁 Estrutura do Projeto

```text
├── index.html          # Estrutura do site
├── style.css           # Design e animações
├── script.js           # Lógica de conexão com o n8n
├── n8n_workflow.json    # O "cérebro" da automação para importar no n8n
└── README.md           # Este arquivo
```

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se à vontade para usar e modificar.

---
Desenvolvido com ❤️ para uma caixa de entrada mais limpa.
