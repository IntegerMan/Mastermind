import Vue from "vue";
import Vuex from "vuex";
import { GameMove } from '@/models/GameMove';
import { ColorChoice } from '@/models/ColorChoice';

Vue.use(Vuex);

const numGuesses = 10;
const solutionLength = 4;
const choices = ['Blue', 'Green', 'Orange', 'Violet', 'Red', 'Yellow'];

/**
 * Grades the user's guess against the correct solution, then returns a GameMove indicating the amount of correct and incorrect answers
 * @param guess the user's guess, in the format of 'ROYG' for Red, Orange, Yellow, Green
 * @param solution the solution, in the same format as the guess
 */
function evaluateGuess(guess: string, solution: string): GameMove {
  let numCorrect = 0;
  let numMisplaced = 0;

  // Loop through the characters and count the ones at the correct spot as well as the ones at a misplaced spot
  for (let i = 0; i < guess.length; i++) {
    if (solution[i] === guess[i]) {
      numCorrect++;
    }
    else if (solution.indexOf(guess[i]) >= 0) {
      numMisplaced++;
    }
  }
  
  // Add it to the history
  return new GameMove(guess, numCorrect, numMisplaced);
}

/**
 * Performs an unbiased sort of an input array and returns that array
 * @param answers the array to sort
 */
function sortArray(answers: string[]): string[] {
  let currentIndex = answers.length;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    
    // And swap it with the current element.
    const temporaryValue = answers[currentIndex];
    answers[currentIndex] = answers[randomIndex];
    answers[randomIndex] = temporaryValue;
  }

  return answers;
}

/**
 * Builds a solution from the available choices where each choice is randomly ordered and no choice is repeated. 
 * Solutions will only have the first character of each choice.
 */
function generateSolution(): string {
  const answers = choices.map(c => c[0]); // Get a new array only containing the first letter of each color (each color must have a distinct first letter)

  return sortArray(answers) // Perform an unbiased sort on the array
                .slice(0, solutionLength) // Take the first X of the answers, now that they're in random order
                .join(''); // Group them all together into a string without delimiters
}

/**
 * The Vuex store for the application
 */
export default new Vuex.Store({
  state: {
    isGameOver: false,
    movesLeft: numGuesses,
    solution: generateSolution(),
    history: [new GameMove('This exists only to give Vuex some type insights', 0, 0)],
    message: '',
    guess: choices.map(c => c).splice(0, solutionLength)
  },
  mutations: {
    reset(state): void {
      console.log('Resetting game state');
      state.isGameOver = false;
      state.movesLeft = numGuesses;
      state.solution = generateSolution(),
      state.history = [];
      state.message = '';
    },
    addGuess(state, move: GameMove): void {
      state.history.push(move);

      // Check for game won
      if (move.exactlyCorrect === state.solution.length) {
        state.isGameOver = true;
        state.message = 'You win!';
      }
      // Decrement our turn count and check for game over
      else if (--state.movesLeft <= 0) {
        state.isGameOver = true;
        state.message = 'You lost yet again.';
      }
      
    },
    setMessage(state, message: string): void {
      if (console && console.log) {
        console.log(message);
      }
      state.message = message;
    },
    setColor(state, choice: ColorChoice): void {
      state.guess[choice.index] = choice.color
    },
  },
  actions: {
    /**
     * Handles the user changing a field on a guess, prior to clicking guess
     * @param context the Vuex store context
     * @param choice the ColorChoice the user made, including the new color and the index
     */
    changeColor(context, choice: ColorChoice): void {
      context.commit("setColor", choice);
    },
    /**
     * Handles the user clicking guess to evaluate a set of choices
     * @param context the Vuex store context
     */
    guess(context): void {
      const guess: string = context.state.guess.map(g => g[0]).join(''); // Translate for an array of color names to a single string with the first letter of each color
      const move: GameMove = evaluateGuess(guess, context.state.solution);
      context.commit("addGuess", move);
    },
    /**
     * Handles the user clicking restart to restart the game
     * @param context the Vuex store context
     */
    restart(context): void {
      context.commit('reset');
    }
  },
  getters: {
    remainingGuesses: s => {
      if (s.isGameOver) return 'Game Over';

      switch (s.movesLeft) {
        case 0: return 'Game Over';
        case 1: return '1 Guess Remaining';
        default: return s.movesLeft + ' guesses remaining';
      }
    },
    solutionLength: s => s.solution.length,
    guesses: s => s.history,
    isGameOver: s => s.isGameOver,
    message: s => s.message,
    availableOptions: s => choices,
    guess: s => s.guess
  },
  modules: {}
});

