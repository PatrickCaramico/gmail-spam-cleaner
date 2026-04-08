document.addEventListener('DOMContentLoaded', () => {
    const btnClear = document.getElementById('btn-clear');
    const webhookInput = document.getElementById('webhook-url');
    const statusText = document.getElementById('status-text');
    const statusDot = document.querySelector('.dot');
    const toast = document.getElementById('toast');

    // Carregar URL do webhook do localStorage se existir
    const savedUrl = localStorage.getItem('n8n_webhook_url');
    if (savedUrl) {
        webhookInput.value = savedUrl;
    }

    function showToast(message, type = 'success') {
        toast.textContent = message;
        toast.style.backgroundColor = type === 'success' ? '#fff' : '#ff4757';
        toast.style.color = type === 'success' ? '#0f172a' : '#fff';
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    function setStatus(text, color) {
        statusText.textContent = text;
        statusDot.style.backgroundColor = color;
        statusDot.style.boxShadow = `0 0 10px ${color}`;
    }

    btnClear.addEventListener('click', async () => {
        if (btnClear.disabled) return;
        
        const url = webhookInput.value.trim();

        if (!url) {
            showToast('Por favor, insira a URL do Webhook do n8n.', 'error');
            webhookInput.focus();
            return;
        }

        // Salvar a URL para facilitar o próximo uso
        localStorage.setItem('n8n_webhook_url', url);

        // Estado de carregamento
        btnClear.disabled = true;
        btnClear.classList.add('loading');
        setStatus('Limpando spam...', '#ffa502');
        showToast('Iniciando limpeza... Aguarde a conclusão.', 'success');

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 segundos de timeout

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: 'clear_spam',
                    timestamp: new Date().toISOString()
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (response.ok) {
                setStatus('Spam limpo com sucesso!', '#2ed573');
                showToast('A aba de spam foi limpa com sucesso!');
            } else {
                throw new Error('Falha na resposta do servidor');
            }
        } catch (error) {
            clearTimeout(timeoutId);
            console.error('Erro:', error);
            
            if (error.name === 'AbortError') {
                setStatus('Processo demorado...', '#ffa502');
                showToast('O processo está demorando, mas pode continuar no n8n.', 'warning');
            } else {
                setStatus('Erro ao limpar spam', '#ff4757');
                showToast('Erro ao conectar com o n8n. Verifique o fluxo e as credenciais.', 'error');
            }
        } finally {
            // Manter desativado por um breve momento para evitar spam de cliques
            setTimeout(() => {
                btnClear.disabled = false;
                btnClear.classList.remove('loading');
            }, 1000);
            
            // Retornar ao estado inicial após 10 segundos se teve sucesso
            setTimeout(() => {
                if (statusText.textContent === 'Spam limpo com sucesso!') {
                    setStatus('Pronto para limpar', '#2ed573');
                }
            }, 10000);
        }
    });
});
