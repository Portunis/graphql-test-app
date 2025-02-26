<script setup lang="ts">
import {useQuery } from '@vue/apollo-composable';
import {type IBookings} from '@/typescript/interfaces/IBooking.ts';
import {gql} from "@apollo/client/core";


const FRAGMENT_BOOKING = gql`
  fragment FragmentBooking on Booking {
      id
      user
      date
      time
      location
  }

`

const GET_BOOKINGS = gql`
  query {
    firstBooking: getBookings {
      ...FragmentBooking
    },
    user: getBookingById(id: 1) {
      id
      user
    },
    userBookings: getBookingsById(user: "Bob") {
      ...FragmentBooking
    }
  }

  ${FRAGMENT_BOOKING}
`;

const { result, loading, error } = useQuery<{ getBookings: IBookings[] }>(GET_BOOKINGS);


</script>

<template>
  <div class="bookings-list-container">
    <h1>Список брони всех</h1>

    <a-spin v-if="loading" size="large" tip="Loading..." />

    <a-alert v-if="error" type="error" message="Error fetching bookings!" />

    <a-list
      v-if="!loading && result?.firstBooking"
      item-layout="horizontal"
      bordered
      :data-source="result?.firstBooking"
    >
      <template #renderItem="{ item }">
        <a-list-item :key="item.id">
          <a-list-item-meta
            :title="item.user"
            :description="`${item.date} at ${item.time} (${item?.location})`"
          />
        </a-list-item>
      </template>
    </a-list>
    <h2>Список брони пользователя {{ result?.user.user}}</h2>
    <a-list
      v-if="!loading && result?.userBookings"
      item-layout="horizontal"
      bordered
      :data-source="result?.userBookings"
    >
      <template #renderItem="{ item }">
        <a-list-item :key="item.id">
          <a-list-item-meta
            :title="item.user"
            :description="`${item.date} at ${item.time} (${item?.location})`"
          />
        </a-list-item>
      </template>
    </a-list>

  </div>
</template>

<style scoped>
.bookings-list-container {
  width: 1360px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
h1 {
  color: #000
}
h2 {
  padding: 40px 0;
  color: #000;
}
</style>
