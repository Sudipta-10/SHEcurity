// Back Button Function
function goBack() {
    window.history.back();
}

// Profile Picture Upload
document.getElementById("uploadImage").addEventListener("change", function(event) {
    const reader = new FileReader();
    reader.onload = function() {
        document.getElementById("profileImg").src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
});

// Add Emergency Contact
function addContact() {
    const name = document.getElementById("newContactName").value;
    const number = document.getElementById("newContactNumber").value;
    
    if (name && number) {
        const contactList = document.getElementById("contactList");
        const newContact = document.createElement("li");
        newContact.innerHTML = `${name}: <a href="tel:${number}">${number}</a>`;
        contactList.appendChild(newContact);
        
        // Clear input fields
        document.getElementById("newContactName").value = "";
        document.getElementById("newContactNumber").value = "";
    } else {
        alert("Please enter both name and number.");
    }
}
