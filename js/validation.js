"use strict"

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);
    

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);

        const name = form.elements["name"].value;
        console.log(name);
        const from = form.elements["email"].value;
        const message = form.elements["message"].value;
        const emailBody = `
        <span><strong>Name:</strong> ${name}</span><br />
        <span><strong>Email Address:</strong>  ${from}</span><br />
        <span><strong>Message:</strong>  ${message}</span>`;

        if (error===0) {
            Email.send({
                Host : "smtp.elasticemail.com",
                Username : "qowuie0@gmail.com",
                Password : "9B7CCDFCA57972617DD50774025EF8FBB151",
                To : 'qowuie0@gmail.com',
                From : "qowuie0@gmail.com",
                Subject : "Test email",
                Body : emailBody}).then(message => alert(message));
            form.reset();
        } else {
            alert('Enter requiered fields of fix them')
        }

    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++){
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;

    }

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

});