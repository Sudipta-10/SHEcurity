// pregnancy-tracker.js - Pregnancy tracking functionality
class PregnancyTracker {
    constructor() {
        this.pregnancyData = JSON.parse(localStorage.getItem('pregnancyData')) || {
            dueDate: null,
            lastPeriod: null,
            appointments: [],
            measurements: [],
            symptoms: [],
            notes: []
        };
    }

    // Initialize pregnancy tracking
    initializePregnancy(lastPeriodDate) {
        const dueDate = new Date(lastPeriodDate);
        dueDate.setDate(dueDate.getDate() + 280); // 40 weeks

        this.pregnancyData.lastPeriod = lastPeriodDate;
        this.pregnancyData.dueDate = dueDate;
        this.saveData();
    }

    // Calculate current week
    getCurrentWeek() {
        if (!this.pregnancyData.lastPeriod) return null;

        const lastPeriod = new Date(this.pregnancyData.lastPeriod);
        const today = new Date();
        const diffTime = Math.abs(today - lastPeriod);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return Math.floor(diffDays / 7);
    }

    // Add appointment
    addAppointment(date, description, doctor) {
        const appointment = {
            date: date,
            description: description,
            doctor: doctor,
            id: Date.now()
        };

        this.pregnancyData.appointments.push(appointment);
        this.saveData();
    }

    // Add measurement
    addMeasurement(date, type, value) {
        const measurement = {
            date: date,
            type: type, // weight, bloodPressure, etc.
            value: value,
            id: Date.now()
        };

        this.pregnancyData.measurements.push(measurement);
        this.saveData();
    }

    // Add symptom
    addSymptom(date, symptom, severity) {
        const symptomEntry = {
            date: date,
            symptom: symptom,
            severity: severity,
            id: Date.now()
        };

        this.pregnancyData.symptoms.push(symptomEntry);
        this.saveData();
    }

    // Add note
    addNote(date, content) {
        const note = {
            date: date,
            content: content,
            id: Date.now()
        };

        this.pregnancyData.notes.push(note);
        this.saveData();
    }

    // Get weekly information
    getWeeklyInfo(week) {
        // Sample data - in a real app, this would come from a database
        const weeklyInfo = {
            babySize: getBabySizeForWeek(week),
            development: getDevelopmentInfo(week),
            motherChanges: getMotherChangesInfo(week),
            tips: getTipsForWeek(week)
        };

        return weeklyInfo;
    }

    // Save data to localStorage
    saveData() {
        localStorage.setItem('pregnancyData', JSON.stringify(this.pregnancyData));
    }
}