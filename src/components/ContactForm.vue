<template>
    <div class="contact-form-container">
      <h2 class="title">Saisissez vos informations</h2>
      <p v-if="error" class="error">{{ error }}</p>
      <form @submit.prevent="submitForm" class="form">
        <div class="input-row">
  <div class="input-group">
    <input type="text" v-model="form.nom" placeholder="Prenom" />
  </div>

  <div class="input-group">
    <input
      type="email"
      v-model="form.email"
      placeholder="Email"
      :class="{ invalid: form.email && !isValidEmail(form.email) }"
    />
  </div>

  <div class="input-group">
    <input type="tel" v-model="form.tel" placeholder="Téléphone" />
  </div>
</div>

  
        <div class="input-group">
          <textarea v-model="form.message" placeholder="Écrivez votre message"></textarea>
        </div>
  
        <button
  type="submit"
  class="submit-btn"
  :disabled="!isFormValid"
>
  Envoyer
</button>

      </form>
    </div>
  </template>
  
  <script lang="ts" setup>
import { reactive, ref, computed } from 'vue'

const form = reactive({
  nom: '',
  email: '',
  tel: '',
  message: ''
})

const error = ref('')

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Live computed validation
const isFormValid = computed(() => {
  return (
    form.nom.trim() !== '' &&
    form.email.trim() !== '' &&
    isValidEmail(form.email) &&
    form.tel.trim() !== '' &&
    form.message.trim() !== ''
  )
})

const submitForm = () => {
  if (!isFormValid.value) {
    error.value = 'Veuillez corriger les champs du formulaire.'
    return
  }

  error.value = ''
  alert(`Formulaire envoyé !\n\n${JSON.stringify(form, null, 2)}`)

  // Clear the form
  Object.keys(form).forEach((key) => {
    form[key as keyof typeof form] = ''
  })
}





 
  </script>
  
  <style scoped>
  .contact-form-container {
    padding: 2rem;
    max-width: 900px;
    margin: auto;
    background-color: transparent;
    font-family: sans-serif;
  }
  
  .title {
    font-size: 1.8rem;
    font-weight: 500;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  .form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .input-row {
    display: flex;
    gap: 1rem;
  }
  
  .input-group {
    flex: 1;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
  /* Add this breakpoint */
@media (max-width: 768px) {
  .input-row {
    flex-direction: column;
  }
}
  label {
    font-size: 0.9rem;
    margin-bottom: 0.3rem;
    color: #333;
  }
  
  input,
  textarea {
    border: none;
    outline: none;
    background: transparent;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding: 0.4rem 0;
    font-size: 1rem;
    transition: border-color 0.3s;
  }
  
  input::placeholder,
  textarea::placeholder {
    color: rgba(0, 0, 0, 0.3);
  }
  
  input:focus,
  textarea:focus {
    border-bottom-color: rgba(0, 0, 0, 0.6);
  }
  
  textarea {
    min-height: 100px;
    resize: vertical;
  }
  
  .submit-btn {
  align-self: center;
  background: transparent;
  border: none;
  font-size: 1rem;
  padding: 0.5rem 1.5rem;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  position: relative;
}
  
  .submit-btn::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s;
  }
  
/* Hover effect */
.submit-btn:hover {
  color: #c0392b; /* reddish */
}
  
.submit-btn:hover::after {
  background-color: rgba(192, 57, 43, 0.7); /* darker red line */
}
  .error {
  color: red;
  text-align: center;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}
.invalid {
  border-bottom-color: rgba(255, 0, 0, 0.6) !important;
}
.submit-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}


input::placeholder,
textarea::placeholder {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;

  color: rgba(0, 0, 0, 0.3);

}


input,
textarea {
  color: white; /* user-typed text */
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
}

input::placeholder,
textarea::placeholder {
  color: rgba(255, 255, 255, 0.6); /* softer white */
}

input:focus,
textarea:focus {
  border-bottom-color: rgba(255, 255, 255, 0.9);
}
.title {
  color: white;
}

.submit-btn {
  color: white;
}

.submit-btn::after {
  background-color: rgba(255, 255, 255, 0.3);
}

.submit-btn:hover {
  color: #ffdddd;
}

.submit-btn:hover::after {
  background-color: rgba(255, 200, 200, 0.7);
}



/* Default (white/dark theme) */
.contact-form-container input,
.contact-form-container textarea {
  color: white;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
}

.contact-form-container input::placeholder,
.contact-form-container textarea::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.contact-form-container input:focus,
.contact-form-container textarea:focus {
  border-bottom-color: rgba(255, 255, 255, 0.9);
}

.contact-form-container .title {
  color: white;
}

.contact-form-container .submit-btn {
  color: white;
}

.contact-form-container .submit-btn::after {
  background-color: rgba(255, 255, 255, 0.3);
}

.contact-form-container .submit-btn:hover {
  color: #ffdddd;
}

.contact-form-container .submit-btn:hover::after {
  background-color: rgba(255, 200, 200, 0.7);
}

/* Special/light theme overrides */
.contact-form-container.special input,
.contact-form-container.special textarea {
  color: black;
  border-bottom: 1px solid rgba(0,0,0,0.2);
}

.contact-form-container.special input::placeholder,
.contact-form-container.special textarea::placeholder {
  color: rgba(0,0,0,0.3);
}

.contact-form-container.special input:focus,
.contact-form-container.special textarea:focus {
  border-bottom-color: rgba(0,0,0,0.6);
}

.contact-form-container.special .title {
  color: black;
}

.contact-form-container.special .submit-btn {
  color: black;
}

.contact-form-container.special .submit-btn::after {
  background-color: rgba(0,0,0,0.2);
}

.contact-form-container.special .submit-btn:hover {
  color: #c0392b;
}

.contact-form-container.special .submit-btn:hover::after {
  background-color: rgba(192, 57, 43, 0.7);
}

  </style>
  