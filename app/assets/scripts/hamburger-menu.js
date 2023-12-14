document.addEventListener('DOMContentLoaded', function () {
    var menuIcon = document.getElementById('menu-icon');
    var dropdownContainer = document.getElementById('dropdown-container');
    var overlay = document.getElementById('overlay');

    menuIcon.addEventListener('click', function () {
        if (dropdownContainer.style.display === 'block') {
            dropdownContainer.style.display = 'none';
            menuIcon.innerHTML = '&#9776;'; // Set the icon back to the hamburger
            overlay.style.display = 'none';
            document.body.classList.remove('overlay-open');
        } else {
            dropdownContainer.style.display = 'block';
            menuIcon.innerHTML = '&#10005;'; // Set the icon to an "X"
            overlay.style.display = 'block'; // Show the overlay
            document.body.classList.add('overlay-open');
        }
        window.addEventListener('resize', function () {
            if (window.innerWidth > 1090) {
                dropdownContainer.style.display = 'flex';
                menuIcon.innerHTML = '&#9776;';
                overlay.style.display = 'none'; // Unlocks screen if it is enlarged
            } else {
                dropdownContainer.style.display = 'none'; // Needs this or it will display flex even after close button is clicked and screen is enlarged and reduced again
            }
        });
    });
});