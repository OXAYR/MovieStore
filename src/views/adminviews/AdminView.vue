<template>
  <div class="flex">
    <div class="lg:w-48">
      <SideBar />
    </div>
    <div class="flex-grow p-4 mt-10 lg:ml-32 md:ml-72">
      <router-view />
    </div>
  </div>
</template>
<script>
import SideBar from "@/layouts/SideBar.vue";
export default {
  name: "AdminView",
  components: {
    SideBar,
  },
};
</script>
