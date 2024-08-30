document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const hostEmailInput = document.getElementById('hostEmail');
    const fileInput = document.getElementById('file');
    const submitButton = document.querySelector('button[type="submit"]');

    form.addEventListener('submit', function(event) {
        if (!firstNameInput.value || !lastNameInput.value || !hostEmailInput.value || !fileInput.files.length) {
            alert('Please fill in all fields');
            event.preventDefault(); // Ngăn chặn form gửi đi nếu thiếu thông tin
        }
    });
});
