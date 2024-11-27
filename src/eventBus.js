import { ref } from "vue";

export const eventBus = ref({
  emit(event, data) {
    if (this[event]) {
      this[event].forEach((callback) => callback(data));
    }
  },
  on(event, callback) {
    if (!this[event]) {
      this[event] = [];
    }
    this[event].push(callback);
  },
  off(event, callback) {
    if (this[event]) {
      this[event] = this[event].filter((cb) => cb !== callback);
    }
  },
});
