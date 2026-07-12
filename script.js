// Тень/бордер навигации при скролле
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
});

// Мобильное меню
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);


// Лайтбокс для благодарностей
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
if (lightbox) {
  document.querySelectorAll('[data-lightbox]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      lightboxImg.src = a.getAttribute('href');
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
}

// Карусель благодарностей — стрелки
const gratitude = document.getElementById('gratitude');
const gratPrev = document.getElementById('gratitudePrev');
const gratNext = document.getElementById('gratitudeNext');
if (gratitude && gratPrev && gratNext) {
  const step = () => Math.max(gratitude.clientWidth * 0.8, 240);
  const updateNav = () => {
    const max = gratitude.scrollWidth - gratitude.clientWidth - 1;
    gratPrev.disabled = gratitude.scrollLeft <= 1;
    gratNext.disabled = gratitude.scrollLeft >= max;
  };
  gratPrev.addEventListener('click', () => gratitude.scrollBy({ left: -step(), behavior: 'smooth' }));
  gratNext.addEventListener('click', () => gratitude.scrollBy({ left: step(), behavior: 'smooth' }));
  gratitude.addEventListener('scroll', updateNav, { passive: true });
  window.addEventListener('resize', updateNav);
  updateNav();
}

// Модальное окно с описанием подходов
const approachModal = document.getElementById('approachModal');
if (approachModal) {
  const mIcon = document.getElementById('approachIcon');
  const mTitle = document.getElementById('approachTitle');
  const mBody = document.getElementById('approachBody');
  const mClose = document.getElementById('approachClose');

  const openApproach = (card) => {
    mIcon.textContent = card.querySelector('.card__icon').textContent;
    mTitle.textContent = card.querySelector('h3').textContent;
    mBody.innerHTML = card.querySelector('.approach__detail').innerHTML;
    approachModal.classList.add('open');
    approachModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const closeApproach = () => {
    approachModal.classList.remove('open');
    approachModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.approach').forEach(card => {
    card.addEventListener('click', () => openApproach(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openApproach(card); }
    });
  });
  mClose.addEventListener('click', closeApproach);
  approachModal.addEventListener('click', (e) => { if (e.target === approachModal) closeApproach(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeApproach(); });
}

// Плавное появление секций
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.section, .trust, .cta').forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity .7s ease, transform .7s ease';
  observer.observe(el);
});
