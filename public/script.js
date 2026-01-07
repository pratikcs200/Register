document.getElementById('registrationForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const messageDiv = document.getElementById('message');
    const btnText = submitBtn.querySelector('span');

    // Get Form Data
    const formData = {
        fullName: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value, // In real app, avoid sending plain pass visible in network if poss, but standard for POST
        course: document.getElementById('course').value
    };

    // Simple Client-side Validation
    if (!formData.fullName || !formData.email || !formData.password) {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }

    // Indicate Loading
    const originalBtnText = btnText.textContent;
    btnText.textContent = 'Registering...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            showMessage(data.message, 'success');
            document.getElementById('registrationForm').reset();
        } else {
            showMessage(data.message || 'Registration failed.', 'error');
        }

    } catch (error) {
        console.error('Error:', error);
        showMessage('Something went wrong. Please try again.', 'error');
    } finally {
        // Reset Button
        btnText.textContent = originalBtnText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    }
});

function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;

    // Auto hide after 5 seconds
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        setTimeout(() => {
            messageDiv.className = 'message';
            messageDiv.textContent = '';
        }, 300);
    }, 5000);
}
