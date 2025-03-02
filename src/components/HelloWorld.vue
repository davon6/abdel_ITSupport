<script setup lang="ts">
import {/* ref,*/ onMounted } from 'vue'
import SupportForm from './SupportForm.vue' 

//const count = ref(0)

// Function to trigger animations on scroll
const handleScroll = () => {
  const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in')
  const triggerBottom = window.innerHeight * 0.85

  elements.forEach((el) => {
    const boxTop = (el as HTMLElement).getBoundingClientRect().top
    if (boxTop < triggerBottom) {
      el.classList.add('show')
    }
  })
}

// Attach scroll event when component mounts
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Run initially in case elements are already in view
})
</script>

<template>
  <header>
    <nav>
      <div class="logo">IT Support Hub</div>

   
      <ul class="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main>

    <!-- "What We Do" Section -->
    <section class="what-we-do">
      <h2>What We Do</h2>

      <!-- Block 1 -->
      <div class="info-block fade-in">
        <img src="\digitization.jpg" alt="Network Security">
        <div class="text">
          <h3>Network Security</h3>
          <p>We provide advanced security solutions to protect your network from cyber threats.</p>
        </div>
      </div>

      <!-- Block 2 -->
      <div class="info-block slide-in-left">
        <div class="text">
          <h3>IT Consulting</h3>
          <p>Our expert IT consultants help you optimize technology strategies for business growth.</p>
        </div>
        <img src="\global.jpg" alt="IT Consulting">
      </div>

      <!-- Block 3 -->
      <div class="info-block slide-in-right">
        <img src="\istockphoto.jpg" alt="Cloud Solutions">
        <div class="text">
          <h3>Cloud Solutions</h3>
          <p>Seamless cloud integration services to enhance collaboration and efficiency.</p>
        </div>
      </div>

      <!-- Block 4 -->
      <div class="info-block zoom-in">
        <div class="text">
          <h3>24/7 Tech Support</h3>
          <p>Round-the-clock technical support to resolve your issues quickly and efficiently.</p>
        </div>
        <img src="\world-wide-web.jpg" alt="24/7 Tech Support">
      </div>
    </section>
    <SupportForm />
<!--
    <section class="hero">
      <h1>Reliable IT Support Services</h1>
      <p>Expert solutions for all your tech needs, from troubleshooting to system optimization.</p>
    

    </section>
  -->
  
  </main>

  <footer>
    <p>© 2025 IT Support Hub. All rights reserved.</p>
  </footer>
</template>

<style scoped>
/* Basic Reset */
/* Basic Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: linear-gradient(to bottom right, #f4f4f9, #e1e9f0);  /* Light gradient with soft blue tones */
  color: #333;
  background-image: url('https://www.transparenttextures.com/patterns/asfalt.png');  /* Subtle texture */
  background-blend-mode: overlay;
  background-size: cover;
}

/* Navigation Bar */
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #0077cc;
  padding: 15px 30px;
  color: white;
}

nav .logo {
  font-size: 1.5rem;
  font-weight: bold;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 20px;
}

nav ul li a {
  text-decoration: none;
  color: white;
  font-weight: bold;
}

nav ul li a:hover {
  text-decoration: underline;
}

/* Hero Section */
.hero {
  text-align: center;
  padding: 80px 20px;
  background: url('https://source.unsplash.com/1600x900/?technology,computer') no-repeat center center/cover;
  color: white;
  background-position: center center;
  background-size: cover;
  padding: 50px 20px;

}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.hero .btn {
  background: #ff6600;
  border: none;
  padding: 10px 20px;
  font-size: 1.2rem;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

.hero .btn:hover {
  background: #cc5500;
}

/* "What We Do" Section */
.what-we-do {
  text-align: center;
  padding: 50px 20px;
}

.what-we-do h2 {
  font-size: 2rem;
  margin-bottom: 40px;
  color: #0077cc;
}

/* Info Blocks */
.info-block {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  max-width: 900px;
  margin: 40px auto;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease-out;
}

.info-block img {
  width: 45%;
  height: auto;
  border-radius: 10px;
}

.info-block .text {
  width: 50%;
  text-align: left;
}

.info-block h3 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 10px;
}

.info-block p {
  font-size: 1.1rem;
  color: #555;
}

/* Animation Effects */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
}

.slide-in-left {
  opacity: 0;
  transform: translateX(-50px);
}

.slide-in-right {
  opacity: 0;
  transform: translateX(50px);
}

.zoom-in {
  opacity: 0;
  transform: scale(0.8);
}

/* Show animation when scrolled */
.show {
  opacity: 1 !important;
  transform: translateX(0) translateY(0) scale(1) !important;
}

/* Footer */
footer {
  text-align: center;
  padding: 15px;
  background: #0077cc;
  color: white;
  margin-top: 20px;
}

html, body {
  width: 100%;
  overflow-x: hidden; /* Prevents sideways shifting */
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* For mobile screens */
@media (max-width: 600px) {
  body {
    padding: 10px;
  }

  .hero, .what-we-do {
    padding-top: 30px;
  }

  nav {
    flex-direction: column;  /* Stack the logo and nav links vertically */
    align-items: center;     /* Center the content */
    padding: 10px;           /* Add some space around */
  }

  nav .logo {
    font-size: 1.2rem;       /* Reduce font size for smaller screens */
    margin-bottom: 10px;     /* Add space below the logo */
  }

  nav ul {
    list-style: none;
    display: flex;
    flex-direction: column;  /* Stack links vertically */
    gap: 10px;               /* Space between the links */
    padding: 0;
    margin: 0;
  }

  nav ul li a {
    text-decoration: none;
    color: white;
    font-weight: bold;
    font-size: 1rem;         /* Adjust font size */
  }




/* For mobile screens (below 600px) */
@media (max-width: 600px) {
  nav {
    align-items: center;
    padding: 10px !important; /* Force padding */
  }

  nav .logo {
    font-size: 1.2rem !important;        /* Adjust font size */
    margin-bottom: 10px !important;      /* Space between logo and nav links */
  }

  nav ul {
    display: flex !important;
    flex-direction: row !important;      /* Keep navigation links in a row */
    gap: 15px !important;                /* Space between the navigation items */
    justify-content: center !important;  /* Center the nav items */
    margin-top: 10px !important;         /* Add some space above the nav links */
  }

  /* Adjust spacing for the support button */
  .hero .btn {
    margin-top: 10px !important;  /* Reduce the gap from content above */
  }

  /* Optional: Reduce margin between sections for mobile */
  .info-block {
    margin-bottom: 20px !important; /* Reduce gap between info blocks */
  }
}





}



</style>
