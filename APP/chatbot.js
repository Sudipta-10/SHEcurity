// Function to send a message
function sendMessage() {
    let userInput = document.getElementById('user-input').value;
    if (userInput.trim() === "") return;

    let chatBox = document.getElementById('chat-box');

    // Display user message
    let userMessage = document.createElement("div");
    userMessage.classList.add("user-message");
    userMessage.innerText = userInput;
    chatBox.appendChild(userMessage);

    document.getElementById('user-input').value = "";

    // Scroll to the latest message
    chatBox.scrollTop = chatBox.scrollHeight;

    // Simulate bot response
    setTimeout(() => {
        let botMessage = document.createElement("div");
        botMessage.classList.add("bot-message");
        botMessage.innerText = getBotResponse(userInput);
        chatBox.appendChild(botMessage);

        // Scroll to the latest message
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);
}

// Function to handle Enter key press
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

// Function to get bot response
function getBotResponse(input) {
    input = input.toLowerCase();

    if (input.includes("hello")) {
        return "Hello! How can I assist you today?";
    } else if (input.includes("safety tips")) {
        return "Here are some safety tips: 1. Always share your location with a trusted person. 2. Avoid isolated places at night.";
    } else if (input.includes("help")) {
        return "If you need immediate help, press the SOS button!";
    } else {
        return "I'm still learning! Try asking about safety tips, emergency help, or general queries.";
    }
}

// Function to navigate back
function goBack() {
    window.history.back();
}
