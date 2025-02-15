// location-tracking.js - Real-time location tracking functionality
class LocationTracker {
    constructor() {
        this.isTracking = false;
        this.watchId = null;
        this.locationHistory = [];
        this.trustedContacts = JSON.parse(localStorage.getItem('trustedContacts')) || [];
    }

    // Start location tracking
    startTracking() {
        if (!navigator.geolocation) {
            throw new Error('Geolocation is not supported by this browser.');
        }

        this.isTracking = true;
        
        this.watchId = navigator.geolocation.watchPosition(
            position => this.handleLocationUpdate(position),
            error => this.handleLocationError(error),
            {
                enableHighAccuracy: true,
                maximumAge: 30000,
                timeout: 27000
            }
        );
    }

    // Stop location tracking
    stopTracking() {
        if (this.watchId) {
            navigator.geolocation.clearWatch(this.watchId);
            this.isTracking = false;
            this.watchId = null;
        }
    }

    // Handle location updates
    handleLocationUpdate(position) {
        const locationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: new Date().toISOString()
        };

        this.locationHistory.push(locationData);
        this.shareLocationWithTrustedContacts(locationData);
    }

    // Handle location errors
    handleLocationError(error) {
        console.error('Location tracking error:', error);
        this.stopTracking();
        throw new Error(`Location tracking error: ${error.message}`);
    }

    // Add trusted contact
    addTrustedContact(contact) {
        this.trustedContacts.push({
            ...contact,
            id: Date.now()
        });
        this.saveTrustedContacts();
    }

    // Remove trusted contact
    removeTrustedContact(contactId) {
        this.trustedContacts = this.trustedContacts.filter(
            contact => contact.id !== contactId
        );
        this.saveTrustedContacts();
    }

    // Share location with trusted contacts
    shareLocationWithTrustedContacts(locationData) {
        this.trustedContacts.forEach(contact => {
            // In a real app, this would integrate with a backend service
            console.log(`Sharing location with ${contact.name}: `, locationData);
        });
    }

    // Save trusted contacts to localStorage
    saveTrustedContacts() {
        localStorage.setItem('trustedContacts', JSON.stringify(this.trustedContacts));
    }

    // Get current location
    async getCurrentLocation() {
        return new Promise((resolve, reject) => {
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

    // Get location history
    getLocationHistory() {
        return this.locationHistory;
    }
}