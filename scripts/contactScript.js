document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const messageBox = document.getElementById('messageBox');
    const overlay = document.getElementById('overlay');
    const closeButton = document.getElementById('closeButton');

    function showMessageBox() {
        messageBox.classList.add('show');
        overlay.style.display = 'block';
    }

    function hideMessageBox() {
        messageBox.classList.remove('show');
        overlay.style.display = 'none';
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.form-group').forEach(el => el.classList.remove('error'));

        let isValid = true;

        if (nameInput.value.trim() === '') {
            document.getElementById('nameError').style.display = 'block';
            nameInput.parentElement.parentElement.classList.add('error');
            isValid = false;
        }

        if (messageInput.value.trim() === '') {
            document.getElementById('messageError').style.display = 'block';
            messageInput.parentElement.classList.add('error');
            isValid = false;
        }

        if (isValid) {
            showMessageBox();
            form.reset();
        }
    });

    closeButton.addEventListener('click', hideMessageBox);
    overlay.addEventListener('click', hideMessageBox);
});