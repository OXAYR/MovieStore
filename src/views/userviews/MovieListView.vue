<template>
  <MovieList :movie="allMovies" @add-ticket="addToCart" />
</template>

<script setup>
import MovieList from "@/components/user/MovieList.vue";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";

const store = useStore();

const allMovies = computed(() => store.getters["movies/getMovies"]);

const addToCart = (movie) => {
  console.log("Adding in the cart------------>", movie);
  store.dispatch("cart/createCart", movie);
};

onMounted(() => {
  store.dispatch("movies/fetchMovies");
});
</script>
