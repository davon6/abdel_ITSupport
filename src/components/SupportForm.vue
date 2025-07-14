<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  isOpen: Boolean
});

const emit = defineEmits(['close', 'submitted']);

const submitForm = () => {
  alert('Form submitted (mock) 🎉');
  emit('submitted');
};
</script>

<template>
  <transition name="fade">
    <div v-if="isOpen" class="modal-overlay" @click="$emit('close')">
      <transition name="slide">
        <div class="modal-content" @click.stop>
          <h2>Get Support</h2>

          <form @submit.prevent="submitForm">
            <!-- form fields -->

            <label for="name">Name</label>
            <input type="text" id="name" placeholder="Your Name" required />

            <label for="contact">Contact</label>
            <input type="email" id="contact" placeholder="Your Email" required />

            <label for="company">Company</label>
            <input type="text" id="company" placeholder="Your Company" />

            <label for="service">Select Service</label>
            <select id="service" required>
              <option value="" disabled selected>Select an option</option>
              <option>IT Support</option>
              <option>Quote</option>
              <option>Infrastructure Query</option>
              <option>Big Data & Analytics</option>
            </select>

            <label for="message">Message</label>
            <textarea id="message" placeholder="Describe your issue..." required></textarea>

            <button type="submit" class="btn submit-btn">Submit</button>
            <button type="button" class="btn close-btn" @click="$emit('close')">Close</button>
          </form>
        </div>
      </transition>
    </div>
  </transition>
</template>


<style scoped>
/* Button */
.btn {
  background: #ff6600;
  border: none;
  padding: 10px 20px;
  font-size: 1.2rem;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

.btn:hover {
  background: #cc5500;
}

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden;
}

/* Modal Content (Perfectly Centered) */
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;

  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 95%;
  max-width: 700px; 
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter-from, .slide-leave-to {
  transform: translateY(20px);
}

/* Form Styling */
form {
  display: flex;
  flex-direction: column;
}

label {
  text-align: left;
  margin: 10px 0 5px;
  font-weight: bold;
}

input, select, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

textarea {
  height: 100px;
  resize: vertical;
}

/* Buttons */
.submit-btn {
  margin-top: 15px;
  background: #0077cc;
}

.submit-btn:hover {
  background: #005fa3;
}

.close-btn {
  background: #ccc;
  margin-top: 10px;
}

.close-btn:hover {
  background: #999;
}

input, select, textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box; /* Add this line */
}

.modal-content {
  width: 95%;
  max-width: 500px;
  padding: 20px;
  box-sizing: border-box; /* Ensures padding doesn't push elements out of bounds */
}

/* Modern CTA Badge */
.cta-badge {
  display: inline-block;
  background: linear-gradient(135deg, #0077cc, #00aaff);
  color: #fff;
  padding: 14px 30px;
  border-radius: 50px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 119, 204, 0.3);
}

.cta-badge:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 18px rgba(0, 119, 204, 0.4);
}

</style>
