import { ref } from "vue";

const STORAGE_KEY = "mm_squares";

export function useSquares() {
  const squares = ref(loadSquares());

  function loadSquares() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Failed to load squares:", error);
      return [];
    }
  }

  function saveSquares() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(squares.value));
    } catch (error) {
      console.error("Failed to save squares:", error);
    }
  }

  function addSquare(label, winDigit, loseDigit) {
    const id = Date.now();
    squares.value.push({ id, label, winDigit, loseDigit });
    saveSquares();
  }

  function removeSquare(id) {
    squares.value = squares.value.filter((square) => square.id !== id);
    saveSquares();
  }

  function updateSquare(id, fields) {
    const square = squares.value.find((square) => square.id === id);
    if (square) {
      Object.assign(square, fields);
      saveSquares();
    }
  }

  return { squares, addSquare, removeSquare, updateSquare };
}
