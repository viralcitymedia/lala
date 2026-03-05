document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Animate hamburger to X
            const spans = mobileToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Modal Logic
    const exitModal = document.getElementById('exit-intent-modal');
    const delayModal = document.getElementById('delay-modal');
    const closeBtns = document.querySelectorAll('.modal-close');

    let popupShown = false;

    // 3. Delayed Free Estimate Popup (15 seconds)
    setTimeout(() => {
        if (!popupShown && delayModal) {
            showModal(delayModal);
            popupShown = true;
        }
    }, 15000);

    // 4. Exit Intent Popup
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY <= 0 && !popupShown && exitModal) {
            showModal(exitModal);
            popupShown = true;
        }
    });

    function showModal(modal) {
        if (modal) {
            modal.classList.add('active');
        }
    }

    closeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.modal-overlay').classList.remove('active');
        });
    });

    // Handle form submissions (prevent default for demo)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            btn.style.opacity = '0.8';

            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Request Sent!';
                btn.style.backgroundColor = '#10B981'; // Green success color
                form.reset();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.opacity = '1';
                }, 3000);
            }, 1000);
        });
    });
});
