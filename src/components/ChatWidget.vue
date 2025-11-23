<template>
    <!-- Floating Button -->
    <div class="chat-button" @click="toggleChat">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
        <path d="M20 2H4C2.897 2 2 2.897 2 4v14c0 1.103.897 2 2 2h14l4 4V4c0-1.103-.897-2-2-2z"/>
      </svg>
      <span class="status-dot"></span>
    </div>
  
    <!-- Chat Box -->
    <div v-if="isOpen" class="chat-box">
      <div class="chat-header">
        <div>
          <strong>ShoTech</strong>
          <p>Nous vous répondrons dès que possible.</p>
        </div>
        <button class="close-btn" @click="toggleChat">✕</button>
      </div>
      <div class="chat-messages">
        <div class="message">Bonjour! Comment pouvons-nous vous aider?</div>
      </div>
      <div class="chat-input">
        <input type="text" placeholder="Écrire un message..." />
        <button>Envoyer</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const isOpen = ref(false)
  
  function toggleChat() {
    isOpen.value = !isOpen.value
  }
  </script>
  
  <style scoped>
  .chat-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #007bff;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }
  
  .status-dot {
    position: absolute;
    bottom: 5px;
    right: 5px;
    width: 12px;
    height: 12px;
    background: #28a745;
    border: 2px solid white;
    border-radius: 50%;
  }
  
  .chat-box {
    position: fixed;
    bottom: 90px;
    right: 20px;
    width: 300px;
    max-height: 400px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  .chat-header {
    background: #007bff;
    color: white;
    padding: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .chat-header p {
    font-size: 12px;
    margin: 2px 0 0 0;
  }
  
  .close-btn {
    background: transparent;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
  }
  
  .chat-messages {
    flex: 1;
    padding: 10px;
    overflow-y: auto;
    background: #f1f1f1;
  }
  
  .message {
    background: #e0e0e0;
    padding: 8px;
    margin-bottom: 8px;
    border-radius: 6px;
    font-size: 14px;
  }
  
  .chat-input {
    display: flex;
    border-top: 1px solid #ccc;
  }
  
  .chat-input input {
    flex: 1;
    border: none;
    padding: 8px;
    font-size: 14px;
  }
  
  .chat-input button {
    background: #007bff;
    color: white;
    border: none;
    padding: 0 16px;
    cursor: pointer;
  }

  .chat-button, .chat-box {
  position: fixed;  /* stays relative to the viewport, not parent */
  bottom: 20px;
  right: 20px;
  z-index: 9999;
}

  </style>
  