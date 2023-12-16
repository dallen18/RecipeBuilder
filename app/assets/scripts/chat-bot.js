document.addEventListener('DOMContentLoaded', function () {
    const openButton = document.getElementById('chat');
    openButton.addEventListener('click', openChat);

    const closeButton = document.getElementById('closeButton');
    closeButton.addEventListener('click', closeChat);

    const chatBot = document.getElementById('chat-bot');

    function openChat() {
        chatBot.style.display = '';
    }

    function closeChat() {
        chatBot.style.display = 'none';
    }

    const inputField = document.getElementById('userInput');
    const sendButton = document.getElementById('sendMessage');

    sendButton.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent form submission
        sendMessage();
    });

    inputField.addEventListener('keypress', function (e) {
        if (e.keyCode === 13) { // 13 is the key code for Enter key
            e.preventDefault();
            sendMessage();
        }
    });

    async function sendMessage() {
        const message = inputField.value.trim();
        inputField.value = '';

        if (message) {
            updateConversation('user', message);
            await sendMessageToGPT(message);
        }
    }

    async function sendMessageToGPT(message) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
            }),
        };
        try {
            const response = await fetch('http://localhost:3030/openai', options);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            const gptMessage = result.result;
            updateConversation('gpt', gptMessage);
        } catch (error) {
            console.error('Error connecting to the server:', error.message);
        }
    }

    function updateConversation(sender, message) {
        const conversationDiv = document.getElementById('conversation');
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'gpt-message');
        messageDiv.textContent = message;
        conversationDiv.appendChild(messageDiv);
        conversationDiv.scrollTop = conversationDiv.scrollHeight;
    }
});
