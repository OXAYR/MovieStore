<template>
  <div>
    <Nav />
    <div class="mt-40 px-24">
      <router-view />
    </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";

export default {
  name: "UserLayout",
  components: {
    Nav,
  },
};
</script>
