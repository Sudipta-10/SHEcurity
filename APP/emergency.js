// Function to go back
function goBack() {
    window.history.back();
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
                    <button onclick="deleteContact(this)">❌</button>`;
    contactList.appendChild(li);

    document.getElementById("contactName").value = "";
    document.getElementById("contactNumber").value = "";
}

// Function to delete a contact
function deleteContact(element) {
    element.parentElement.remove();
}
