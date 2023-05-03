document.addEventListener('DOMContentLoaded', function() {
    var burgermenu = document.querySelector('.burgermenu');
    var mobNav = document.querySelector('.mob-nav');

    burgermenu.addEventListener('click', function() {
        mobNav.style.display = mobNav.style.display === 'none' ? 'block' : 'none';
        mobNav.style.color = '#f4bb71';
    });
});
