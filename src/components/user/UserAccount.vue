<template>
  <div class="min-h-screen flex justify-center items-center">
    <div class="bg-white p-8 rounded shadow-md w-96">
      <h1 class="text-2xl font-semibold mb-4">Account Settings</h1>

      <div class="mb-4">
        <label class="block font-semibold mb-2">Name:</label>
        <p class="bg-grey p-2 rounded">{{ user.user.name }}</p>
      </div>

      <div class="mb-4">
        <label class="block font-semibold mb-2">Email:</label>
        <p class="bg-grey p-2 rounded">{{ user.user.email }}</p>
      </div>

      <button
        @click="update(user.user._id)"
        class="bg-blue text-white px-4 py-2 rounded hover:bg-blue mr-2">
        Edit
      </button>

      <button
        @click="deleteUserAccount(user.user._id)"
        class="bg-red text-white px-4 py-2 rounded hover:bg-red">
        Delete Account
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const user = store.getters["user/getUser"];

const update = (index) => {
  console.log("sending in params----->", index);
  router.push({ path: `/home/${index}/updateUser` });
};

const deleteUserAccount = (index) => {
  var answer = confirm("Do you really want to delete your account?");
  if (answer) {
    store.dispatch("user/deleteUserAccount", index).then(() => {
      router.push("/");
    });
  }
};
</script>

<style></style>
