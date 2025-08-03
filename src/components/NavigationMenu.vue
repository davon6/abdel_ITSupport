<template>
    <nav class="relative overflow-x-hidden">
      <!-- ✅ Burger Icon -->
      <button v-if="isMobile" class="burger" @click="toggleBurger" aria-label="Open menu">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
</button>

  
      <!-- ✅ Desktop Nav -->
      <ul v-if="!isMobile" class="nav-list">
        <li
          v-for="item in navigationLinks"
          :key="item.label"
          class="relative group"
          @mouseenter="openLabel = item.label"
          @mouseleave="handleMouseLeave"
        >
          <button class="nav-button">{{ item.label }}</button>
  
          <div
            v-if="item.children && openLabel === item.label"
            class="dropdown-menu flex gap-2"
          >
            <ul>
              <li
                v-for="sub in item.children"
                :key="sub.label"
                class="mb-2 relative"
                @mouseenter="handleSubHover(`${item.label}__${sub.label}`)"
                @mouseleave="clearSubHover"
              >
                <template v-if="sub.children">
                  <button
                    class="text-black font-semibold hover:text-blue-600"
                    @mouseenter="handleSubHover(`${item.label}__${sub.label}`)"
                  >
                    {{ sub.label }}
                  </button>
  
                  <transition name="flyout">
                    <div
                      v-if="hoveredSub === `${item.label}__${sub.label}`"
                      @mouseenter="handleSubHover(`${item.label}__${sub.label}`)"
                      @mouseleave="clearSubHover"
                      class="sub-sub-menu"
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
                  </transition>
                </template>
  
                <template v-else>
                  <router-link
                    :to="sub.basePath || ''"
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
  
      <!-- ✅ Mobile Drawer (burgerOpen) -->
      <transition name="slide">
        <div v-if="burgerOpen && isMobile" class="mobile-drawer">
          <button class="close-btn" @click="toggleBurger">✕</button>
          <ul class="mobile-nav-list">
            <li v-for="item in navigationLinks" :key="item.label">
              <button class="mobile-main-link" @click="toggleMain(item.label)">
                {{ item.label }}
              </button>
  
              <!-- Submenu -->
              <ul v-if="openLabel === item.label && item.children">
                <li v-for="sub in item.children" :key="sub.label">
                  <template v-if="sub.children">
                    <button
                      class="mobile-sub-link"
                      @click="toggleSub(`${item.label}__${sub.label}`)"
                    >
                      {{ sub.label }}
                    </button>
  
                    <!-- Sub-submenu -->
                    <ul
                      v-if="hoveredSub === `${item.label}__${sub.label}`"
                      class="ml-4"
                    >
                      <li v-for="link in sub.children" :key="link.anchor">
                        <router-link
                          :to="`${sub.basePath || ''}#${link.anchor}`"
                          class="mobile-sub-sub-link"
                          @click.prevent="() => { handleAnchor(sub.basePath, link.anchor); toggleBurger(); }"
                        >
                          {{ link.label }}
                        </router-link>
                      </li>
                    </ul>
                  </template>
  
                  <template v-else>
                    <router-link
                      :to="sub.basePath || ''"
                      class="mobile-sub-link"
                      @click="toggleBurger"
                    >
                      {{ sub.label }}
                    </router-link>
                  </template>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </transition>
    </nav>
  </template>
  
  
  <script setup lang="ts">
  import { ref, watch, nextTick } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { navigationLinks } from '../data/navigation'
  
  const submenuPos = ref({ top: 0, left: 0 })

  const submenuButtons = new Map<string, HTMLElement>()
    const isMobile = ref(window.innerWidth <= 768)
  const offset = isMobile ? 0 : 10;

  
function updateSubmenuPosition(label: string) {
  nextTick(() => {
    const el = submenuButtons.get(label)
    if (el) {
      const rect = el.getBoundingClientRect()
      submenuPos.value = {
        top: rect.top + window.scrollY,
        left: rect.right + window.scrollX + offset
      }
    }
  })
}



  const hoveredSub = ref<string | null>(null)
  let hoverTimeout: ReturnType<typeof setTimeout> | null = null
  let closeTimeout: ReturnType<typeof setTimeout> | null = null
  

  
    function handleSubHover(label: string) {
  if (hoverTimeout) clearTimeout(hoverTimeout)
  hoverTimeout = setTimeout(() => {
    hoveredSub.value = label // ✅ Use passed-in label directly
  }, 150)
}

  
  function clearSubHover() {
    if (hoverTimeout) clearTimeout(hoverTimeout)
    hoverTimeout = setTimeout(() => {
      hoveredSub.value = null
    }, 150)
  }
  
  watch(() => hoveredSub.value, (newLabel) => {
  if (newLabel && !isMobile.value) {
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


  
  function toggleMain(label: string) {
  openLabel.value = openLabel.value === label ? null : label
}
window.addEventListener('resize', () => {
  isMobile.value = window.innerWidth <= 768
})

function toggleSub(label: string) {
  hoveredSub.value = hoveredSub.value === label ? null : label
}

const burgerOpen = ref(false)
const toggleBurger = () => {
  burgerOpen.value = !burgerOpen.value
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
  position: absolute;
  top: 0;
  left: 100%;
  margin-left: 0.5rem;
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
    .dropdown-menu {
    position: static !important;
    width: 100% !important;
    max-width: 100vw !important;
    box-sizing: border-box;
    overflow: visible;
    overflow-x: hidden;
    }
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
    overflow-x: hidden;
  }

  nav {
    max-width: 100vw;
    overflow-x: hidden;
  }


  .sub-sub-menu ul {
    width: 100%;
    padding: 0.5rem 1rem;
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
.burger {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  background: none;
  border: none;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.burger svg {
  width: 52px;
  height: 52px;
  stroke: white; /* or your brand color */
  transition: stroke 0.2s ease;
}

.burger:hover svg {
  stroke: #60a5fa; /* Tailwind blue-400 on hover */
}

.mobile-drawer {
  position: fixed;
  top: 0;
  right: 0; /* ✅ instead of left: 0 */
  left: auto;
  height: 100vh;
  width: 100vw;
  background: white;
  z-index: 999;
  overflow-y: auto;
  padding: 2rem 1.5rem;
  width: 80vw;
}

.close-btn {
  font-size: 2rem;
  background: none;
  border: none;
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: black;
}

.mobile-nav-list,
.mobile-nav-list ul {
  list-style: none;
  padding-left: 0;
  margin: 1rem 0;
  padding-left: 1rem;
  padding-right: 1rem;
}

.mobile-main-link,
.mobile-sub-link,
.mobile-sub-sub-link {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  font-size: 1rem;
  color: #1f2937; /* gray-800 */
  transition: background 0.2s ease;
}

.mobile-main-link:hover,
.mobile-sub-link:hover,
.mobile-sub-sub-link:hover {
  background: #f3f4f6; /* gray-100 */
}


.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease, opacity 0.2s ease;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

nav {
  position: fixed;
  top: 0;
  z-index: 999;
  background-color: #81a1e8; /* Tailwind gray-900 or your brand color */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%; /* ← This fixes the half-width issue */
  left: 0;   
  
}

/*Beautiful but breaks 

nav {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  background: #81a1e8; 
  mask-image: linear-gradient(to bottom, black 90%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 90%, transparent 100%);
  backdrop-filter: blur(6px); 
  -webkit-backdrop-filter: blur(6px);
}
*/

  </style>
  