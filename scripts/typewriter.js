(function () {
    // Edit this list to change which titles cycle through.
    var words = ["AI Engineer", "Data Scientist", "Tech Instructor", "Problem Solver"];

    var typeSpeed = 75;      // ms per character while typing
    var deleteSpeed = 45;    // ms per character while deleting
    var holdTime = 1400;     // ms to pause on a fully-typed word
    var gapTime = 400;       // ms pause on an empty string before the next word

    var targets = document.querySelectorAll('.role-typewriter-text');
    if (!targets.length) return;

    // Respect users who've asked for reduced motion: just show the first word.
    var prefersReducedMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        targets.forEach(function (el) { el.textContent = words[0]; });
        return;
    }

    var wordIndex = 0;
    var charIndex = 0;
    var deleting = false;

    function setText(text) {
        targets.forEach(function (el) { el.textContent = text; });
    }

    function tick() {
        var currentWord = words[wordIndex];

        if (!deleting) {
            charIndex++;
            setText(currentWord.slice(0, charIndex));

            if (charIndex === currentWord.length) {
                deleting = true;
                setTimeout(tick, holdTime);
                return;
            }
            setTimeout(tick, typeSpeed);
        } else {
            charIndex--;
            setText(currentWord.slice(0, charIndex));

            if (charIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(tick, gapTime);
                return;
            }
            setTimeout(tick, deleteSpeed);
        }
    }

    tick();
})();
