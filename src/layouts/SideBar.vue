<template>
  <div>
    <div class="fixed top-4 left-4 z-50">
      <button
        @click="toggleSidebar"
        class="block text-silver text-3xl cursor-pointer focus:outline-none lg:hidden">
        &#9776;
      </button>
    </div>

    <div
      :class="{
        'translate-x-0': isSidebarOpen,
        '-translate-x-full': !isSidebarOpen,
      }"
      class="fixed top-0 left-0 h-screen w-72 p-4 bg-bluenew transition-transform transform ease-in-out duration-300 lg:translate-x-0">
      <div class="mt-10">
        <router-link to="/" class="mb-4">
          <p class="font-semibold text-3xl text-silver">MovieMesh</p>
        </router-link>
      </div>
      <div id="sideBar" class="mt-24">
        <router-link
          to="/admin"
          class="mb-7 text-silver block rounded-xl py-3 px-12 font-bold text-xl"
          >Dashboard</router-link
        >
        <router-link
          to="/admin/AdminMovieListView"
          class="mb-7 text-silver rounded-xl py-3 px-12 block font-bold text-xl"
          >Movies</router-link
        >
        <router-link
          to="/admin/users"
          class="mb-2 text-silver rounded-xl py-3 px-12 block font-bold text-xl"
          >Users</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      isSidebarOpen: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
  },
};
</script>
