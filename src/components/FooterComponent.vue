<template>


    <footer class="footer">


    


      <div class="footer-left">
        <p>© 2025 Shotech. All rights reserved.</p>
        <nav class="footer-links">
          <a href="#" aria-label="Mentions légales">Mentions légales</a>
          <a href="#" aria-label="Politique en matière de cookies">Politique en matière de cookies</a>
          <a href="#" aria-label="Politique de confidentialité">Politique de confidentialité</a>
          <a href="#" aria-label="Conditions d'utilisation">Conditions d'utilisation</a>
        </nav>
      </div>
  
      <div class="footer-right">
        <a href="https://www.facebook.com" target="_blank" rel="noopener" aria-label="Facebook" class="social-icon">
          <!-- Facebook SVG -->
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.675 0h-21.35C.594 0 0 .594 0 1.325v21.351C0 23.406.594 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.588l-.467 3.622h-3.121V24h6.116C23.406 24 24 23.406 24 22.676V1.325C24 .594 23.406 0 22.675 0z"/>
          </svg>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener" aria-label="Twitter" class="social-icon">
          <!-- Twitter SVG -->
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.95.564-2.005.974-3.127 1.195-.897-.959-2.178-1.559-3.594-1.559-2.72 0-4.924 2.204-4.924 4.924 0 .39.045.765.127 1.124-4.09-.205-7.719-2.165-10.148-5.144-.423.722-.666 1.561-.666 2.457 0 1.69.861 3.182 2.17 4.054-.799-.025-1.55-.245-2.204-.612v.061c0 2.364 1.68 4.338 3.907 4.783-.41.111-.843.171-1.288.171-.316 0-.624-.03-.927-.086.625 1.956 2.444 3.377 4.6 3.417-1.68 1.317-3.8 2.103-6.102 2.103-.396 0-.787-.023-1.175-.068 2.179 1.397 4.768 2.212 7.548 2.212 9.056 0 14.01-7.505 14.01-14.01 0-.213-.004-.425-.014-.636.962-.695 1.797-1.562 2.457-2.549z"/>
          </svg>
        </a>
        <a href="https://x.com" target="_blank" rel="noopener" aria-label="X (Twitter)" class="social-icon">
          <!-- X logo simplified SVG -->
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.364 5.636a1 1 0 0 0-1.414 0L12 10.586 7.05 5.636a1 1 0 0 0-1.414 1.414L10.586 12l-4.95 4.95a1 1 0 1 0 1.414 1.414L12 13.414l4.95 4.95a1 1 0 0 0 1.414-1.414L13.414 12l4.95-4.95a1 1 0 0 0 0-1.414z"/>
          </svg>
        </a>
      </div>
    </footer>
  </template>
  
  <script lang="ts" setup>
  
  // No specific logic for now
  </script>
  
  <style scoped>
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #0077cc;
    color: white;
    padding: 20px;
    flex-wrap: wrap;
    font-family: Arial, sans-serif;
  }
  
  .footer-left {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 200px;
  }
  
  .footer-left p {
    margin: 0;
  }
  
  .footer-links {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
  }
  
  .footer-links a {
    color: white;
    text-decoration: underline;
    font-size: 0.9rem;
    cursor: pointer;
    transition: color 0.3s ease;
  }
  
  .footer-links a:hover {
    color: #cceeff;
  }
  
  .footer-right {
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-width: 40px;
  }
  
  .social-icon {
    display: inline-flex;
    width: 24px;
    height: 24px;
    color: white;
    transition: color 0.3s ease;
  }
  
  .social-icon:hover {
    color: #cceeff;
  }
  
  @media (max-width: 600px) {
    .footer {
      flex-direction: column;
      align-items: center;
    }
  
    .footer-left {
      align-items: center;
    }
  
    .footer-links {
      justify-content: center;
    }
  
    .footer-right {
      flex-direction: row;
      margin-top: 10px;
      gap: 20px;
    }
  }
  </style>
  