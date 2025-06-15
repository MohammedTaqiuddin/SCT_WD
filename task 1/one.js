const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section');

const options = {
  threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navbar.className = ''; // Reset
      navbar.id = 'navbar';  // Ensure ID remains
      switch (id) {
        case 'home':
          navbar.classList.add('nav-light');
          break;
        case 'features':
          navbar.classList.add('nav-blue');
          break;
        case 'about':
          navbar.classList.add('nav-green');
          break;
        case 'contact':
          navbar.classList.add('nav-dark');
          break;
      }
    }
  });
}, options);

// Observe all sections
sections.forEach(section => observer.observe(section));
