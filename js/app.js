const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Close nav when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
        });
    });
}

const stickyNav = () => {
    const header = document.querySelector('header');
    const nav = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
            nav.style.padding = '15px 50px';
        } else {
            nav.style.background = 'rgba(10, 10, 10, 0.8)';
            nav.style.padding = '20px 50px';
        }
    });
}

// Invoke functions
navSlide();
stickyNav();

// Highlight active link based on current URL
// (This is redundant if "active" class is hardcoded in HTML, but good for scalability)
const highlightActiveLink = () => {
    const currentLocation = location.href;
    const menuItem = document.querySelectorAll('.nav-links li a');
    const menuLength = menuItem.length;
    for (let i = 0; i < menuLength; i++) {
        if (menuItem[i].href === currentLocation) {
            menuItem[i].classList.add("active");
        }
    }
}
// highlightActiveLink(); // Disabled as we manually set it in HTML for this static site

// Smooth scrolling only for internal hash links if any exist
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Only prevent default if it's strictly a hash link on the same page
        if (this.getAttribute('href').startsWith("#")) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});


// Contact Form Handler (AJAX)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'ENVOI EN COURS...';
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);

        fetch("https://formsubmit.co/ajax/hydrex.contact1@gmail.com", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success === "true" || data.success === true) {
                    window.location.href = "merci.html";
                } else {
                    alert("Une erreur est survenue. Merci de réessayer.");
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Une erreur est survenue. Vérifiez votre connexion.");
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
    });
}
