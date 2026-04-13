/* ================================================================
   I Do! Weddings & Occasions — Main Script
   ================================================================ */

// ---------- Preloader ----------
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
  }, 800);
});

// ---------- Custom Cursor ----------
const cursorDot = document.getElementById('cursorDot');
if (window.matchMedia('(hover: hover)').matches) {
  document.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX - 4 + 'px';
    cursorDot.style.top = e.clientY - 4 + 'px';
    cursorDot.style.opacity = '1';
  });
}

// ---------- Header Scroll ----------
const header = document.getElementById('header');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 80);
  lastScroll = y;
});

// ---------- Active Nav Link ----------
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link');
const observerNav = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[data-section="${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.3 });
sections.forEach(s => observerNav.observe(s));

// ---------- Mobile Menu ----------
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ---------- Hero Slider ----------
const heroSlides = document.querySelectorAll('.hero-slide');
const sliderDots = document.querySelectorAll('.slider-dot');
const progressBar = document.getElementById('sliderProgress');
let currentSlide = 0;
let slideTimer;
const SLIDE_DURATION = 5000;
let slideStart;

function goToSlide(index) {
  heroSlides.forEach(s => s.classList.remove('active'));
  sliderDots.forEach(d => d.classList.remove('active'));
  currentSlide = index;
  heroSlides[currentSlide].classList.add('active');
  sliderDots[currentSlide].classList.add('active');
  slideStart = Date.now();
}

function nextSlide() {
  goToSlide((currentSlide + 1) % heroSlides.length);
}

function startSlider() {
  slideStart = Date.now();
  slideTimer = setInterval(nextSlide, SLIDE_DURATION);
  animateProgress();
}

function animateProgress() {
  if (!progressBar) return;
  function step() {
    const elapsed = Date.now() - slideStart;
    const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
    progressBar.style.width = pct + '%';
    if (pct < 100) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

sliderDots.forEach(dot => {
  dot.addEventListener('click', () => {
    clearInterval(slideTimer);
    goToSlide(parseInt(dot.dataset.slide));
    startSlider();
  });
});

startSlider();

// ---------- Reveal on Scroll ----------
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, parseFloat(delay) * 1000);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => revealObserver.observe(el));

// ---------- Stat Counter ----------
const statNums = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      let current = 0;
      const duration = 2000;
      const step = target / (duration / 16);
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.floor(current);
      }, 16);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(el => counterObserver.observe(el));

// ---------- Portfolio Filter ----------
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    portfolioItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.classList.remove('hidden');
        item.style.animation = 'fadeInUp 0.5s ease forwards';
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// ---------- Testimonials ----------
const testimonials = document.querySelectorAll('.testimonial');
const tDots = document.querySelectorAll('.t-dot');
const tPrev = document.getElementById('tPrev');
const tNext = document.getElementById('tNext');
let currentT = 0;
let tInterval;

function goToTestimonial(index) {
  testimonials.forEach(t => t.classList.remove('active'));
  tDots.forEach(d => d.classList.remove('active'));
  currentT = index;
  testimonials[currentT].classList.add('active');
  tDots[currentT].classList.add('active');
}

function nextTestimonial() {
  goToTestimonial((currentT + 1) % testimonials.length);
}

function prevTestimonial() {
  goToTestimonial((currentT - 1 + testimonials.length) % testimonials.length);
}

function startTSlider() {
  tInterval = setInterval(nextTestimonial, 6000);
}

tNext.addEventListener('click', () => {
  clearInterval(tInterval);
  nextTestimonial();
  startTSlider();
});

tPrev.addEventListener('click', () => {
  clearInterval(tInterval);
  prevTestimonial();
  startTSlider();
});

tDots.forEach(dot => {
  dot.addEventListener('click', () => {
    clearInterval(tInterval);
    goToTestimonial(parseInt(dot.dataset.t));
    startTSlider();
  });
});

startTSlider();

// ---------- Booking Form ----------
const bookingForm = document.getElementById('bookingForm');
const formSuccess = document.getElementById('formSuccess');

bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btnText = bookingForm.querySelector('.btn-text');
  const btnLoader = bookingForm.querySelector('.btn-loader');
  btnText.style.display = 'none';
  btnLoader.style.display = 'inline';

  setTimeout(() => {
    bookingForm.style.display = 'none';
    formSuccess.classList.add('show');
  }, 1500);
});

function resetForm() {
  bookingForm.reset();
  bookingForm.style.display = 'block';
  formSuccess.classList.remove('show');
  const btnText = bookingForm.querySelector('.btn-text');
  const btnLoader = bookingForm.querySelector('.btn-loader');
  btnText.style.display = 'inline';
  btnLoader.style.display = 'none';
}

// ---------- Back to Top ----------
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 600);
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---------- Smooth Scroll ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---------- Calendar Widget ----------
(function() {
  const grid = document.getElementById('calGrid');
  const monthLabel = document.getElementById('calMonth');
  const prevBtn = document.getElementById('calPrev');
  const nextBtn = document.getElementById('calNext');
  const hiddenInput = document.getElementById('wdate');
  const selectedLabel = document.getElementById('calSelected');

  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const today = new Date();
  let viewYear = today.getFullYear();
  let viewMonth = today.getMonth();
  let selectedDate = null;

  function render() {
    monthLabel.textContent = months[viewMonth] + ' ' + viewYear;
    grid.innerHTML = '';

    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const daysInPrev = new Date(viewYear, viewMonth, 0).getDate();

    // Previous month trailing days
    for (let i = firstDay - 1; i >= 0; i--) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cal-day other-month disabled';
      btn.textContent = daysInPrev - i;
      grid.appendChild(btn);
    }

    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cal-day';
      btn.textContent = d;

      const date = new Date(viewYear, viewMonth, d);
      const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const isSunday = date.getDay() === 0;

      if (isPast || isSunday) {
        btn.classList.add('disabled');
      } else {
        btn.addEventListener('click', () => selectDate(date, btn));
      }

      if (d === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
        btn.classList.add('today');
      }

      if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
        btn.classList.add('selected');
      }

      grid.appendChild(btn);
    }

    // Next month leading days
    const totalCells = grid.children.length;
    const remaining = 42 - totalCells;
    for (let i = 1; i <= remaining; i++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cal-day other-month disabled';
      btn.textContent = i;
      grid.appendChild(btn);
    }
  }

  function selectDate(date, btn) {
    selectedDate = date;
    grid.querySelectorAll('.cal-day').forEach(d => d.classList.remove('selected'));
    btn.classList.add('selected');

    const formatted = date.toISOString().split('T')[0];
    hiddenInput.value = formatted;

    const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    selectedLabel.textContent = dayNames[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
  }

  prevBtn.addEventListener('click', () => {
    viewMonth--;
    if (viewMonth < 0) { viewMonth = 11; viewYear--; }
    render();
  });

  nextBtn.addEventListener('click', () => {
    viewMonth++;
    if (viewMonth > 11) { viewMonth = 0; viewYear++; }
    render();
  });

  render();
})();

// ---------- Fade In Up keyframe (for portfolio filter) ----------
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
