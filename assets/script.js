/* ==========================================================================
   Win Win Chit — Portfolio Scripts
   ========================================================================== */

$(document).ready(function () {
    // ----- Loader -----
    setTimeout(function () {
        $('#loader').addClass('hidden');
    }, 900);
    setTimeout(function () {
        $('#loader').remove();
    }, 1500);

    // ----- Typing effect -----
    const words = ["Web Developer", "Laravel Developer", "React Developer", "Vue Developer"];
    const typed = $('#typed');
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {
        const word = words[wordIndex];
        const current = word.substring(0, charIndex);
        typed.text(current);
        if (!deleting && charIndex < word.length) {
            charIndex++;
            setTimeout(type, 120);
        } else if (deleting && charIndex > 0) {
            charIndex--;
            setTimeout(type, 60);
        } else {
            deleting = !deleting;
            if (!deleting) wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 1200);
        }
    }
    type();

    // ----- Topbar scroll state -----
    const topbar = $('#topbar');
    const scrollTopBtn = $('#scroll-top');
    const heroDesc = $('.hero-desc');

    $(window).on('scroll', function () {
        const y = $(window).scrollTop();
        topbar.toggleClass('scrolled', y > 20);
        scrollTopBtn.toggleClass('show', y > 400);

        // navbar active state
        let current = 'home';
        $('section').each(function () {
            if (y >= $(this).offset().top - 120) {
                current = $(this).attr('id');
            }
        });
        $('.nav-link').removeClass('active');
        $(`.nav-link[data-section="${current}"]`).addClass('active');
        $('.drawer-link').removeClass('active');
        $(`.drawer-link[data-section="${current}"]`).addClass('active');
    });

    // ----- Scroll top -----
    scrollTopBtn.on('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ----- Mobile drawer -----
    const drawer = $('#drawer');
    const backdrop = $('#drawer-backdrop');

    $('#menu-toggle').on('click', function () {
        drawer.addClass('open');
        backdrop.addClass('show');
        $('body').css('overflow', 'hidden');
    });

    $('#drawer-close, #drawer-backdrop').on('click', function () {
        drawer.removeClass('open');
        backdrop.removeClass('show');
        $('body').css('overflow', '');
    });

    $('.drawer-link').on('click', function () {
        drawer.removeClass('open');
        backdrop.removeClass('show');
        $('body').css('overflow', '');
    });

    // ----- Reveal on scroll -----
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $(entry.target).addClass('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    $('.reveal').each(function () {
        revealObserver.observe(this);
    });

    // ----- Footer year -----
    $('#year').text(new Date().getFullYear());
});
