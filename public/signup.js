console.log('Hello')

const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#signup-username').value.trim();
    const password = document.querySelector('#signup-password').value.trim();

    if (password.length < 8) {
        alert('Password must be at least 8 characters');
        document.querySelector('#signup-password').focus();

        return;
    }

    if (username && password) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            const resData = await response.json();

            alert(`${response.statusText}\n${resData.message ? resData.message : ''}`);
        }
    }
};

const initLogin = () => {
    document.querySelector('.js-signup-form').addEventListener('submit', signupFormHandler);
};

initLogin();