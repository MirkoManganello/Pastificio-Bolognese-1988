/* Gino USA — Welcome offer popup (10% off first order)
   Shows once per visitor (localStorage), 6s after load. */
(function () {
    var KEY = 'ginoWelcomeSeen';
    try {
        if (localStorage.getItem(KEY)) return;
    } catch (e) {
        return; // storage unavailable: skip rather than nag on every view
    }

    function buildPopup() {
        var overlay = document.createElement('div');
        overlay.className = 'welcome-overlay';
        overlay.innerHTML =
            '<div class="welcome-modal" role="dialog" aria-modal="true" aria-labelledby="welcome-title">' +
            '  <button class="welcome-close" aria-label="Close">&times;</button>' +
            '  <span class="welcome-script">Benvenuto!</span>' +
            '  <h2 id="welcome-title">A Little Gift from Bologna</h2>' +
            '  <p>Get <strong>10% off your first order</strong> plus Gino’s weekly family recipes, straight from the pastificio.</p>' +
            '  <form class="welcome-form">' +
            '    <input type="email" required placeholder="Your email address" aria-label="Email address">' +
            '    <button type="submit" class="btn btn-primary">Claim 10% Off</button>' +
            '  </form>' +
            '  <p class="welcome-smallprint">No spam, just pasta. Unsubscribe anytime.</p>' +
            '  <div class="welcome-success" hidden>' +
            '    <p><strong>Grazie!</strong> Use code</p>' +
            '    <div class="welcome-code">WELCOME10</div>' +
            '    <p>at checkout for 10% off your first order.</p>' +
            '  </div>' +
            '</div>';

        function dismiss() {
            try { localStorage.setItem(KEY, '1'); } catch (e) {}
            overlay.classList.remove('welcome-overlay--visible');
            setTimeout(function () { overlay.remove(); }, 300);
            document.removeEventListener('keydown', onKey);
        }

        function onKey(e) {
            if (e.key === 'Escape') dismiss();
        }

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) dismiss();
        });
        overlay.querySelector('.welcome-close').addEventListener('click', dismiss);
        document.addEventListener('keydown', onKey);

        overlay.querySelector('.welcome-form').addEventListener('submit', function (e) {
            e.preventDefault();
            overlay.querySelector('.welcome-form').hidden = true;
            overlay.querySelector('.welcome-smallprint').hidden = true;
            overlay.querySelector('.welcome-success').hidden = false;
            try { localStorage.setItem(KEY, '1'); } catch (err) {}
        });

        document.body.appendChild(overlay);
        requestAnimationFrame(function () {
            overlay.classList.add('welcome-overlay--visible');
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            setTimeout(buildPopup, 6000);
        });
    } else {
        setTimeout(buildPopup, 6000);
    }
})();
