<template>
  <div class="card bg-blue text-silver w-fit h-80 mr-44 mt-10">
    <router-link to>
      <div class="flex flex-col h-full">
        <div class="flex justify-between items-center mb-4 px-4 py-2">
          <h1 class="font-bold text-3xl">Users</h1>
          <button class="bg-lightBlue rounded-xl px-3 py-2 text-white">
            See All
          </button>
        </div>
        <div class="overflow-y-auto p-4">
          <Users />
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import Users from "@/components/admin/Users.vue";
export default {
  name: "UserView",
  components: {
    Users,
  },
};
</script>
