window.onload = function () {
    let title = document.getElementsByClassName('form-sign-up__title')[0];
    let fullName = document.getElementById('fullname');
    let userName = document.getElementById('username');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let repeatPassword = document.getElementById('repeatPassword');
    let labelToRemove = document.getElementsByClassName('form-sign-up__label_remove');
    let agree = document.getElementById('agree');
    let agreeBlock = document.getElementsByClassName('form-sign-up__agree')[0];
    let signUpBtn = document.getElementsByClassName('form-sign-up__btn')[0];
    let popup = document.getElementById('popup');
    let signUpLink = document.getElementsByClassName('sign-up__link')[0];


    let inputs = document.getElementsByClassName('form-sign-up__input-text');
    let errors = document.querySelectorAll('.error__container');

    let clientsArray = [];
    let clients = localStorage.getItem('clients');
    if(clients) {
        clientsArray = JSON.parse(clients);
    }

    const fullNames = clientsArray.map(el => el.fullName);
    const userNames = clientsArray.map(el => el.userName);
    const passwords = clientsArray.map(el => el.password);
    // console.log(fullNames);
    // console.log(userNames);
    // console.log(passwords);

    let indexOfUserName;

    function changePage() {
        title.innerText = 'Log in to the system';
        userName.value = '';
        password.value = '';
        fullName.nextElementSibling.remove();
        fullName.remove();
        email.nextElementSibling.remove();
        email.remove();
        repeatPassword.nextElementSibling.remove();
        repeatPassword.remove();
        let labelToRemoveLength = labelToRemove.length;
        for (let i = 0; i < labelToRemoveLength; i++) {
            labelToRemove[0].remove();
        }
        agreeBlock.remove();
        signUpBtn.innerText = 'Sign In';
        signUpLink.innerText='Registration';

        signUpLink.onclick = () => {
            location.reload();
        }

        signUpBtn.onclick = () => {
            for (let i=0; i<errors.length; i++) {
                errors[i].classList.remove('show');
            }

            for (let i=0; i<inputs.length; i++) {
                if (!inputs[i].value) {
                    inputs[i].classList.add('error-input');
                    inputs[i].nextElementSibling.classList.add('show');
                    inputs[i].nextElementSibling.innerText = 'Fill in the field ' + inputs[i].id;
                    return;
                } else {
                    inputs[i].classList.remove('error-input');
                    inputs[i].nextElementSibling.classList.remove('show');
                }
            }

            if (userName.value && password.value) {
                if (!userNames.includes(userName.value)) {
                    userName.classList.add('error-input');
                    userName.nextElementSibling.classList.add('show');
                    userName.nextElementSibling.innerText = 'This user is not registered';
                } else {
                    indexOfUserName = userNames.indexOf(userName.value);
                    if (passwords[indexOfUserName] !== (password.value)) {
                        password.classList.add('error-input');
                        password.nextElementSibling.classList.add('show');
                        password.nextElementSibling.innerText = 'Incorrect password';

                    } else {
                        password.classList.remove('error-input');
                        changePage2();
                    }
                }
            }
        }
    }


    function changePage2() {
        title.innerText = 'Welcome, ' + fullNames[indexOfUserName] + '!';
        title.nextElementSibling.remove();
        signUpBtn.innerText = 'Exit';
        userName.previousElementSibling.remove();
        userName.remove();
        password.previousElementSibling.remove();
        password.remove();
        signUpLink.remove();
        document.getElementsByClassName('sign-up__container')[0].style.alignItems = 'flex-start';
        signUpBtn.onclick = () => {
            location.reload();
        }
    }

    signUpBtn.onclick = () => {

        for (let i=0; i<errors.length; i++) {
            errors[i].classList.remove('show');
        }

        for (let i=0; i<inputs.length; i++) {
            inputs[i].classList.remove('error-input');
        }


        if (!/^[A-Z][a-z]+\s*(\s[A-Z][a-z]+\s*)*$/.test(fullName.value)) {
            fullName.classList.add('error-input');
            fullName.nextElementSibling.classList.add('show');
            if (!fullName.value) {
                fullName.nextElementSibling.innerText = 'Fill in the field Full Name';
            } else {
                fullName.nextElementSibling.innerText = 'The field Full Name can only contain english letters and space, and words in it must begin with a capital letter';
            }
            return;
        }

        if (!/^[A-Za-z\d_-]+$/.test(userName.value)) {
            userName.classList.add('error-input');
            userName.nextElementSibling.classList.add('show');
            if (!userName.value) {
                userName.nextElementSibling.innerText = 'Fill in the field Your Name';
            } else {
                userName.nextElementSibling.innerText = 'The field Your Name can only contain letters, numbers, underscore and dashes';
            }
            return;
        }

        if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}$/.test(email.value)) {
            email.classList.add('error-input');
            email.nextElementSibling.classList.add('show');
            if (!email.value) {
                email.nextElementSibling.innerText = 'Fill in the field E-mail';
            } else {
                email.nextElementSibling.innerText = 'Enter a valid e-mail';
            }
            return;
        }

        if (!/(?=.*\d)(?=.*[^\s\w])(?=.*[A-Z]).{8,}/.test(password.value)) {
            password.classList.add('error-input');
            password.nextElementSibling.classList.add('show');
            if (!password.value) {
                password.nextElementSibling.innerText = 'Fill in the field Password';
            } else {
                password.nextElementSibling.innerText = 'The field Password must contain at least 8 characters, including at least one uppercase letter, one digit and one special character';
            }
            return;
        }

        if (!repeatPassword.value) {
            repeatPassword.classList.add('error-input');
            repeatPassword.nextElementSibling.classList.add('show');
            repeatPassword.nextElementSibling.innerText = 'Fill in the field Repeat Password';
            return;
        } else  if (password.value !== repeatPassword.value) {
            repeatPassword.classList.add('error-input');
            repeatPassword.nextElementSibling.classList.add('show');
            repeatPassword.nextElementSibling.innerText = 'Password and Repeat Password must match';
            return;
        }


        if (!agree.checked) {
            agree.parentElement.nextElementSibling.classList.add('show');
            return;
        }

        let client = {
            fullName: fullName.value,
            userName: userName.value,
            email: email.value,
            password: password.value
        };

        clientsArray.push(client);
        localStorage.setItem('clients', JSON.stringify(clientsArray));
        console.log(localStorage);

        popup.style.display='flex';
        popup.classList.add('popup_open');
    }

    document.getElementsByClassName('popup__btn')[0].onclick = () => {
        fullName.value = '';
        userName.value = '';
        email.value = '';
        password.value = '';
        repeatPassword.value = '';
        popup.classList.remove('popup_open');

        changePage();
    }

    signUpLink.onclick = () => {
        changePage();
    }
}