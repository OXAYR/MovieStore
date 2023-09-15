import axios from "axios";
import user from "./user.js";
export default {
  namespaced: true,
  state: {
    cart: {
      bookings: [],
    },
  },
  getters: {
    getCart(state) {
      console.log("IN the getter of cart-----> ", state);
      return state.cart.bookings;
    },
    getCartLength(state) {
      return state.cart.bookings.length;
    },
  },
  mutations: {
    SET_CART(state, cart) {
      console.log("Cart in the setter ", cart);
      state.cart.bookings = cart;
    },
    DELETE_CART_EL(state, cart) {
      state.cart = cart;
    },
  },
  actions: {
    async createCart(_, payload) {
      try {
        const userId = user.state.user.user._id;
        const token = user.state.user.token;
        console.log(
          "root state user in the cart------>",
          user.state.user.token
        );
        console.log("token---->", token, userId);
        console.log("payload---->", payload, payload.released_on);
        //const {id, released_on} = payload
        const newPayload = { userId, ...payload };
        console.log("In the cart new payload------> ", newPayload);
        const config = {
          headers: {
            "x-access-token": token,
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.post("/cart", newPayload, config);
        console.log("Cart created:", data);
        alert(data.message);
      } catch (error) {
        //console.error("Error creating cart:", error.response.data.message);
        alert(error.response.data.message);
      }
    },

    async updateTicket({ commit }, payload) {
      try {
        console.log("payload in the update Tickets---->", payload);
        const { movieId, ticketCount } = payload;
        const userId = user.state.user.user._id;
        const token = user.state.user.token;
        const config = {
          headers: {
            "x-access-token": token,
            "Content-Type": "application/json",
          },
        };
        const newPayload = { userId: userId, tickets: ticketCount };
        console.log(
          "In the update ticket cart new payload------> ",
          newPayload
        );

        const { data } = await axios.put(
          `/cart/updatetickets/${movieId}`,
          newPayload,
          config
        );
        console.log("in the get cart----> ", data.data.cart.items);
        commit("SET_CART", data.data.cart.items);
      } catch (error) {
        //console.log(error)
      }
    },

    async getTheCart({ commit }) {
      try {
        const token = user.state.user.token;
        console.log("token in the fetch of getCart----> ", token);
        const config = {
          headers: {
            "x-access-token": token,
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.get(
          `/cart/${user.state.user.user._id}`,
          config
        );
        console.log("in the get cart----> ", data.data.cart.items);
        commit("SET_CART", data.data.cart.items);
      } catch (error) {
        //console.error("Error fetching cart:", error);
        //alert(error.response.data.message);
      }
    },

    async deleteCartEl({ commit }, id) {
      try {
        console.log("payload in action removeToCart", id);
        const userId = user.state.user.user._id;
        const token = user.state.user.token;
        const config = {
          headers: {
            "x-access-token": token,
            "Content-Type": "application/json",
          },
        };
        // console.log('config ',config)
        const { data } = await axios.delete(`/cart/${id}`, config, userId);
        console.log("RESPONSE RECIEVED From remove cart", data.data.cart.items);
        commit("SET_CART", data.data.cart.items);
      } catch (error) {
        console.error("Error deleting item from cart:", error);
        //alert(error.response.data.message);
      }
    },
  },
};
