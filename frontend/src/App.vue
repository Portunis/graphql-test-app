<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppLayout from "@/layouts/ui/AppLayout.vue";
import { Toaster } from '@/components/ui/toast'

</script>

<template>
<AppLayout>
  <RouterView />
</AppLayout>
  <Toaster />
</template>

