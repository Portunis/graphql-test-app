<script setup lang="ts">
import BookingList from "@/components/BookingList.vue";
import AddBooking from "@/components/AddBooking.vue";
</script>

<template>
  <main>
    <div class="main">
      <BookingList />
      <AddBooking />
    </div>
  </main>
</template>

<style scoped >
.main {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 50px;
}
</style>
