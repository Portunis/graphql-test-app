<template>
  <div class="game">
    <Modal v-if="!nickname" @setNickname="handleSetNickname" />


    <GameCanvas v-else :nickname="nickname" />
  </div>
</template>
<script setup lang="ts">
import Modal from '../components/Modal.vue';
import GameCanvas from '../components/GameCanvas.vue';
import {ref} from "vue";

const nickname = ref<string | null>(null);

const handleSetNickname = (name: string) => {
  nickname.value = name;
};

</script>
<style>
</style>
