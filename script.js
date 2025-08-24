// script.js
const logo = document.querySelector('.logo');
const text = logo.textContent;
logo.innerHTML = ''; // clear original text

text.split('').forEach((char, i) => {
  const span = document.createElement('span');
  span.textContent = (char === ' ') ? '\u00A0' : char; // keep spaces
  span.style.animationDelay = `${i * 0.1}s`; // auto delay
  logo.appendChild(span);
});


function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");

  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 100;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", revealOnScroll);

// 👇 Run once immediately when the page loads
window.addEventListener("load", revealOnScroll);

// Typing effect
const typingElement = document.querySelector(".typing");
const phrases = ["Frontend Developer", "Designer", "Problem Solver"];
let phraseIndex = 0;
let letterIndex = 0;
let currentPhrase = [];
let isDeleting = false;
let isEnd = false;

function loopTyping() {
  isEnd = false;
  typingElement.innerHTML = currentPhrase.join("");

  if (phraseIndex < phrases.length) {

    if (!isDeleting && letterIndex <= phrases[phraseIndex].length) {
      currentPhrase.push(phrases[phraseIndex][letterIndex]);
      letterIndex++;
      typingElement.innerHTML = currentPhrase.join("");
    }

    if (isDeleting && letterIndex <= phrases[phraseIndex].length) {
      currentPhrase.pop();
      letterIndex--;
      typingElement.innerHTML = currentPhrase.join("");
    }

    if (letterIndex == phrases[phraseIndex].length) {
      isEnd = true;
      isDeleting = true;
    }

    if (isDeleting && letterIndex === 0) {
      currentPhrase = [];
      isDeleting = false;
      phraseIndex++;
      if (phraseIndex === phrases.length) {
        phraseIndex = 0;
      }
    }
  }
  const speedUp = Math.random() * (80 - 50) + 50;
  const normalSpeed = Math.random() * (200 - 100) + 100;
  const time = isEnd ? 1500 : isDeleting ? speedUp : normalSpeed;
  setTimeout(loopTyping, time);
}

loopTyping();


// ===== CONTACT FORM HANDLING =====
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
      showMessage("⚠️ Please fill in all fields.", "error");
      return;
    }

    if (!emailRegex.test(email)) {
      showMessage("❌ Please enter a valid email address.", "error");
      return;
    }

    // Simulate success
    showMessage("✅ Message sent successfully!", "success");

    // Reset form
    form.reset();
  });

  function showMessage(msg, type) {
    formMessage.textContent = msg;
    formMessage.className = `form-message ${type}`;

    if (type === "success") {
      formMessage.style.color = "gold";
      formMessage.style.textShadow = "0 0 10px rgba(255, 215, 0, 0.9)";
    } else {
      formMessage.style.color = "red";
      formMessage.style.textShadow = "0 0 5px rgba(255,0,0,0.7)";
    }

    // Animate message fade-in/out
    formMessage.style.opacity = 1;
    setTimeout(() => {
      formMessage.style.opacity = 0;
    }, 4000);
  }
});

// ===== MOBILE NAVBAR TOGGLE =====
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});



