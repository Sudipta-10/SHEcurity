// JavaScript for Menstrual Tracker
class MenstrualTracker {
    constructor() {
        this.cycles = JSON.parse(localStorage.getItem('menstrualCycles')) || [];
        this.currentCycle = this.cycles.length ? this.cycles[this.cycles.length - 1] : null;
    }

    // Start a new cycle
    startNewCycle(date) {
        const cycle = {
            startDate: date,
            symptoms: [],
            mood: [],
            flow: [],
            id: Date.now()
        };

        this.cycles.push(cycle);
        this.currentCycle = cycle;
        this.saveCycles();
    }

    // Add daily data
    addDailyData(date, data) {
        if (!this.currentCycle) {
            console.warn("No active cycle found. Starting a new cycle.");
            this.startNewCycle(date);
        }

        this.currentCycle.symptoms.push({ date, ...data });
        this.saveCycles();
    }

    // Calculate average cycle length
    calculateAverageCycleLength() {
        if (this.cycles.length < 2) return 28; // Default to 28 days if not enough data

        let totalDays = 0;
        for (let i = 1; i < this.cycles.length; i++) {
            const currentStart = new Date(this.cycles[i].startDate);
            const prevStart = new Date(this.cycles[i - 1].startDate);
            totalDays += (currentStart - prevStart) / (1000 * 60 * 60 * 24);
        }

        return Math.round(totalDays / (this.cycles.length - 1));
    }

    // Predict next period date
    predictNextPeriod() {
        if (this.cycles.length === 0) return null;

        const avgCycleLength = this.calculateAverageCycleLength();
        const lastCycleStart = new Date(this.cycles[this.cycles.length - 1].startDate);
        lastCycleStart.setDate(lastCycleStart.getDate() + avgCycleLength);

        return lastCycleStart;
    }

    // Get fertility window
    getFertilityWindow() {
        const predictedDate = this.predictNextPeriod();
        if (!predictedDate) return null;

        const fertileStart = new Date(predictedDate);
        fertileStart.setDate(fertileStart.getDate() - 14);
        const fertileEnd = new Date(fertileStart);
        fertileEnd.setDate(fertileStart.getDate() + 6);

        return { start: fertileStart, end: fertileEnd };
    }

    // Save cycles to localStorage
    saveCycles() {
        localStorage.setItem('menstrualCycles', JSON.stringify(this.cycles));
    }

    // Get cycle history
    getCycleHistory() {
        return this.cycles;
    }
}

// Global instance of MenstrualTracker
const tracker = new MenstrualTracker();

// Initialize with test data (You can remove this later)
tracker.startNewCycle("2025-02-01");
tracker.addDailyData("2025-02-02", { symptoms: ["cramps"], mood: ["irritated"], flow: ["medium"] });

console.log("Next period date:", tracker.predictNextPeriod());
console.log("Fertility window:", tracker.getFertilityWindow());

// Go back function
function goBack() {
    window.history.length > 1 ? window.history.back() : window.location.href = "index.html";
}

// Menstrual Cycle Calculation
function calculateMenstrualCycle() {
    const lastPeriodInput = document.getElementById("last-period").value;
    const cycleLengthInput = document.getElementById("cycle-length").value;

    if (!lastPeriodInput || !cycleLengthInput) {
        document.getElementById("result").innerText = "⚠ Please enter all details.";
        return;
    }

    const lastPeriodDate = new Date(lastPeriodInput);
    const cycleLength = parseInt(cycleLengthInput);

    if (isNaN(cycleLength) || cycleLength < 21 || cycleLength > 35) {
        document.getElementById("result").innerText = "⚠ Enter a valid cycle length between 21 and 35 days.";
        return;
    }

    // Start new cycle
    tracker.startNewCycle(lastPeriodInput);

    // Predict next period
    const nextPeriodDate = tracker.predictNextPeriod();
    const nextPeriodString = nextPeriodDate.toDateString();

    // Predict ovulation date
    const fertilityWindow = tracker.getFertilityWindow();
    const ovulationString = fertilityWindow.start.toDateString();

    document.getElementById("result").innerHTML =
        `🩸 Your estimated next period start date: <strong>${nextPeriodString}</strong><br>
         🌸 Estimated ovulation date: <strong>${ovulationString}</strong>`;

    // Update history
    updateCycleHistory();

    // Schedule Notifications
    scheduleNotification(nextPeriodDate, "Your next period is expected to start soon. Stay prepared!");
    scheduleNotification(fertilityWindow.start, "You are entering your ovulation window.");
}

// Schedule Notifications
function scheduleNotification(date, message) {
    const now = new Date();
    const timeUntilNotification = date.getTime() - now.getTime();

    if (timeUntilNotification > 0) {
        setTimeout(() => {
            alert(message); // Replace with SMS API if needed
        }, timeUntilNotification);
    }
}

// Update Cycle History
function updateCycleHistory() {
    const historyList = document.getElementById("cycle-history");
    historyList.innerHTML = ""; // Clear existing history

    tracker.getCycleHistory().forEach((cycle, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `Cycle ${index + 1}: <strong>${new Date(cycle.startDate).toDateString()}</strong>`;
        historyList.appendChild(listItem);
    });
}
