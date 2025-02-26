<script setup lang="ts">
import {ref} from "vue";

const emit = defineEmits(['setNickname'])

const inputNickname = ref('');


const submitNickname = () => {
  if (inputNickname.value.trim()) {
    emit('setNickname', inputNickname.value.trim());
  }
};
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <h2>Введите ваш ник:</h2>
      <input
        v-model="inputNickname"
        @keyup.enter="submitNickname"
        type="text"
        placeholder="Ваш ник"
      />
      <button @click="submitNickname">Войти</button>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}
input {
  padding: 10px;
  margin: 10px 0;
  font-size: 16px;
  width: 80%;
}
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
