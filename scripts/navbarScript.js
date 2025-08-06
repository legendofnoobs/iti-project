fetch("../components/navbar.html")
    .then((response) => response.text())
    .then((data) => {
        document.getElementById("navbar").innerHTML = data;
        try {
            document.getElementById('menuButton').addEventListener('click', function () {
                document.getElementById('sidebar').classList.add('active');
            });

            document.getElementById('close-sidebar').addEventListener('click', function () {
                document.getElementById('sidebar').classList.remove('active');
            });
        } catch (error) {
            console.error(error);
        }
    });