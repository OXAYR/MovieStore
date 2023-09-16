<template>
  <div
    class="text-silver"
    :class="{ 'lg:mr-96': currentPath === '/admin/users' }">
    <h1
      v-if="currentPath === '/admin/users'"
      class="font-bold text-2xl my-8 sm:text-3xl text-left">
      Users
    </h1>
    <div class="w-full sm:w-auto overflow-x-auto">
      <div v-if="isLoading" class="text-center mt-4">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <table class="w-full">
        <thead>
          <tr class="font-bold divide-x divide-lightestBlue">
            <th class="w-1/3 sm:w-auto">Name</th>
            <th class="w-1/3 sm:w-auto">Email</th>
            <th class="w-1/3 sm:w-auto">User Role</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user._id" class="my-2">
            <td class="w-1/3 sm:w-auto px-4 sm:px-3 sm:mx-3">
              {{ user.name }}
            </td>
            <td class="w-1/3 sm:w-auto px-4 sm:px-3 sm:mx-3">
              {{ user.email }}
            </td>
            <td class="w-1/3 sm:w-auto px-4 sm:px-3 py-2 sm:mx-3">
              <div class="flex items-center justify-center">
                <div v-if="userBeingEdited === user" class="flex">
                  <select
                    @change="updateUserRole(user)"
                    v-model="editedUserRole"
                    value="user"
                    class="border text-black rounded-md p-1 mr-2">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div v-else @click="toggleRoleEdit(user)" class="text-center">
                  {{ user.userRole }}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();
const userBeingEdited = ref(null);
const editedUserRole = ref(null);
const isLoading = ref(false);
const currentPath = ref(route.path);

console.log("current path------------------>", currentPath);
const fetchUsers = async () => {
  try {
    isLoading.value = true;
    await store.dispatch("user/fetchUsers");
    isLoading.value = false;
  } catch (error) {
    console.error("Error fetching users:", error);
    isLoading.value = false;
  }
};

const users = computed(() => store.getters["user/getAllUsers"]);

const updateUserRole = async (user) => {
  try {
    var answer = confirm("Do you really want to update the user role?");
    if (answer) {
      isLoading.value = true;
      await store.dispatch("user/updateUserRole", {
        id: user._id,
        role: editedUserRole.value,
      });
      userBeingEdited.value = null;
      isLoading.value = false;
    }
  } catch (error) {
    console.error("Error updating user role:", error);
    isLoading.value = false;
  }
};

const toggleRoleEdit = (user) => {
  userBeingEdited.value = userBeingEdited.value === user ? null : user;
  editedUserRole.value = user.userRole;
};

onMounted(() => {
  fetchUsers();
});
</script>
