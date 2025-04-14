'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCoins, resetCoins } from '@/store/features/game/gameSlice';
import { RootState } from '@/store/store';

// Example list of food items.
const foodList = [
  { name: '🍌 Banana (Black spots)', edible: true },
  { name: '🥩 Raw Meat (greenish)', edible: false },
  { name: '🍎 Apple (shiny)', edible: true },
  { name: '🍞 Bread (moldy)', edible: false },
];

// Utility function to select a random food item.
function randomFrom<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

const FoodGame = () => {
  const dispatch = useDispatch();
  const coins = useSelector((state: RootState) => state.game.coins);

  // State that determines whether a round has started.
  const [roundStarted, setRoundStarted] = useState(false);
  
  // Current food item for the round.
  const [foodItem, setFoodItem] = useState<{ name: string; edible: boolean }>(randomFrom(foodList));
  const [feedback, setFeedback] = useState('');
  const [animate, setAnimate] = useState(false);

  // Handle user decision on whether the food item is edible.
  const handleSort = (isEdible: boolean) => {
    if ((foodItem.edible && isEdible) || (!foodItem.edible && !isEdible)) {
      dispatch(addCoins(5));
      setFeedback('✅ Correct! +5 Coins');
    } else {
      setFeedback('❌ Incorrect! Try again.');
    }
    setAnimate(true);
    setTimeout(() => {
      setFoodItem(randomFrom(foodList));
      setFeedback('');
      setAnimate(false);
    }, 1000);
  };

  // Manual reset: When the user clicks the button, reset coins and start a new round.
  const handleStartRound = () => {
    dispatch(resetCoins());
    setRoundStarted(true);
  };

  // If the round hasn't started, show the "Start New Round" UI.
  if (!roundStarted) {
    return (
      <div className="p-6 max-w-md mx-auto bg-yellow-100 rounded-xl shadow-md text-center space-y-4">
        <h2 className="text-xl font-bold">Welcome to the Food Game</h2>
        <p className="text-lg">Your coin count: {coins}</p>
        <button
          onClick={handleStartRound}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Start New Round
        </button>
      </div>
    );
  }

  // Render the main game UI once a round is started.
  return (
    <div className="p-6 max-w-md mx-auto bg-yellow-100 rounded-xl shadow-md text-center space-y-4">
      <h2 className="text-xl font-bold">Food Sorting Game</h2>
      <p className="text-lg">Coin Count: {coins}</p>
      <p className={`text-2xl transition-opacity duration-500 ${animate ? 'opacity-0' : 'opacity-100'}`}>
        {foodItem.name}
      </p>
      <div className="flex justify-around mt-4">
        <button
          onClick={() => handleSort(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          ✅ Edible
        </button>
        <button
          onClick={() => handleSort(false)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          ❌ Not Edible
        </button>
      </div>
      {feedback && <p className="text-lg font-semibold mt-3">{feedback}</p>}
    </div>
  );
};

export default FoodGame;
