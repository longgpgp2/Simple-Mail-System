"use strict";
(function () {
    window.addEventListener("load", init)

    function init() {
        let submit = document.getElementById("sign-up-btn")
        submit.addEventListener('click', (e) => {
            e.preventDefault();
        });
        submit.addEventListener("click", signUp)

    }

    function signUp() {

        document.getElementById('name-error').innerText = '';
        document.getElementById('email-error').innerText = '';
        document.getElementById('password-error').innerText = '';
        document.getElementById('re-password-error').innerText = '';


        const fullName = document.getElementById('full-name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rePassword = document.getElementById('re-password').value;

        let hasError = false;

        // Validate form
        if (!fullName) {
            document.getElementById('name-error').innerText = 'Please enter your name.';
            hasError = true;
        }
        if (!email) {
            document.getElementById('email-error').innerText = 'Please enter the email address.';
            hasError = true;
        }
        if (!password) {
            document.getElementById('password-error').innerText = 'Please enter your password.';
            hasError = true;
        } else if (password.length < 3) {
            document.getElementById('password-error').innerText = 'Password must contain at least 3 characters.';
            hasError = true;
        }
        if (!rePassword) {
            document.getElementById('re-password-error').innerText = 'Re enter your password.';
            hasError = true;
        } else if (password !== rePassword) {
            document.getElementById('re-password-error').innerText = 'The password does not match.';
            hasError = true;
        }

        if (!hasError) {
            let form = document.getElementById("form");
            form.submit();
        }
    }




})();


