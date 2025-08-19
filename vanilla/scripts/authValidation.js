document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".auth-form");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const emailinput = document.querySelector("#email");
            const passwordinput = document.querySelector("#password");

            let isvalid = true;
            let messages = [];


            if (emailinput!=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailinput.value)) {
                isvalid = false;
                messages.push("Enter a valid email address.");
            }

            if (passwordinput.value.trim().length < 6) {
                isvalid = false;
                messages.push("Password must be at least 6 characters.");
            }

            if (!isvalid) {
                alert(messages.join("\n"));
            } else {
                form.submit();
            }
        });
    }
});
