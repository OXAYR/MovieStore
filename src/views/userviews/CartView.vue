<template>
  <div
    class="mx-4 sm:mx-8 md:mx-16 lg:mx-32 my-8 sm:my-16 md:my-32 text-silver">
    <h1 class="font-bold text-2xl sm:text-3xl text-left">
      MY CART ({{ crt.length }})
    </h1>
    <ul
      v-if="crt.length"
      class="p-2 sm:p-4 mt-4 card divide-y divide-slate-300 text-left shadow-md bg-blue-100">
      <li
        v-for="item in crt"
        :key="item.id"
        class="px-2 grid grid-cols-12 gap-2 sm:gap-4 text-blue">
        <div class="col-span-12 sm:col-span-8 lg:col-span-9">
          <p class="font-semibold mt-2 sm:mt-4">{{ item.name }}</p>
          <p>Price: ${{ ticketPrice(item) }}</p>
          <div class="flex items-center mt-2 sm:mt-4">
            <button
              @click="decrementTicketCount(item, 1)"
              class="bg-silver text-darkBlue font-medium text-md text-center rounded-full px-2 m-1 sm:m-3">
              -
            </button>
            <input
              v-model="item.ticketCount"
              type="number"
              min="0"
              max="5"
              class="w-16 text-center" />
            <button
              @click="incrementTicketCount(item, 1)"
              class="bg-silver text-darkBlue font-medium text-md text-center rounded-full px-2 m-1 sm:m-3">
              +
            </button>
          </div>
        </div>
      </li>
    </ul>

    <div v-if="error" class="p-2 sm:p-4 mt-4 card bg-red-200">
      <p>{{ error }}</p>
      <button @click="clearError" class="text-red-800">Dismiss</button>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { onMounted, ref } from "vue";

const store = useStore();

const crt = store.getters["cart/getCart"];
const error = store.getters["cart/getError"];
const price = ref(null);

const getTheCart = store.dispatch("cart/getTheCart");
const deleteCartEl = store.dispatch("cart/deleteCartEl");
const clearError = store.dispatch("cart/clearError");
const updateTicket = store.dispatch("cart/updateTicket");

const incrementTicketCount = (item, val) => {
  if (item.ticketCount > 0 && item.ticketCount < 5) {
    item.ticketCount += val;
    console.log("IN the increment tickets----->", item, val);
    updateTicket(item);
  } else {
    alert("You can only buy a maximum of five tickets");
  }
};

const decrementTicketCount = (item, val) => {
  if (item.ticketCount > 0 && item.ticketCount <= 5) {
    if (item.ticketCount > 1) {
      item.ticketCount -= val;
      console.log("IN the decrement tickets----->", item, val);
      updateTicket(item);
    } else if (item.ticketCount === 1) {
      var answer = confirm(
        "Decrementing this ticket will remove the movie from the cart"
      );
      if (answer) {
        deleteCartEl(item.movieId);
      }
    }
  } else {
    alert("You cannot have less than one ticket");
  }
};

const ticketPrice = (item) => {
  price.value = item.price;
  return price.value * item.ticketCount;
};

const calculateItemTotal = (item) => {
  return item.price * item.ticketCount;
};

const calculateTotalCartPrice = () => {
  return crt.reduce((total, item) => total + calculateItemTotal(item), 0);
};

onMounted(() => {
  getTheCart();
});
</script>

<style scoped></style>
