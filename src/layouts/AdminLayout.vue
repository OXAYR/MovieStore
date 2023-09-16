<template>
  <div class="flex flex-col lg:flex-row">
    <div class="lg:w-48">
      <SideBar />
    </div>
    <div class="flex-grow p-4 mt-10 lg:ml-4 xl:ml-24">
      <router-view />
    </div>
  </div>
</template>
<script>
import SideBar from "@/components/SideBar.vue";
export default {
  name: "AdminLayout",
  components: {
    SideBar,
  },
};
</script>
