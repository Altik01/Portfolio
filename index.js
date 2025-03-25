$(document).ready(function(){
    let navi = $(".navi");
    let bars = $(".header-bars"); 

    bars.click(function(){
        navi.toggleClass("open"); 
    });
});

 // Анимация при скролле
 document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeInUp 0.8s forwards ${entry.target.dataset.delay || '0s'}`;
            }
        });
    }, { threshold: 0.1 });
    
    projectCards.forEach((card, index) => {
        card.dataset.delay = `${index * 0.15}s`;
        observer.observe(card);
    });
});

  // Обработка формы
  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Здесь можно добавить AJAX отправку формы
    alert('Сообщение отправлено! Я свяжусь с вами в ближайшее время.');
    this.reset();
});

// Анимация при скролле
document.addEventListener('DOMContentLoaded', function() {
    const contactItems = document.querySelectorAll('.info-item, .form-group');
    
    contactItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `all 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100);
    });
});

// Создаем контейнер
const container = document.createElement('div');
document.body.appendChild(container);
container.style.position = 'fixed';
container.style.top = '0';
container.style.left = '0';
container.style.width = '100vw';
container.style.height = '100vh';
container.style.zIndex = '-1';
container.style.overflow = 'hidden';

// Класс частицы
class Particle {
  constructor() {
    this.size = Math.random() * 5 + 1;
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.color = `rgba(255, ${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 30)}, 0.8)`;
    
    this.element = document.createElement('div');
    this.element.style.position = 'absolute';
    this.element.style.width = `${this.size}px`;
    this.element.style.height = `${this.size}px`;
    this.element.style.borderRadius = '50%';
    this.element.style.backgroundColor = this.color;
    this.element.style.boxShadow = `0 0 ${this.size * 2}px ${this.color}`;
    container.appendChild(this.element);
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    
    // Гравитация к центру
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const dx = centerX - this.x;
    const dy = centerY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 0) {
      this.speedX += dx / distance * 0.01;
      this.speedX *= 0.99; // Сопротивление
      this.speedY += dy / distance * 0.01;
      this.speedY *= 0.99;
    }
    
    // Отталкивание от курсора
    if (mouseX && mouseY) {
      const mouseDx = this.x - mouseX;
      const mouseDy = this.y - mouseY;
      const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
      
      if (mouseDist < 100) {
        this.speedX += mouseDx / mouseDist * 0.2;
        this.speedY += mouseDy / mouseDist * 0.2;
      }
    }
    
    // Границы
    if (this.x < 0 || this.x > window.innerWidth) this.speedX *= -1;
    if (this.y < 0 || this.y > window.innerHeight) this.speedY *= -1;
    
    this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }
}

// Создаем частицы
const particles = [];
let mouseX = null, mouseY = null;

for (let i = 0; i < 100; i++) {
  particles.push(new Particle());
}

// Анимация
function animate() {
  particles.forEach(p => p.update());
  requestAnimationFrame(animate);
}

animate();

// Взаимодействие с мышью
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Ресайз
window.addEventListener('resize', () => {
  container.style.width = window.innerWidth + 'px';
  container.style.height = window.innerHeight + 'px';
});
