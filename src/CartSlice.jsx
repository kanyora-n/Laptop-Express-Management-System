import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [], // Initialize items as an empty array
    totalQuantity: 0, // Keep track of the total quantity of all items in the cart
  };

  export const CartSlice = createSlice({
    name: 'cart',
    initialState,
  reducers: {
     // Reducer to add an item to the cart
     addItem: (state, action) => {
        const { name, image, cost } = action.payload;
        const existingItem = state.items.find(item => item.name === name);
        if (existingItem) {
          existingItem.quantity++; // If item exists, increment the quantity
        } else {
          state.items.push({ name, image, cost, quantity: 1 }); // If new, add with quantity 1
        }
        state.totalQuantity++; // Increment total quantity in the cart
      },
     // Reducer to remove an item from the cart
    removeItem: (state, action) => {
        const { name } = action.payload;
        const itemToRemove = state.items.find(item => item.name === name);
        if (itemToRemove) {
          state.totalQuantity -= itemToRemove.quantity; // Deduct the item's quantity from the total
          state.items = state.items.filter(item => item.name !== name); // Filter out the item from the cart
        }
      },
    // Reducer to update the quantity of an item
    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload;
        const existingItem = state.items.find(item => item.name === name);
        if (existingItem) {
          const quantityDifference = quantity - existingItem.quantity;
          existingItem.quantity = quantity; // Update the quantity of the item
          state.totalQuantity += quantityDifference; // Adjust the total quantity accordingly
        }
      },

      // Reducer to increment the quantity of a specific item
    incrementItem: (state, action) => {
        const { name } = action.payload;
        const existingItem = state.items.find(item => item.name === name);
        if (existingItem) {
          existingItem.quantity++;
          state.totalQuantity++; // Increment the total quantity in the cart
        }
      },

      // Reducer to decrement the quantity of a specific item
    decrementItem: (state, action) => {
        const { name } = action.payload;
        const existingItem = state.items.find(item => item.name === name);
        if (existingItem && existingItem.quantity > 1) {
          existingItem.quantity--;
          state.totalQuantity--; // Decrement the total quantity in the cart
        } else {
          // If quantity is 1, remove the item entirely
          state.items = state.items.filter(item => item.name !== name);
          state.totalQuantity--; // Decrement the total quantity in the cart
        }
      },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
