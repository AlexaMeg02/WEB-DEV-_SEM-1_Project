// Navigation functionality
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('nav a');

// Form validation helper function
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required]');
    for (let input of inputs) {
        if (!input.value.trim()) {
            alert('Please fill out all required fields.');
            return false;
        }
    }
    return true;
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const targetPage = link.getAttribute('data-page');

        pages.forEach(page => {
            page.classList.add('hidden');
        });

        document.getElementById(targetPage).classList.remove('hidden');
    });
});

// Signup Functionality
document.getElementById('signup-btn').addEventListener('click', async () => {
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();

    // Validate form fields
    if (!name || !email || !password) {
        alert('Please fill in all fields.');
        return;
    }

    try {
        const response = await fetch('http://localhost:4000/api/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Sign Up Successful! Redirecting to Login page...');
            document.getElementById('signup').classList.add('hidden');
            document.getElementById('login').classList.remove('hidden');
        } else {
            alert(data.message || 'Sign Up Failed!');
        }
    } catch (err) {
        alert('An error occurred. Please try again later.');
    }
});

// Login Functionality
document.getElementById('login-btn').addEventListener('click', async () => {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    // Validate form fields
    if (!email || !password) {
        alert('Please fill in all fields.');
        return;
    }

    try {
        const response = await fetch('http://localhost:4000/api/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert(`Welcome back, ${data.user.name}!`);
            localStorage.setItem('user', JSON.stringify(data.user));
            // Redirect to home page or another page
            window.location.href = 'Home.html'; // Replace with your home page path
        } else {
            alert(data.message || 'Invalid Email or Password!');
        }
    } catch (err) {
        alert('An error occurred. Please try again later.');
    }
});
