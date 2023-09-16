<template>
  <AdminMovieList
    :movie="allMovies"
    :users="user"
    @delete-movie="deleteMovies" />
</template>

<script setup>
import AdminMovieList from "@/components/admin/AdminMovieList.vue";
import { useStore } from "vuex";
import { onMounted, computed, watchEffect } from "vue";

const store = useStore();

const allMovies = computed(() => store.getters["movies/getMovies"]);
const user = computed(() => store.getters["user/getUser"]);

const deleteMovies = (index) => {
  store.dispatch("movies/deleteMovie", index);
};

watchEffect(() => {
  console.log("in the watcheffect----->", allMovies.value);
});

onMounted(() => {
  store.dispatch("movies/fetchMovies");
});
</script>
