"use strict";
(function () {
    window.addEventListener("load", init)

    function init() {
        let submit = document.getElementById("sign-in-btn")
        submit.addEventListener('click', (e) => {
            e.preventDefault();
        });
        submit.addEventListener("click", signUp)
    }

    function signUp() {
        hasError = false;
        if (!hasError) {
            let form = document.getElementById("form");
            form.submit();
        }
    }




})();


