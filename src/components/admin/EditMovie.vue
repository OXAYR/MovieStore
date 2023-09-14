<template>
  <div
    class="card px-4 py-6 mt-8 sm:mt-16 md:mt-32 max-w-full flex flex-col items-center bg-blue text-silver">
    <h2 class="font-bold text-center mb-4 text-xl">Edit Movie</h2>
    <div class="w-full max-w-md">
      <label class="block font-semibold mb-2">Title:</label>
      <input
        type="text"
        v-model="editedMovie.name"
        class="border border-gray-300 w-full px-3 py-2 mb-4" />
      <label class="block font-semibold mb-2">Released on:</label>
      <input
        type="date"
        id="released_on"
        v-model="editedMovie.released_on"
        class="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
      <button
        type="submit"
        @click="updateMovie"
        class="bg-lightBlue text-white px-4 py-2 mt-6 sm:mt-10 rounded hover:bg-lightBlue">
        Update Movie
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref } from "vue";

const store = useStore();
const router = useRouter();

const editedMovie = ref({
  name: "",
  released_on: new Date(),
});

const id = ref(router.currentRoute.value.params.id);

const updateMovie = async () => {
  console.log("Route params: ---->", id.value);
  console.log("Edited movie: ---->", editedMovie.value);
  var answer = confirm("Do you really want to update the movie");
  if (answer) {
    await store.dispatch("movies/updateMovie", {
      indx: id.value,
      updateMovie: editedMovie.value,
    });
    router.push("/admin");
  }
};
</script>
