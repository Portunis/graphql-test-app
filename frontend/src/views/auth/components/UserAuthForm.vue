<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Label } from '@/components/ui/label'
import { ref } from 'vue'

import { Loader } from 'lucide-vue-next';

const { toast } = useToast()

const isLoading = ref(false)
import { useMutation } from '@vue/apollo-composable'
import {useToast} from "@/components/ui/toast";

import { useRouter} from "vue-router";
import {FORM_MUTATION} from "@/views/auth/data/AuthFragment.ts";

const router = useRouter()
const email = ref('')
const password = ref('')

const { mutate: login } = useMutation(FORM_MUTATION)

async function onSubmit(event: Event) {
  event.preventDefault()
  isLoading.value = true

  try {
    const response = await login({ email: email.value, password: password.value })
    if (response?.data.login.email) {
      toast({
        title: 'Авторизация',
        description: `Вы успешно вошли в аккаунт ${response.data.login.email}`,
      });

      await router.push('/')

      email.value = '';
      password.value = '';
    }

  } catch (error) {
    toast({
      title: 'Авторизация',
      description: `${error}`,
      variant: 'destructive',
    });
  } finally {
    isLoading.value = false
  }
  }
</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit">
      <div class="grid gap-2">
        <div class="grid gap-1">
          <Label class="sr-only" for="email">
            Email
          </Label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            auto-capitalize="none"
            auto-complete="email"
            auto-correct="off"
            :disabled="isLoading"
            v-model="email"
          />
        </div>
        <div class="grid gap-1">
          <Label class="sr-only" for="password">
            Пароль
          </Label>
          <Input
            id="password"
            placeholder="*********"
            type="password"
            auto-capitalize="none"
            auto-correct="off"
            :disabled="isLoading"
            v-model="password"
          />
        </div>
        <Button :disabled="isLoading">
          <Loader v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
          Авторизация
        </Button>
      </div>
    </form>
  </div>
</template>
