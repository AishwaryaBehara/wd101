document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registration-form");
    const tableBody = document.querySelector("#data-table tbody");

    // Load stored entries from local storage
    const storedEntries = JSON.parse(localStorage.getItem("entries")) || [];
    storedEntries.forEach(entry => appendRowToTable(entry));

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const dobInput = document.getElementById("dob");
        const acceptedTerms = document.getElementById("accepted-terms").checked;

        // Validate DOB
        const dobValue = new Date(dobInput.value);
        const today = new Date();
        const minDob = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());
        const maxDob = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

        if (dobValue < minDob || dobValue > maxDob) {
            alert("Date of Birth must be between 18 and 55 years.");
            dobInput.focus();
            return;
        }

        // Create a new entry object
        const entry = {
            name: name,
            email: email,
            password: password,
            dob: dobValue.toISOString().slice(0, 10),
            acceptedTerms: acceptedTerms
        };

        // Append the new entry to the table
        appendRowToTable(entry);

        // Store the new entry in local storage
        storedEntries.push(entry);
        localStorage.setItem("entries", JSON.stringify(storedEntries));

        form.reset();
    });

    // Function to append a row to the table
    function appendRowToTable(entry) {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${entry.name}</td>
            <td>${entry.email}</td>
            <td>${entry.password}</td>
            <td>${entry.dob}</td>
            <td>${entry.acceptedTerms ? "Yes" : "No"}</td>
        `;

        tableBody.appendChild(newRow);
    }
});