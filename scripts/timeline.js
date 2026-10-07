(function () {
    var timeline = document.getElementById('timeline');
    var progress = document.getElementById('timelineProgress');
    if (!timeline || !progress) return;

    // Edit these stops to change the fill's color mix.
    var GRADIENT = 'linear-gradient(to bottom, #2f6fed, #14b887, #8b5cf6)';

    var dots = timeline.querySelectorAll('.timeline-dot');
    if (dots.length < 2) return; // nothing meaningful to animate

    var firstDot = dots[0];
    var spanHeight = 0;
    var ticking = false;

    // Each .exp entry gets its own dot that travels within that entry's own
    // bounds (top of its block to bottom of its block), independent of the
    // other entries — this is separate from the single long connecting line.
    var entries = [];
    timeline.querySelectorAll('.exp').forEach(function (exp) {
        var container = exp.querySelector('.timeline-contaner');
        var dot = exp.querySelector('.timeline-dot');
        if (container && dot) {
            entries.push({ container: container, dot: dot });
        }
    });

    function layout() {
        // Measure where the first dot's center sits, and where #timeline's
        // own bottom edge is, relative to #timeline's top. Doing this in px
        // (not %) means the fill starts exactly at the first dot — nothing
        // shows above it — and now runs all the way to the bottom of the
        // container itself, covering the full last entry's content.
        var timelineTop = timeline.getBoundingClientRect().top;
        var startY = firstDot.getBoundingClientRect().top + firstDot.offsetHeight / 2 - timelineTop;
        var endY = timeline.scrollHeight;
        spanHeight = endY - startY;

        progress.style.top = startY + 'px';
        progress.style.backgroundImage = GRADIENT;
        // Fixed px background-size anchors colors to position: as the bar
        // grows, it reveals more of one continuous gradient rather than
        // re-stretching the same colors to fit a shorter/taller bar.
        progress.style.backgroundSize = '100% ' + spanHeight + 'px';
    }

    function update() {
        var triggerLine = window.innerHeight * 0.5; // middle of the viewport
        var firstDotY = firstDot.getBoundingClientRect().top + firstDot.offsetHeight / 2;

        // The long connecting line.
        var progressed = triggerLine - firstDotY;
        progressed = Math.max(0, Math.min(progressed, spanHeight));
        progress.style.height = progressed + 'px';

        // Each entry's own dot, independently.
        entries.forEach(function (entry) {
            var rect = entry.container.getBoundingClientRect();
            var travel = Math.max(0, rect.height - entry.dot.offsetHeight);
            var local = rect.height > 0 ? (triggerLine - rect.top) / rect.height : 0;
            local = Math.max(0, Math.min(local, 1));
            entry.dot.style.top = (local * travel) + 'px';
        });

        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    }

    function onResize() {
        layout();
        update();
    }

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);

    layout();
    update(); // run once on load
})();
