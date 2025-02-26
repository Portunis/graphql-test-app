<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable';
import {ref} from "vue";
import {gql} from "@apollo/client/core";

const CREATE_BOOKING = gql`
  mutation ($user: String!, $date: String!, $time: String!, $location: String!) {
    createBooking(user: $user, date: $date, time: $time, location: $location) {
      id
      user
      date
      time
      location
    }
  }
`;

const { mutate: createBooking } = useMutation(CREATE_BOOKING);


const user = ref('')
const date = ref('')
const time = ref('')
const location = ref('')

const addBooking = async () => {
  try {
   await createBooking({
        user: user.value,
        date: date.value,
        time: time.value,
        location: location.value,
    });
    user.value = '';
    date.value = '';
    time.value = '';
    location.value = '';

  } catch (error) {
    console.error('Error:', error);
  }
};
</script>

<template>
  <div class="booking-form-container">
    <h2>Добавить бронь</h2>
    <a-form @submit.prevent="addBooking">
      <a-form-item >
        <a-input v-model:value="user" type="text" placeholder="Введите имя" required />
      </a-form-item>

      <a-form-item >
        <a-date-picker v-model:value="date" placeholder="Выберите дату" style="width: 100%" required />
      </a-form-item>

      <a-form-item >
        <a-time-picker v-model:value="time" placeholder="Выберите время" style="width: 100%" required />
      </a-form-item>

      <a-form-item >
        <a-select
          ref="select"
          v-model:value="location"
          placeholder="Выберите отель"
        >
          <a-select-option value="Отель X (Город A)" >Отель X (Город A)</a-select-option>
          <a-select-option value="Отель Плаза (Город N)">Отель Плаза (Город N)</a-select-option>
          <a-select-option value="Lumen Show(Город N)">Lumen Show(Город N)</a-select-option>
          <a-select-option value="Zola City(Город N)">Zola City(Город N)</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 100%">Добавить</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
.booking-form-container {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
h2 {
  color: #000
}
</style>
