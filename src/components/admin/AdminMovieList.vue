<template>
  <div class="ml-4 my-10 lg:ml-32">
    <h1 class="font-bold text-silver text-2xl sm:text-3xl text-left">Movies</h1>
    <ul
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6"
      v-if="movie">
      <li
        v-for="item in movie"
        :key="item.id"
        class="p-4 bg-blue shadow-md rounded-lg flex flex-col justify-between">
        <div>
          <img
            src="../../assets/Netflix.svg"
            alt="movieimage"
            class="mx-auto" />
        </div>
        <div class="mt-4 flex flex-col justify-between items-center">
          <div class="text-lg text-silver font-semibold">{{ item.name }}</div>
          <p class="text-silver">{{ formatDate(item.released_on) }}</p>
          <div class="mt-2 flex justify-center sm:justify-between">
            <button
              @click="deleteMovie(item.id)"
              class="border border-red text-red hover:bg-red hover:text-white font-medium rounded p-1 m-1 sm:m-3">
              Delete
            </button>
            <button
              @click="editMovie(item.id)"
              class="border border-white text-white hover:bg-white hover:text-blue font-medium rounded p-1 m-1 sm:m-3">
              Edit
            </button>
          </div>
        </div>
      </li>
    </ul>
    <div v-else class="flex flex-col items-center justify-center text-center">
      <div>
        <img
          src="../../assets/undraw_no_data_re_kwbl.svg"
          alt="no products"
          class="max-w-full h-auto max-h-48 mx-auto drop-shadow-lg" />
      </div>
      <p class="font-semibold mt-2">No Movies Available</p>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { defineProps, defineEmits } from "vue";
defineProps({
  movie: Object,
});

const router = useRouter();

const editMovie = (index) => {
  console.log(" in the parent edit movie ", index);
  router.push({ path: `/edit/${index}` });
};

const emit = defineEmits(["delete-movie"]);

const deleteMovie = (index) => {
  var answer = confirm("Do you really want to delete the movie?");
  if (answer) {
    console.log("in the delete component", index);
    emit("delete-movie", index);
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
