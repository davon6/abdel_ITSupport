<template>
    <section class="contact-section">
      <h2>Contactez-nous</h2>
      <form @submit.prevent="submitForm" novalidate>
        <label for="name">Nom</label>
        <input id="name" v-model="name" type="text" />
        <p v-if="errors.name" class="error">{{ errors.name }}</p>
  
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" />
        <p v-if="errors.email" class="error">{{ errors.email }}</p>
  
        <label for="message">Message</label>
        <textarea id="message" v-model="message"></textarea>
        <p v-if="errors.message" class="error">{{ errors.message }}</p>
  
        <button type="submit">Envoyer</button>
      </form>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const name = ref('')
  const email = ref('')
  const message = ref('')
  const errors = ref({})
  
  function validate() {
    errors.value = {}
    if (!name.value.trim()) errors.value.name = 'Le nom est requis.'
    if (!email.value.trim()) {
      errors.value.email = 'L’email est requis.'
    } else if (!/\S+@\S+\.\S+/.test(email.value)) {
      errors.value.email = 'L’email est invalide.'
    }
    if (!message.value.trim()) errors.value.message = 'Le message est requis.'
    return Object.keys(errors.value).length === 0
  }
  
  function submitForm() {
    if (!validate()) return
    alert(`Merci, ${name.value}! Votre message a été envoyé.`)
    name.value = ''
    email.value = ''
    message.value = ''
  }
  </script>
  
  <style scoped>
  .contact-section {
    max-width: 480px;
    margin: 3rem auto;
    padding: 2rem;
    background: #f9faff;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
    font-family: 'Open Sans', sans-serif;
  }
  
  .contact-section h2 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #003366;
  }
  
  label {
    display: block;
    margin-bottom: 0.4rem;
    font-weight: 600;
    color: #003366;
  }
  
  input,
  textarea {
    width: 100%;
    padding: 0.8rem 1rem;
    margin-bottom: 1rem;
    border: 1.8px solid #d0d7e0;
    border-radius: 6px;
    font-size: 1rem;
    font-family: inherit;
    transition: border-color 0.3s;
  }
  
  input:focus,
  textarea:focus {
    border-color: #005bbb;
    outline: none;
    box-shadow: 0 0 5px #005bbb66;
  }
  
  textarea {
    min-height: 120px;
    resize: vertical;
  }
  
  .error {
    color: #d93025;
    font-size: 0.875rem;
    margin-top: -0.8rem;
    margin-bottom: 1rem;
  }
  
  button {
    width: 100%;
    padding: 1rem;
    background-color: #005bbb;
    color: white;
    font-size: 1.1rem;
    font-weight: 700;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #004299;
  }
  </style>
  