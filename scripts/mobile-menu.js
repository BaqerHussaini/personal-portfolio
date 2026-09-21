(function () {
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('sidebarOverlay');
    var openBtn = document.getElementById('menuToggle');
    var closeBtn = document.getElementById('sidebarClose');

    if (!sidebar || !overlay || !openBtn || !closeBtn) return;

    function openMenu() {
        sidebar.classList.add('open');
        overlay.classList.add('visible');
        document.body.classList.add('menu-open');
        openBtn.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
        sidebar.classList.remove('open');
        overlay.classList.remove('visible');
        document.body.classList.remove('menu-open');
        openBtn.setAttribute('aria-expanded', 'false');
    }

    openBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
    });

    // Close the drawer after tapping a nav or social link
    sidebar.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });
})();