document.addEventListener('DOMContentLoaded', function() {
    // Dark mode toggle with system preference sync and localStorage
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = `<i class="fas fa-moon"></i>`;
    darkModeToggle.className = 'theme-toggle';
    document.querySelector('header').prepend(darkModeToggle);

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        darkModeToggle.innerHTML = savedTheme === 'dark' ? 
            `<i class="fas fa-sun"></i>` : 
            `<i class="fas fa-moon"></i>`;
    }

    // Handle theme toggle click
    darkModeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        darkModeToggle.innerHTML = newTheme === 'dark' ? 
            `<i class="fas fa-sun"></i>` : 
            `<i class="fas fa-moon"></i>`;
    });

    // Add data-section attribute to skills section and handle hover effects
    const skillsSection = Array.from(document.querySelectorAll('h2')).find(h2 => 
        h2.textContent.includes('Skills')
    );

    if (skillsSection) {
        const skillsContainer = skillsSection.parentElement;
        skillsContainer.setAttribute('data-section', 'skills');
        const skills = skillsContainer.querySelectorAll('ul li');
        
        skills.forEach(skill => {
            skill.addEventListener('mouseenter', () => {
                skill.classList.add('highlight');
            });
            skill.addEventListener('mouseleave', () => {
                skill.classList.remove('highlight');
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Typing effect for role description with cursor
    const role = document.querySelector('.role');
    const text = role.textContent;
    role.textContent = '';
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    role.appendChild(cursor);
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            cursor.classList.add('typing');
            const char = document.createTextNode(text.charAt(i));
            role.insertBefore(char, cursor);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            cursor.classList.remove('typing');
        }
    };
    typeWriter();

    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section > *').forEach((el) => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Interactive social links
    document.querySelectorAll('.social-links a').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.querySelector('i').classList.add('fa-bounce');
        });
        link.addEventListener('mouseleave', function() {
            this.querySelector('i').classList.remove('fa-bounce');
        });
    });
});
