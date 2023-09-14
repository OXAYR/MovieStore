<template>
  <div class="min-h-screen flex justify-center items-center">
    <div class="bg-white p-8 rounded shadow-md w-96">
      <h1 class="text-2xl font-semibold mb-4">Account Settings</h1>

      <div class="mb-4">
        <label class="block font-semibold mb-2">Name:</label>
        <input class="bg-grey p-2 rounded w-full text-center" v-model="name" />
      </div>

      <div class="mb-4">
        <label class="block font-semibold mb-2">Email:</label>
        <p class="bg-grey p-2 rounded">{{ email }}</p>
      </div>
      <div class="mb-4">
        <label class="block font-semibold mb-2">New Password</label>
        <input
          class="bg-grey p-2 rounded text-center w-full"
          v-model="newPassword" />
      </div>

      <button
        @click="updateUser(indx)"
        class="bg-blue text-white px-4 py-2 rounded hover:bg-blue-600 mr-2">
        Update
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

const store = useStore();
const router = useRouter();
const route = useRoute();

const newPassword = ref("");
const name = ref("");
const email = ref("");
const userId = computed(() => route.params.userId);

const updateUser = async () => {
  console.log("In the update password --->", userId.value);
  await store.dispatch("user/updateUser", {
    id: userId.value,
    name: name.value,
    password: newPassword.value,
  });
  router.push("/");
  newPassword.value = "";
};
</script>

<style></style>
