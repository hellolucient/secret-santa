document.addEventListener('DOMContentLoaded', () => {
    const nameSelect = document.getElementById('nameSelect');
    const resultDiv = document.getElementById('result');

    // Fetch names from the server
    fetch('/names')
        .then(response => response.json())
        .then(names => {
            names.forEach(name => {
                const option = document.createElement('option');
                option.value = name;
                option.textContent = name;
                nameSelect.appendChild(option);
            });
        });

    document.getElementById('drawForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedName = nameSelect.value;

        fetch('/draw', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ selectedName })
        })
        .then(response => response.json())
        .then(data => {
            resultDiv.textContent = `You have drawn: ${data.drawnName}`;
        });
    });
});