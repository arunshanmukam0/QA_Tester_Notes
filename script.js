/* ── Hamburger / Nav ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Close nav when a link is clicked on mobile
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

/* ── Navbar scroll shadow ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 10
    ? '0 2px 20px rgba(0,0,0,0.5)'
    : 'none';
}, { passive: true });

/* ── Category Tabs ── */
const tabs   = document.querySelectorAll('.cat-tab');
const groups = document.querySelectorAll('.tutorial-group');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Deactivate all
    tabs.forEach(t => t.classList.remove('active'));
    groups.forEach(g => g.classList.remove('active'));

    // Activate clicked
    tab.classList.add('active');
    const target = document.getElementById(tab.dataset.target);
    if (target) target.classList.add('active');

    // Scroll to tutorials section
    document.getElementById('tutorials').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ── Accordion ── */
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.closest('.accordion-item');
    const isOpen = item.classList.contains('open');

    // Close all within the same accordion
    const siblings = item.closest('.accordion').querySelectorAll('.accordion-item');
    siblings.forEach(sib => sib.classList.remove('open'));

    // Toggle current
    if (!isOpen) item.classList.add('open');
  });
});

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => {
        link.style.color = '';
        link.style.background = '';
      });
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) {
        active.style.color = 'var(--accent)';
        active.style.background = 'rgba(88,166,255,0.1)';
      }
    }
  });
}, { threshold: 0.25 });

sections.forEach(s => observer.observe(s));

/* ── Open first accordion item by default in each group ── */
document.querySelectorAll('.tutorial-group').forEach(group => {
  const firstItem = group.querySelector('.accordion-item');
  if (firstItem) firstItem.classList.add('open');
});
