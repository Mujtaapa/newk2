const cardForm = document.getElementById('card-form');
const cardNumberInput = document.getElementById('card-number');
const cardInfoDiv = document.getElementById('card-info');

cardForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const cardNumber = cardNumberInput.value;

    // Basic validation
    if (!/^\d{16}$/.test(cardNumber)) {
        cardInfoDiv.innerHTML = '<p>Please enter a valid 16-digit card number.</p>';
        return;
    }

    try {
        const response = await fetch(`https://lookup.binlist.net/${cardNumber}`);
        const data = await response.json();

        if (response.ok) {
            cardInfoDiv.innerHTML = `
                <p><strong>Scheme:</strong> ${data.scheme}</p>
                <p><strong>Type:</strong> ${data.type}</p>
                <p><strong>Brand:</strong> ${data.brand}</p>
                <p><strong>Country:</strong> ${data.country.name}</p>
                <p><strong>Bank:</strong> ${data.bank.name}</p>
            `;
        } else {
            cardInfoDiv.innerHTML = `<p>Error: ${data.message || 'Could not retrieve card information.'}</p>`;
        }
    } catch (error) {
        cardInfoDiv.innerHTML = `<p>Error: Could not connect to the server.</p>`;
    }
});
