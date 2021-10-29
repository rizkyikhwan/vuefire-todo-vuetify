<template>
  <v-app>
    <v-main>
      <transition name="toast">
        <Toast v-if="showToast" />
      </transition>
      <ToDoList @badValue="triggerToast" />
    </v-main>
  </v-app>
</template>

<script>
import ToDoList from "./components/ToDoList.vue";
import Toast from "./components/Toast.vue";

export default {
  name: "App",
  components: {
    ToDoList,
    Toast,
  },

  data() {
    return {
      showToast: false,
    };
  },
  methods: {
    triggerToast() {
      this.showToast = true;
      setTimeout(() => (this.showToast = false), 3000);
    },
  },
};
</script>

<style>
#app {
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)),
    url(./assets/images/bg.png);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  font-family: 'Nunito', sans-serif;
  overflow: hidden;
}

.toast-enter-active {
  animation: wobble 0.5s ease;
}

.toast-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}

.toast-leave-active {
  transition: all 0.3s ease;
}

@keyframes wobble {
  0% { transform: translateY(-60px); opacity: 0}
  50% { transform: translateY(0px); opacity: 1}
  60% { transform: translateX(8px)}
  70% { transform: translateX(-8px)}
  80% { transform: translateX(4px)}
  90% { transform: translateX(-4px)}
  100% { transform: translateX(0px)}
}
</style>
