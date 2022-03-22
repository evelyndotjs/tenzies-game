import { useState, useEffect } from "react";
import "./style.css";
import Die from "./components/Die";
import Record from "./components/Record";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [record, setRecord] = useState(0);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    setDice((prev) =>
      prev.map((die) => {
        if (!die.isHeld) {
          return generateNewDie();
        }
        return die;
      })
    );
  }

  function holdDice(id) {
    setDice((prev) =>
      prev.map((die) => {
        if (die.id === id) {
          return { ...die, isHeld: !die.isHeld };
        }
        return die;
      })
    );
  }

  let clicked;

  function newGame(event) {
    clicked = event.type;

    if (!tenzies) {
      return rollDice();
    } else {
      setDice(allNewDice());
      setTenzies(false);
    }
  }

  let startTime;

  function getSeconds() {
    const date = new Date();
    const miliseconds = date.getMilliseconds();
    return miliseconds / 1000;
  }

  function timerStart() {
    startTime = getSeconds();
  }

  function timerEnd() {
    const endTime = getSeconds();
    const timeElapse = endTime - startTime;
    return timeElapse;
  }

  useEffect(() => {
    if (clicked === "click" || holdDice()) {
      timerStart();
    }
    if (tenzies) {
      setRecord(timerEnd());
    }
  }, [tenzies]);
  //figure out whats wrong with the dependency error

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("You won!");
    }
  }, [dice]);

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <h1>Tenzies</h1>
      <p className="game--description">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice--container">{diceElements}</div>
      <button className="btn" onClick={newGame}>
        {tenzies ? "Restart" : "Roll"}
      </button>
      <Record record={record} />
    </main>
  );
}
