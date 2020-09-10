import Vue from 'vue';
import Vuex from "vuex";
import { cart as types } from './mutation-types';

Vue.use(Vuex);

let cart = window.localStorage.getItem('cart');

const saveData = () => {
    window.localStorage.setItem('cart', JSON.stringify(state.cart));
};

const state = {
    cart: cart ? JSON.parse(cart) : [],
    activeProduct: null,
};

const mutations = {
    [types.ADD_TO_CART]: (state, product) => {
        console.log("Adding a cart ", product);
        let inc = false;

        state.cart = state.cart.map(prod => {
            if(prod.id === product.id){
                prod.quantity += 1;
                inc = true;
            }
            return prod;
        });
        if (!inc) {
            product.quantity = 1;
            state.cart.push(product);
        }
        saveData();
    },

    [types.DELETE_PRODUCT]: (state, product) => {
        let found_idx = null;

        for(let i=0; i < state.cart.length; i++){
            if (state.cart[i].id == product.id) {
                found_idx = i;
                break;
            }
        }
        if (found_idx != null) {
            state.cart.splice(found_idx,1);
        }
        saveData();
    },

    [types.DECREASE_PRODUCT]: (state, product) => {
        let p = null;
        state.cart = state.cart.map(prod => {
            if(prod.id === product.id){
                prod.quantity -= 1;
                p = prod;
            }
            return prod;
        });

        if (p){
            if (p.quantity < 1) {
                let idx = state.cart.indexOf(p);
                state.cart.splice(idx,1);
            }
        }

        saveData();
    },

    [types.SET_ACTIVE_PRODUCT]: (state, product) => {
        state.activeProduct = product;
    },

    [types.SET_CART_EMPTY]: (state) => {
        state.cart = [];
        saveData();
    }
};

const actions = {
    addProduct ({ commit }, product){
        commit(types.ADD_TO_CART, product);
    },

    deleteProduct ({ commit }, product) {
        commit(types.DELETE_PRODUCT, product);
    },

    decreaseProduct ({ commit }, product) {
        commit(types.DECREASE_PRODUCT, product);
    },

    setActiveProduct ({ commit }, product) {
        commit(types.SET_ACTIVE_PRODUCT, product);
    },

    setCartEmpty ({ commit }) {
        commit(types.SET_CART_EMPTY);
    }


};

const getters = {
    getCart: (state) => {
        return state.cart;
    },

    totalPrice: (state) => {
        let result = 0;
        state.cart.forEach(product => {
            result += parseInt(product.price) * product.quantity;
        });
        return result;
    },

    getActiveProduct: (state) => {
        return state.activeProduct;
    }
};

export const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});


