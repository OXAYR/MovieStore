<template>
  <div class="ml-4 lg:ml-32">
    <h1 class="font-bold text-2xl sm:text-3xl text-left my-5 text-silver">
      Create A Movie
    </h1>
    <div class="my-5 flex flex-col items-center">
      <div
        class="max-w-md flex flex-wrap justify-between w-full bg-blue-100 rounded-lg shadow-md p-4 sm:p-6">
        <div class="mb-4 w-full">
          <label for="title" class="block text-sm font-bold text-silver"
            >Title</label
          >
          <input
            type="text"
            id="title"
            v-model="movie.name"
            class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            placeholder="Enter title" />
        </div>
        <div class="mb-4 w-full sm:w-1/2 pr-2">
          <label for="ticketCount" class="block text-sm font-bold text-silver"
            >Ticket Count</label
          >
          <input
            type="number"
            id="ticketCount"
            v-model="movie.ticketCount"
            class="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            placeholder="Enter ticket count" />
        </div>
        <div class="mb-4 w-full sm:w-1/2 pl-2">
          <label for="released_on" class="block text-sm font-bold text-silver"
            >Released On</label
          >
          <input
            type="date"
            id="released_on"
            v-model="movie.released_on"
            class="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
        </div>
        <p v-if="error.length" class="text-red-600 text-sm">{{ error }}</p>
        <button
          class="mt-4 w-full py-2 bg-lightBlue font-bold rounded-full text-white font-serif hover:bg-lightestBlue"
          @click="validate(movie)">
          Create
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import { ref } from "vue";

const store = useStore();

const movie = ref({
  name: "",
  released_on: new Date().getFullYear(),
});

let error = ref("");

const validate = (obj) => {
  if (obj.name !== "") {
    console.log("Data to create movie:", obj);
    store.dispatch("movies/createMovies", obj);
  } else {
    error = "Enter title or valid date";
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
