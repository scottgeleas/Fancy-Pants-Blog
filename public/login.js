'use strict';

const loginFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#login-username').value.trim();
    const password = document.querySelector('#login-password').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
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
    document.querySelector('.js-login-form').addEventListener('submit', loginFormHandler);
};

initLogin();