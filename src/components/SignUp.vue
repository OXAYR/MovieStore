<template>
  <div
    class="card mt-8 sm:mt-16 md:mt-32 Login px-4 sm:px-8 py-6 md:py-11 max-w-xs mx-auto">
    <h2 class="text-3xl font-medium text-center">Sign Up</h2>
    <form enctype="multipart/form-data">
      <input
        type="text"
        v-model="form.name"
        placeholder="Username"
        class="mt-4 p-2 border border-gray-300 rounded-md w-full" />
      <input
        type="email"
        v-model="form.email"
        placeholder="Email"
        class="mt-4 p-2 border border-gray-300 rounded-md w-full" />
      <input
        type="password"
        v-model="form.password"
        placeholder="Password"
        class="mt-4 p-2 border border-gray-300 rounded-md w-full" />

      <input
        type="password"
        placeholder="Confirm Password"
        v-model="form.confirmPassword"
        class="mt-4 p-2 border border-gray-300 rounded-md w-full" />
      <!-- <input
        type="file"
        name="profileImage"
        @change="onFileChange"
        accept="image/*"
      /> -->
    </form>
    <p v-if="validationErrors" class="text-red text-sm">
      {{ validationErrors }}
    </p>
    <button
      class="mt-4 px-4 sm:px-8 py-2 sm:py-3 text-white bg-blue hover:bg-lightBlue rounded-full"
      @click="toStore(form)">
      Register
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const form = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const store = useStore();
const router = useRouter();

const validationErrors = computed(() => store.state.user.validationErrors);

const toStore = async () => {
  if (
    form.value.email !== "" &&
    form.value.password !== "" &&
    form.value.name !== "" &&
    form.value.confirmPassword !== ""
  ) {
    console.log("In the component to store--->", form.value);
    await store.dispatch("user/registerUser", form.value);
    if (!validationErrors.value) router.push("/");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
