<template>
    <div
      class="radial-nav-container"
      @mousedown="startPress"
      @mouseup="cancelPress"
      @mouseleave="cancelPress"
      @click.self="showMenu = false"
    >
      <div
        v-if="showMenu"
        class="radial-menu"
        :style="{ top: `${position.y}px`, left: `${position.x}px` }"
      >
        <div
          v-for="(item, index) in navItems"
          :key="index"
          class="menu-item"
          :style="getItemStyle(index, navItems.length)"
          @click="selectItem(item)"
        >
          {{ item.label }}
        </div>
      </div>
      <slot />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const showMenu = ref(false);
  const position = ref({ x: 0, y: 0 });
  const pressTimer = ref(null);
  
  const navItems = [
    { label: 'Home', action: '/' },
    { label: 'Profile', action: '/profile' },
    { label: 'Upload', action: '/upload' },
    { label: 'Logout', action: '/logout' },
  ];
  
  const startPress = (event) => {
    if (event.button !== 0) return; // Only left click
    pressTimer.value = setTimeout(() => {
      showMenu.value = true;
      position.value = { x: event.clientX, y: event.clientY };
    }, 500); // long press threshold (ms)
  };
  
  const cancelPress = () => {
    clearTimeout(pressTimer.value);
  };
  
  const getItemStyle = (index, total) => {
    const angle = (2 * Math.PI * index) / total;
    const radius = 80;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return {
      transform: `translate(${x}px, ${y}px)`,
    };
  };
  
  const selectItem = (item) => {
    console.log('Selected:', item.action);
    showMenu.value = false;
    router.push(item.action);
  };
  </script>
  
  <style scoped>
  .radial-nav-container {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  .radial-menu {
    position: absolute;
    width: 0;
    height: 0;
    pointer-events: none;
  }
  
  .menu-item {
    position: absolute;
    width: 80px;
    height: 80px;
    background: #007bff;
    color: white;
    border-radius: 50%;
    text-align: center;
    line-height: 80px;
    pointer-events: all;
    user-select: none;
    transition: all 0.3s ease;
    cursor: pointer;
  }
  </style>
  