import { createSlice } from "@reduxjs/toolkit";

// const MockedChats = Array(20)
//   .fill({
//     type: "msg",
//     // chain: "ethereum",
//     username: "amber1.legend",
//     msg: "test test test",
//   })
//   .concat({ type: "winner", chain: "ethereum", votes: 123123 })
//   .concat({
//     type: "round",
//     index: 12,
//     endAt: DateTime.now().plus({ minutes: 20 }),
//   })
//   .concat(
//     Array(40).fill({
//       type: "msg",
//       // chain: "ethereum",
//       username: "amber1.legend",
//       msg: "test test test",
//     })
//   );

const initialState: any[] = []; // MockedChats;

export const msgSlice = createSlice({
  name: "msg",
  initialState,
  reducers: {
    resetMsg: (state, action) => {
      return action.payload || [];
    },
    addNewMsg: (state, action) => {
      return state.concat(action.payload);
    },
  },
});

export const { resetMsg, addNewMsg } = msgSlice.actions;

export default msgSlice.reducer;
