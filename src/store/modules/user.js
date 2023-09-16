import axios from "axios";

export default {
  namespaced: true,
  state: {
    user: {
      token: null,
    },
    users: {},
    validationErrors: {},
  },
  getters: {
    getUser(state) {
      console.log("in the get user---->", state.user);
      return state.user;
    },
    getAllUsers(state) {
      console.log("In the getter of all users", state.users);
      return state.users;
    },
  },
  mutations: {
    SET_USERS(state, payload) {
      console.log("IN the set of all users ", payload);
      state.users = payload;
    },
    SET_USER(state, payload) {
      console.log("in the set user", payload);
      state.user = payload;
      localStorage.setItem("user", JSON.stringify(payload.user));
      localStorage.setItem("userAuth", JSON.stringify(payload.token));
    },
    DELETE_USER(state) {
      state.user = null;
    },
    SET_VALIDATION_ERRORS(state, payload) {
      console.log("in the errors, ", payload);
      state.validationErrors = payload;
    },
    UPDATE_USERS_ROLE(state, { id, payload }) {
      console.log("in the update role", id, payload);
      state.users.splice(id, 1, payload);
    },
  },
  actions: {
    async authenticateUser({ commit }, payload) {
      try {
        const { data } = await axios.post("/users/authenticate", payload);
        const token = data.data.token;
        console.log("in tge authentication---->", token);
        commit("SET_USER", data.data);
      } catch (error) {
        // if (error.response && error.response.data.errors) {
        //   commit('SET_VALIDATION_ERRORS', error.response.data.errors);
        // }
        console.error("Error authenticating user:", error);
        alert(error.response.data.message);
      }
    },

    async registerUser({ commit }, payload) {
      try {
        console.log("Image of the user ", payload.profileImage);
        const { data } = await axios.post("/users/register", payload);
        console.log("in the register---> ", data.status);
        if (data.status == 200) {
          commit("SET_VALIDATION_ERRORS", null);
        }
      } catch (error) {
        if (error.response.status == 403) {
          commit("SET_VALIDATION_ERRORS", error.response.data.errors);
        }
        console.error("Error registering user:", error.response.data.errors);
        console.error("Error registering user:", error);
        //alert(error.response.data.message)
      }
    },

    async updateUser({ commit }, { id, name, password }) {
      try {
        console.log("id,name,password", id, name, password);
        await axios.put(`/users/${id}/updateUser`, { name, password });
        commit("SET_USER", null);
      } catch (error) {
        console.error("Error updating user:", error);
        //alert(error.response.data.message)
      }
    },
    async deleteUserAccount({ commit }, id) {
      try {
        await axios.delete(`/users/${id}`);
        commit("DELETE_USER", null);
      } catch (error) {
        console.error("Error deleting account:", error);
        //alert(error.response.data.message)
      }
    },

    async fetchUsers({ commit }) {
      try {
        console.log("In the fetch users");
        const { data } = await axios.get("/users/all");
        console.log("In the fetch users ", data.data.users);
        commit("SET_USERS", data.data.users);
      } catch (error) {
        console.log("Error fetching User", error);
        // alert(error.response.data.message)
      }
    },

    async updateUserRole({ commit }, { id, role }) {
      try {
        await axios.put(`/users/${id}/updateRole`, { role });
        commit("UPDATE_USERS_ROLE", { id: id, payload: role });
      } catch (error) {
        console.error("Error updating password:", error);
        //alert(error.response.data.message)
      }
    },
  },
};
