// main.js - Core application functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize floating SOS button
    const sosButton = document.querySelector('.sos-button');
    const emergencyContacts = [
        { name: 'Police', number: '100' },
        { name: 'Women Helpline', number: '1091' },
        { name: 'Ambulance', number: '102' }
    ];

    // Quick SOS functionality
    sosButton.addEventListener('click', async function() {
        try {
            const location = await getCurrentLocation();
            const message = `EMERGENCY: I need help! Location: ${location.latitude}, ${location.longitude}`;
            
            // Simulate sending emergency alerts
            emergencyContacts.forEach(contact => {
                sendEmergencyAlert(contact, message);
            });

            alert('Emergency alert sent to all emergency contacts!');
        } catch (error) {
            alert('Error sending emergency alert: ' + error.message);
        }
    });

    // Get current location
    async function getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                position => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                error => {
                    reject(error);
                }
            );
        });
    }

    // Simulate sending emergency alert
    function sendEmergencyAlert(contact, message) {
        console.log(`Sending alert to ${contact.name} (${contact.number}): ${message}`);
        // In a real application, this would integrate with SMS/calling APIs
    }

    // Initialize user profile
    initializeProfile();
});

// User profile management
function initializeProfile() {
    const profileMenu = document.querySelector('.profile-menu');
    
    profileMenu.addEventListener('click', () => {
        // Implement profile management functionality
        console.log('Profile menu clicked');
    });
}