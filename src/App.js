import { useState } from "react";
import "./style.css";
import Die from "./components/Die";

export default function App() {
  const [dice, setDice] = useState(allNewDice());

  function allNewDice() {
    const newDice = [];

    for (let i = 0; i < 10; i++) {
      newDice.push(Math.ceil(Math.random() * 6));
    }
    return newDice;
  }

  const dieValue = dice.map((die) => <Die value={die} />);

  function handleClick() {
    setDice(allNewDice());
  }

  return (
    <main>
      <h1>Tenzies</h1>
      <p className="game--description">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice--container">{dieValue}</div>
      <button className="btn" onClick={handleClick}>
        Roll
      </button>
    </main>
  );
}
