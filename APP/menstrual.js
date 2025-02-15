// menstrual-tracker.js - Menstrual cycle tracking functionality
class MenstrualTracker {
    constructor() {
        this.cycles = JSON.parse(localStorage.getItem('menstrualCycles')) || [];
        this.currentCycle = null;
    }

    // Add new cycle
    startNewCycle(date = new Date()) {
        const cycle = {
            startDate: date,
            symptoms: [],
            mood: [],
            flow: [],
            notes: '',
            id: Date.now()
        };

        this.cycles.push(cycle);
        this.currentCycle = cycle;
        this.saveCycles();
        return cycle;
    }

    // Add daily data
    addDailyData(date, data) {
        const dayData = {
            date: date,
            ...data
        };

        if (!this.currentCycle) {
            this.startNewCycle();
        }

        this.currentCycle.symptoms.push(dayData);
        this.saveCycles();
    }

    // Calculate average cycle length
    calculateAverageCycleLength() {
        if (this.cycles.length < 2) return null;

        let totalDays = 0;
        for (let i = 1; i < this.cycles.length; i++) {
            const currentStart = new Date(this.cycles[i].startDate);
            const prevStart = new Date(this.cycles[i-1].startDate);
            const diffDays = (currentStart - prevStart) / (1000 * 60 * 60 * 24);
            totalDays += diffDays;
        }

        return Math.round(totalDays / (this.cycles.length - 1));
    }

    // Predict next period
    predictNextPeriod() {
        if (this.cycles.length === 0) return null;

        const avgCycleLength = this.calculateAverageCycleLength() || 28;
        const lastCycleStart = new Date(this.cycles[this.cycles.length - 1].startDate);
        const predictedDate = new Date(lastCycleStart);
        predictedDate.setDate(predictedDate.getDate() + avgCycleLength);

        return predictedDate;
    }

    // Save cycles to localStorage
    saveCycles() {
        localStorage.setItem('menstrualCycles', JSON.stringify(this.cycles));
    }

    // Get cycle history
    getCycleHistory() {
        return this.cycles;
    }

    // Get fertility window
    getFertilityWindow() {
        const predictedDate = this.predictNextPeriod();
        if (!predictedDate) return null;

        const fertileStart = new Date(predictedDate);
        fertileStart.setDate(fertileStart.getDate() - 14);
        const fertileEnd = new Date(fertileStart);
        fertileEnd.setDate(fertileStart.getDate() + 6);

        return {
            start: fertileStart,
            end: fertileEnd
        };
    }
}