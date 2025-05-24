// 3D AC Animation (Three.js)
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, 350/300, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({canvas: document.getElementById('ac3d'), alpha: true, antialias: true});
renderer.setClearColor(0x000000, 0);
renderer.setSize(350, 300);

// AC Body (Box)
let acBodyGeometry = new THREE.BoxGeometry(2.5, 1, 1);
let acBodyMaterial = new THREE.MeshPhysicalMaterial({color: 0xe0eafc, metalness: 0.5, roughness: 0.2, clearcoat: 1, clearcoatRoughness: 0.1});
let acBody = new THREE.Mesh(acBodyGeometry, acBodyMaterial);
scene.add(acBody);

// AC Fan (Cylinder)
let fanGeometry = new THREE.CylinderGeometry(0.35, 0.35, 0.12, 32);
let fanMaterial = new THREE.MeshStandardMaterial({color: 0x005bea, metalness: 0.7, roughness: 0.3});
let fan = new THREE.Mesh(fanGeometry, fanMaterial);
fan.position.set(0.8, 0, 0.52);
fan.rotation.x = Math.PI/2;
scene.add(fan);

// AC Vents (Lines)
let ventMaterial = new THREE.LineBasicMaterial({color: 0x0099cc});
for(let i=-0.8; i<=0.8; i+=0.4){
  let ventGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i,-0.4,0.52), new THREE.Vector3(i,0.4,0.52)]);
  let vent = new THREE.Line(ventGeometry, ventMaterial);
  scene.add(vent);
}

// Lighting
let ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);
let pointLight = new THREE.PointLight(0xffffff, 0.7);
pointLight.position.set(5,5,5);
scene.add(pointLight);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  acBody.rotation.y += 0.004;
  fan.rotation.z += 0.2;
  renderer.render(scene, camera);
}
animate();

// Parallax effect for hero section
window.addEventListener('scroll', function() {
  const hero = document.querySelector('.parallax-bg');
  let offset = window.scrollY * 0.2;
  hero.style.backgroundPosition = `center ${offset}px`;
});

// Animated Stats Counter
function animateCounter(el, target) {
  let current = 0;
  let increment = Math.ceil(target / 60);
  let interval = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target;
      clearInterval(interval);
    } else {
      el.textContent = current;
    }
  }, 20);
}
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.stat-number').forEach(el => {
    animateCounter(el, parseInt(el.getAttribute('data-target')));
  });
});

// Animate service cards on scroll
function revealCards() {
  document.querySelectorAll('.card-anim').forEach(card => {
    const rect = card.getBoundingClientRect();
    if(rect.top < window.innerHeight - 40) {
      card.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealCards);
window.addEventListener('DOMContentLoaded', revealCards);

// WhatsApp Widget logic with typing animation
function toggleWAWidget() {
  const chatbox = document.getElementById('wa-chatbox');
  if(chatbox.style.display === 'flex') {
    chatbox.style.display = 'none';
  } else {
    chatbox.style.display = 'flex';
    waTyping();
  }
}
function openWAWidget() {
  document.getElementById('wa-chatbox').style.display = 'flex';
  waTyping();
  window.scrollTo({top: document.body.scrollHeight, behavior:'smooth'});
}
function closeWAWidget() {
  document.getElementById('wa-chatbox').style.display = 'none';
}
function waTyping() {
  const typing = document.getElementById('wa-typing');
  typing.innerHTML = '';
  let msg = "Hi! 👋<br>How can we help you today?";
  let i = 0;
  function type() {
    if(i < msg.length) {
      typing.innerHTML += msg[i] === '<' ? '<br>' : msg[i];
      i++;
      setTimeout(type, 40);
    }
  }
  type();
}
