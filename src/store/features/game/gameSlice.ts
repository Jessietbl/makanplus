import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  coins: number;
}

const initialState: GameState = {
  coins: 0,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addCoins: (state, action: PayloadAction<number>) => {
      state.coins += action.payload;
    },
    resetCoins: (state) => {
      state.coins = 0;
    },
  },
});

export const { addCoins, resetCoins } = gameSlice.actions;
export default gameSlice.reducer;
