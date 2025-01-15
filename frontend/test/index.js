
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
document.getElementById('signup-btn').addEventListener('click', () => {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    if (name && email && password) {
        localStorage.setItem('user', JSON.stringify({ name, email, password }));
        alert('Sign Up Successful! Redirecting to Login page...');

        document.getElementById('signup').classList.add('hidden');
        document.getElementById('login').classList.remove('hidden');
    } else {
        alert('Please fill in all fields.');
    }
    
    if (!validateForm(this)) return;

    try {
        const response = await fetch('http://localhost:4000/api/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Sign Up Successful! Redirecting to Login page...');
            document.getElementById('register-tab').click();
        } else {
            if (error) {
                error.textContent = data.message || 'Sign Up Failed!';
                error.style.display = 'block';
            } else {
                alert(data.message || 'Sign Up Failed!');
            }
        }
    } catch (err) {
        if (error) {
            error.textContent = 'An error occurred. Please try again later.';
            error.style.display = 'block';
        } else {
            alert('An error occurred. Please try again later.');
        }
    }
});

// Login Functionality
document.getElementById('login-btn').addEventListener('click', () => {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    const user = JSON.parse(localStorage.getItem('user'));


    if (!validateForm(this)) {
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
            localStorage.setItem('user', JSON.stringify(data));
            window.location.href = homePage;
        } else {
            alert(`Invalid Email or Password!`);
        }
    } catch (err) {
        error.textContent = 'An error occurred. Please try again later.';
        error.style.display = 'block';
    }
    
    //if (user && user.email === email && user.password === password) {
    //    alert(`Welcome back, ${user.name}!`);
    //} else {
    //    alert('Invalid email or password. Please try again.');
    //}
});
