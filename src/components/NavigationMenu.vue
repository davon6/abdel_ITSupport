<template>
    <nav class="relative overflow-x-hidden">
      <ul class="nav-list">
        <li
          v-for="item in navigationLinks"
          :key="item.label"
          class="relative group"
          @mouseenter="openLabel = item.label; handleMouseEnter()"
          @mouseleave="handleMouseLeave"
        >
          <button class="nav-button">
            {{ item.label }}
          </button>
          <div v-if="item.children && openLabel === item.label" class="dropdown-menu flex gap-2">
            <ul>
              <li
                v-for="sub in item.children"
                :key="sub.label"
                class="mb-2 relative"
                @mouseenter="handleSubHover(sub.label)"
                @mouseleave="clearSubHover"
              >
                <template v-if="sub.children">
                  <button
                    class="text-black font-semibold hover:text-blue-600 transition-transform transform hover:scale-105 duration-300"
                    :data-label="sub.label"
                  >
                    {{ sub.label }}
                  </button>
                  <transition name="flyout">
  <teleport to="body">
    <div
      v-if="hoveredSub === sub.label"
      @mouseenter="handleSubHover(sub.label)"
      @mouseleave="clearSubHover"
      :style="teleportStyles(sub)"
      class="sub-sub-menu absolute z-20"
    >
      <ul class="w-64 p-4 rounded-lg bg-white shadow-md">
        <li v-for="link in sub.children" :key="link.anchor">
          <router-link
            :to="`${sub.basePath || ''}#${link.anchor}`"
            @click.prevent="handleAnchor(sub.basePath, link.anchor)"
            class="text-black hover:text-blue-500 transition"
          >
            {{ link.label }}
          </router-link>
        </li>
      </ul>
    </div>
  </teleport>
</transition>

                </template>
  
                <template v-else>
                  <router-link
                    :to="`${sub.basePath || ''}`"
                    class="text-black hover:text-blue-600 transition block mt-1"
                  >
                    {{ sub.label }}
                  </router-link>
                </template>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, nextTick } from 'vue'
  import type { CSSProperties } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { navigationLinks } from '../data/navigation'
  
  const submenuPos = ref({ top: 0, left: 0 })
  
  function teleportStyles(_sub: any): CSSProperties {
  const isMobile = window.innerWidth <= 768

  if (isMobile) {
    return {
      position: 'absolute',
      top: submenuPos.value.top + 'px',
      left: '10px', // pinned with margin
      right: '10px', // ensure it doesn't go beyond screen
      minWidth: 'calc(100vw - 20px)',
      background: 'white',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
      borderRadius: '0.5rem',
      zIndex: 9999,
    }
  }

  return {
    position: 'absolute',
    top: submenuPos.value.top + 'px',
    left: submenuPos.value.left + 'px',
    minWidth: '240px',
    background: 'white',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    borderRadius: '0.5rem',
    zIndex: 9999,
  }
}


  
  function updateSubmenuPosition(label: string) {
    nextTick(() => {
      const buttonEl = document.querySelector(`button[data-label="${label}"]`)
      console.log('submenu button element:', buttonEl)
      if (buttonEl) {
        const rect = buttonEl.getBoundingClientRect()
        submenuPos.value = {
          top: rect.top + window.scrollY,
          left: rect.right + window.scrollX + 10, // 10px spacing
        }
      }
    })
  }
  
  const hoveredSub = ref<string | null>(null)
  let hoverTimeout: ReturnType<typeof setTimeout> | null = null
  let closeTimeout: ReturnType<typeof setTimeout> | null = null
  
  function handleMouseEnter() {
    if (closeTimeout) clearTimeout(closeTimeout)
  }
  
  function handleSubHover(label: string) {
    if (hoverTimeout) clearTimeout(hoverTimeout)
    hoverTimeout = setTimeout(() => {
      hoveredSub.value = label
    }, 150)
  }
  
  function clearSubHover() {
    if (hoverTimeout) clearTimeout(hoverTimeout)
    hoverTimeout = setTimeout(() => {
      hoveredSub.value = null
    }, 150)
  }
  
  watch(() => hoveredSub.value, (newLabel) => {
    if (newLabel) {
      updateSubmenuPosition(newLabel)
    }
  })
  
  const router = useRouter()
  const route = useRoute()
  
  const openLabel = ref<string | null>(null)
  const activeSub = ref<string | null>(null)
  
  function handleAnchor(basePath: string | undefined, anchor: string) {
    const fullPath = `${basePath || ''}#${anchor}`
  
    if (route.path === basePath) {
      router.replace({ hash: '' }).then(() => {
        router.push({ hash: `#${anchor}` })
      })
    } else {
      router.push(fullPath)
    }
  
    openLabel.value = null
    activeSub.value = null
  }
  
  function handleMouseLeave() {
    if (closeTimeout) clearTimeout(closeTimeout)
    closeTimeout = setTimeout(() => {
      openLabel.value = null
      activeSub.value = null
    }, 300) // 300ms delay before closing
  }
  </script>

  <style scoped>
 .nav-list {
  display: flex;
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-button {
  background: transparent;
  border: none;
  cursor: pointer;
  font-weight: 500;
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
  padding: 0.5rem 1rem; /* tight but comfy */
  line-height: 1.2;
}


.nav-button:hover {
  color: #60a5fa; /* Tailwind blue-400 */
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  color: black;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  z-index: 10;
  min-width: 200px;
}

.dropdown-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-menu li {
  margin: 0;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
}

.sub-sub-menu {
  transform-origin: top left;
  
}


/* Color-specific submenu styles */
.sub-sub-menu.particulier {
  background-color: #f0f9ff;
  padding: 0.5rem;
  border-radius: 0.5rem;
}

.sub-sub-menu.professionnel {
  background-color: #fef9c3;
  padding: 0.5rem;
  border-radius: 0.5rem;
}

.nav-list {
  display: flex;
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative; /* <-- Important for anchoring dropdown */
}

.group {
  position: relative; /* <-- Ensure each nav item can be anchor for its dropdown */
}
.sub-sub-menu {
  position: absolute;
  top: 0;
  left: 100%;
  margin-left: 0.5rem;
  background: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  padding: 1rem;
  transform-origin: left top;
  animation: fly-right 0.25s ease;
  min-width: 240px;
}


.dropdown-menu > div:not(:last-child) {
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
}
.flyout-enter-active,
.flyout-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.flyout-enter-from,
.flyout-leave-to {
  opacity: 0;
  transform: translateX(-10px) scale(0.98);
}


.dropdown-menu {
  position: absolute;
  top: calc(100% + 2px); /* 2px gap max — minimal! */
 left: 0;
transform: none;
  transform-origin: top center;
  background: white;
  color: black;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.1);
  z-index: 10;
  min-width: 220px;

  animation: float-in 0.22s ease-out;
  animation-fill-mode: both;
  animation-delay: 50ms;
}

@keyframes float-in {
  0% {
    opacity: 0;
    transform: scaleY(0.5) scaleX(0.9) translateY(-10px);
  }
  60% {
    opacity: 1;
    transform: scaleY(1.05) scaleX(1.02) translateY(2px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
@keyframes fly-right {
  from {
    opacity: 0;
    transform: translateX(-10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

.dropdown-menu li > button:hover {
  background-color: #f0f4ff; /* soft blue background */
  color: #2563eb; /* Tailwind blue-600 */
  border-radius: 0.375rem;
  transition: all 0.2s ease;
}
.sub-sub-menu li a:hover {
  background-color: #e0f2fe; /* lighter blue tone */
  color: #1d4ed8; /* stronger blue text */
  border-radius: 0.375rem;
  padding-left: 0.5rem;
  transition: all 0.2s ease;
}
.sub-sub-menu:hover {
  background-color: #f9fafb; /* light gray background */
  transform: translateX(2px) scale(1.01);
  transition: all 0.2s ease;
}
.dropdown-menu:hover {
  background-color: #f8fafc; /* very soft hover background */
  transition: background-color 0.2s ease;
}
.dropdown-menu li:hover > button {
  font-weight: 600;
  background-color: #eff6ff;
}
.sub-sub-menu li {
  margin-bottom: 0.75rem;
}

.sub-sub-menu li a {
  display: block;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
}
.dropdown-menu li > button,
.sub-sub-menu li a {
  display: block;
  width: 100%;
}
@media (max-width: 768px) {
    .sub-sub-menu {
    position: static !important;
    left: auto !important;
    top: auto !important;
    width: 100% !important;
    margin-left: 0 !important;
    background: white;
    z-index: 9999;
    border-radius: 0.5rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    box-sizing: border-box !important;
  }

  .sub-sub-menu ul {
    width: 100%;
    padding: 0.5rem 1rem;
  }
  .dropdown-menu {
    width: 95vw !important;
    max-width: 95vw !important;
    min-width: 0 !important;
    padding: 1rem;
    box-sizing: border-box !important;
    position: static !important;
    margin: auto;
  }

  .nav-list {
    gap: 0;
  }

  .nav-button {
    text-align: left;
    width: 100%;
  }

  nav, .nav-list {
    overflow: visible !important;
  }
}


  </style>
  