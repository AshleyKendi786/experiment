 let journalEntries = [];
let editingIndex = -1; // Track if we are editing an entry

document.getElementById('saveBtn').addEventListener('click', function () {
    const mood = document.getElementById('mood').value;
    const entry = document.getElementById('entry').value;
    const entryDate = document.getElementById('entryDate').value;

    if (editingIndex === -1) {
        // Save new entry
        const newEntry = { mood, entry, date: entryDate };
        journalEntries.push(newEntry);
    } else {
        // Update existing entry
        journalEntries[editingIndex] = { mood, entry, date: entryDate };
        editingIndex = -1; // Reset after editing
        document.getElementById('saveBtn').innerText = "Save Entry";
    }

    displayEntries();
    clearInputs();
});

function displayEntries() {
    const entriesList = document.getElementById('entriesList');
    entriesList.innerHTML = '';

    journalEntries.forEach((entry, index) => {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('entry');
        entryDiv.innerHTML = `
            <p><strong>Date:</strong> ${entry.date}</p>
            <p><strong>Mood:</strong> ${entry.mood}</p>
            <p>${entry.entry}</p>
            <button onclick="editEntry(${index})">Edit</button>
            <button onclick="deleteEntry(${index})">Delete</button>
        `;
        entriesList.appendChild(entryDiv);
    });
}

function clearInputs() {
    document.getElementById('mood').value = '';
    document.getElementById('entry').value = '';
    document.getElementById('entryDate').value = '';
}

function editEntry(index) {
    const entry = journalEntries[index];
    document.getElementById('mood').value = entry.mood;
    document.getElementById('entry').value = entry.entry;
    document.getElementById('entryDate').value = entry.date;
    editingIndex = index;
    document.getElementById('saveBtn').innerText = "Update Entry";
}

function deleteEntry(index) {
    journalEntries.splice(index, 1); // Remove from array
    displayEntries(); // Refresh list
}
