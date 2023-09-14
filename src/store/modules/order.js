import axios from 'axios';
import user from './user.js';
export default {
    namespace: true,
    state:{
        orders:[]
    },

    getters:{
        getOrders(state){
            return orders
        }
    },
    setters:{
        SET_ORDER(state, payload){
            state.order = payload
        }
    },
    actions:{
        async createOrder({commit}, payload) {
            console.log("payload",payload)
             const token = this.state.movies.token;
            const config = {
                headers: {
                  'x-access-token': token,
                  'Content-Type': 'application/json'
                }
            };
            const obj={userId:payload}
            
            const { data } = await axios.post(`http://localhost:3000/order`,obj)
            
            console.log("response from CREATE ORDER ", data.data.order)
            commit("SET_CART", null)
            commit("SET_ORDER_ID", data.data.order._id)     
            commit("SET_ORDER",data.data.order)
            console.log("ORDER ID ISSSSS ",this.state.orderId)
          },
          async getAllOrders({ commit }, payload) {
            const token = this.state.movies.token;
            const config = {
                headers: {
                  'x-access-token': token,
                  'Content-Type': 'application/json'
                }
            };
            const obj = { userId:this.state.userId}
      
            
            
            const { data } = await axios.get(`http://localhost:3000/order/user/orderHistory/${obj.userId}`,)
            console.log("response from GET ALL ORDER ", data.data.newOrderOnTop)
            commit("SET_ALL_ORDERS",data.data.newOrderOnTop) 
          },
          async getAllOrdersAdminSpecific({ commit }) {
             const token = this.state.movies.token;
            const config = {
                headers: {
                  'x-access-token': token,
                  'Content-Type': 'application/json'
                }
            };
            const { data } = await axios.get('http://localhost:3000/order')
            console.log("Response from api caal get all users admin specific : ", data)
             commit("SET_ALL_ORDERS",data.data.orders) 
          },
          async updateOrderStatus({ commit }, payload) {
            const {data}=await axios.put(`http://localhost:3000/order`)
          }

    }
}