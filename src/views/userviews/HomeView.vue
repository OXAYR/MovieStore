<template>
  <div>
    <Nav />
    <div class="mt-40 px-24">
      <router-view />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import Nav from "@/layouts/Nav.vue";

export default {
  name: "HomeView",
  components: {
    Nav,
  },
};
</script>
