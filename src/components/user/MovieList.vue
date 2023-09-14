<template>
  <div class="my-8 sm:my-16 md:my-32 text-silver">
    <h1 class="font-bold text-2xl sm:text-3xl text-left">Movies</h1>
    <ul
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      <li
        v-for="item in movie"
        :key="item.id"
        class="p-4 sm:p-7 bg-blue shadow-md rounded-lg flex flex-col justify-between group">
        <div class="items-center">
          <div class="text-lg font-semibold">{{ item.name }}</div>
          <p class="text-gray-500 text-sm line-clamp-2">
            {{ formatDate(item.released_on) }}
          </p>
        </div>
        <div>
          <img
            src="../../assets/Netflix.svg"
            alt="movieimage"
            class="ml-auto" />
        </div>

        <div
          class="mt-4 sm:mt-7 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            @click="addTicket(item)"
            class="border border-silver text-white hover:bg-silver hover:text-blue font-medium rounded p-2 m-2">
            Buy Ticket
          </button>
          <select
            v-model="ticketCount"
            class="border border-silver text-black rounded p-2 m-2">
            <option v-for="count in [1, 2, 3, 4, 5]" :key="count">
              {{ count }}
            </option>
          </select>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref, defineProps, defineEmits } from "vue";

defineProps({
  movie: Object,
});

const ticketCount = ref(1);
const emit = defineEmits(["add-ticket"]);
const addTicket = (obj) => {
  if (ticketCount.value < 0 || ticketCount.value > 5) {
    alert("The ticket count must be between 1-5");
  } else {
    const movie = { tickets: ticketCount.value, ...obj };
    console.log(movie);
    emit("add-ticket", movie);
  }
};

const formatDate = (dateString) => {
  if (dateString) {
    const date = new Date(dateString);
    return date.getFullYear();
  }
  return "";
};
</script>
