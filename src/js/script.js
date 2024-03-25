import "../css/styles.css";
import "../css/adaptive.css";

window.onload = function () {
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


    function changePage() {
        document.getElementsByClassName('form-sign-up__title')[0].innerText = 'Log in to the system';
        fullName.remove();
        email.remove();
        repeatPassword.remove();
        let labelToRemoveLength = labelToRemove.length;
        for (let i = 0; i < labelToRemoveLength; i++) {
            labelToRemove[0].remove();
        }
        agreeBlock.remove();
        signUpBtn.innerText = 'Sign In';
        signUpLink.remove();

        signUpBtn.onclick = () => {
            if (!userName.value) {
                alert('Заполните поле Your username');
                return;
            }
            if (password.value.length < 8) {
                alert('Пароль должен содержать не менее 8 символов');
                return;
            }
            alert('Добро пожаловать, ' + userName.value + '!');
        }
    }


    fullName.onkeydown = (e) => {
        if (!isNaN(parseInt(e.key))) {
            return false;
        }
    }
    userName.onkeydown = (e) => {
        if ((e.key) === ',' || (e.key) === '.') {
            return false;
        }
    }

    agree.onchange = (e) => {
        console.log(e.target.checked ? 'Согласен' : 'Не согласен');
    }

    signUpBtn.onclick = () => {

        if (!fullName.value) {
            alert('Заполните поле Full Name');
            return;
        }
        if (!userName.value) {
            alert('Заполните поле Your username');
            return;
        }
        if (!email.value) {
            alert('Заполните поле E-mail');
            return;
        }
        if (email.checkValidity() === false) {
            alert('Исправьте E-mail');
            return;
        }
        if (!password.value) {
            alert('Заполните поле Password');
            return;
        }
        if (password.value.length < 8) {
            alert('Пароль должен содержать не менее 8 символов');
            return;
        }
        if (!repeatPassword.value) {
            alert('Заполните поле Repeat Password');
            return;
        }
        if (password.value !== repeatPassword.value) {
            alert('Пароли должны совпадать');
            return;
        }
        if (!agree.checked) {
            alert('Согласитесь с нашими Условиями предоставления услуг и Положением о конфиденциальности');
            return;
        }

        popup.style.display='flex';
        popup.classList.add('popup_open');
    }

    document.getElementsByClassName('popup__btn')[0].onclick = () => {
        fullName.value = '';
        userName.value = '';
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