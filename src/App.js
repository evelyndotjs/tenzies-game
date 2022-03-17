import { useState } from "react";
import "./style.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";

export default function App() {
  const [dice, setDice] = useState(allNewDice());

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: true,
        id: nanoid(),
      });
    }
    return newDice;
  }

  function rollDice() {
    setDice(allNewDice());
  }

  const diceElements = dice.map((die) => (
    <Die key={die.id} value={die.value} isHeld={die.isHeld} />
  ));

  return (
    <main>
      <h1>Tenzies</h1>
      <p className="game--description">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice--container">{diceElements}</div>
      <button className="btn" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
}
