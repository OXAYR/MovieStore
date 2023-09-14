<template>
  <div class="bg-navblue p-4 text-left my-4 rounded lg:ml-32">
    <h1 class="text-2xl sm:text-3xl font-bold text-silver">
      Welcome Back, Admin
    </h1>
    <p class="text-sm font-medium text-silver">
      Here you can create, edit, and delete movies
    </p>
  </div>

  <div class="flex flex-col lg:flex-row justify-between sm:items-start my-4">
    <CreateMovie class="mb-4 sm:mr-4" />

    <div class="hidden md:block ml-80">
      <UserView class="mb-4" />
    </div>
  </div>

  <div class="w-full overflow-x-auto">
    <AdminMovieListView />
  </div>
</template>

<script>
import CreateMovie from "@/components/admin/CreateMovie.vue";
import AdminMovieListView from "./AdminMovieListView.vue";
import UserView from "./UserView.vue";
export default {
  name: "DashBoardView",
  components: {
    CreateMovie,
    AdminMovieListView,
    UserView,
  },
};
</script>
