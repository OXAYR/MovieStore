<template>
  <div
    class="card mt-8 sm:mt-16 md:mt-32 Login px-4 sm:px-8 py-6 md:py-11 max-w-xs mx-auto">
    <h1 class="text-center text-2xl sm:text-3xl font-medium font-serif">
      Sign In
    </h1>
    <input
      type="email"
      placeholder="Email"
      v-model="formLogin.email"
      class="mt-4 p-2 sm:p-3 border border-gray-300 rounded-md w-full" />

    <input
      type="password"
      placeholder="Password"
      v-model="formLogin.password"
      class="mt-4 p-2 sm:p-3 border border-gray-300 rounded-md w-full" />
    <!-- <p v-if="error.length" class="text-red text-sm">
      {{ validationErrors }}
    </p> -->
    <button
      class="mt-4 px-12 py-2 sm:px-24 sm:py-3 bg-blue text-white hover:bg-lightBlue rounded-full"
      @click="toValidate(formLogin)">
      <p class="text-white font-serif text-center">Login</p>
    </button>

    <router-link to="/signup" class="block mt-2">
      <button
        class="Register px-12 py-2 sm:px-24 sm:py-3 bg-white hover:bg-silver rounded-full">
        <p class="text-black font-serif ml-2">SignUp</p>
      </button>
    </router-link>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const formLogin = ref({
  email: "",
  password: "",
});

const store = useStore();
const router = useRouter();

const validationErrors = computed(() => store.state.user.validationErrors);

const toValidate = async () => {
  if (formLogin.value.email !== "" && formLogin.value.password !== "") {
    await store.dispatch("user/authenticateUser", formLogin.value);
    router.push("/admin");
  }
};
</script>

<style scoped></style>
