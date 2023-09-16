<template>
  <div
    class="mx-4 sm:mx-8 md:mx-16 lg:mx-32 my-8 sm:my-16 md:my-32 text-silver">
    <h1 class="font-bold text-2xl sm:text-3xl text-left">
      MY CART ({{ cart.length }})
    </h1>
    <ul
      v-if="cart.length"
      class="p-2 sm:p-4 mt-4 card divide-y divide-slate-300 text-left shadow-md bg-blue-100">
      <li
        v-for="item in cart"
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
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { onMounted, ref, computed } from "vue";

const store = useStore();

const cart = computed(() => store.getters["cart/getCart"]);
console.log("cart computed ---------->", cart.value)
const price = ref(null);

const incrementTicketCount = async (item, val) => {
  if (item.ticketCount > 0 && item.ticketCount <= 5) {
    item.ticketCount += val;
    console.log("IN the increment tickets----->", item, val);
    await store.dispatch("cart/updateTicket", item);
  } else {
    alert("You can only buy a maximum of five tickets");
  }
};

const decrementTicketCount = async (item, val) => {
  if (item.ticketCount > 0 && item.ticketCount <= 5) {
    if (item.ticketCount > 1) {
      item.ticketCount -= val;
      console.log("IN the decrement tickets----->", item, val);
      await store.dispatch("cart/updateTicket", item);
    } else if (item.ticketCount === 1) {
      var answer = confirm(
        "Decrementing this ticket will remove the movie from the cart"
      );
      if (answer) {
        await store.dispatch("cart/deleteCartEl", item.movieId);
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

onMounted(() => {
  store.dispatch("cart/getTheCart");
});
</script>

<style scoped></style>
