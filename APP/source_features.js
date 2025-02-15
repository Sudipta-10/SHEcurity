// Function to go back
function goBack() {
    window.history.back();
}

// Function to send SOS alert
function sendSOS() {
    const emergencyContacts = getEmergencyContacts();
    if (emergencyContacts.length === 0) {
        alert("No emergency contacts found! Please add contacts first.");
        return;
    }

    emergencyContacts.forEach(contact => {
        alert(`🚨 SOS Alert sent to ${contact.name} (${contact.number})`);
        // Simulating SMS API Call (Backend needed for actual SMS)
        console.log(`Sending SOS SMS to ${contact.number}`);
    });
}

// Function to add a new contact
function addContact() {
    const name = document.getElementById("contactName").value;
    const number = document.getElementById("contactNumber").value;

    if (name === "" || number === "") {
        alert("Please enter both name and number!");
        return;
    }

    const contactList = document.getElementById("userContacts");
    const li = document.createElement("li");
    li.innerHTML = `<span>${name}: ${number}</span> 
                    <a href="tel:${number}" class="call-btn">📞 Call</a>
                    <button onclick="deleteContact(this)">❌</button>`;
    contactList.appendChild(li);

    document.getElementById("contactName").value = "";
    document.getElementById("contactNumber").value = "";
}

// Function to delete a contact
function deleteContact(element) {
    element.parentElement.remove();
}

// Function to get emergency contacts
function getEmergencyContacts() {
    const contacts = document.querySelectorAll("#userContacts li");
    let emergencyContacts = [];

    contacts.forEach(contact => {
        const name = contact.querySelector("span").textContent.split(":")[0];
        const number = contact.querySelector("span").textContent.split(":")[1].trim();
        emergencyContacts.push({ name, number });
    });

    return emergencyContacts;
}

// 🚨 **New Feature: Detect Calls from Unknown Numbers**
// This will require backend integration to monitor incoming calls

function checkUnknownCall(number) {
    const knownContacts = getEmergencyContacts().map(contact => contact.number);
    
    if (!knownContacts.includes(number)) {
        let confirmSOS = confirm(`🚨 Alert! Unknown number (${number}) detected. Do you want to notify emergency contacts?`);
        if (confirmSOS) {
            sendSOS();
        }
    }
}

// Simulate an incoming call (this would be handled by backend API in real-world usage)
setTimeout(() => {
    let randomNumber = "+91" + Math.floor(1000000000 + Math.random() * 9000000000);
    checkUnknownCall(randomNumber);
}, 5000); // Simulates a call after 5 seconds
