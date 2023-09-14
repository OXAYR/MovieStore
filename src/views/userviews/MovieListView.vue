<template>
  <MovieList :movie="allMovies" @add-ticket="addToCart" />
</template>

<script setup>
import MovieList from "@/components/user/MovieList.vue";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";

const store = useStore();

const allMovies = computed(() => store.getters["movies/getMovies"]);

const fetchMovies = store.dispatch("movies/fetchMovies");
const createCart = store.dispatch("cart/createCart");

const addToCart = (movie) => {
  createCart(movie);
};

onMounted(() => {
  fetchMovies;
});
</script>
