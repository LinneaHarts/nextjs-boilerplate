"use client";

import { useState } from "react";

export default function Page() {
  const [count, setCount] = useState(0);
  const [guessString, setGuessString] = useState("No guess");
  const [wordBuild, setWordBuild] = useState("______");
  const [message, setMessage] = useState("");

  
  function buildWord(guess, word, build) {
    let index = -1
    do {
      index = word.indexOf(guess, index + 1);
      if (index >= 0) {
        build = build.substring(0, index) + guess + build.substring(index + 1);
      }
    } while (index >= 0);
    return build;

  }
  
  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    e.target.reset();
    
    const formJson = Object.fromEntries(formData.entries());
    if (count < 6) {
      if (guessString == "No guess") {
        setGuessString(formJson.myGuess.toUpperCase());
      } else {
        if (!guessString.includes(formJson.myGuess.toUpperCase())) {
          setGuessString(guessString + " " + formJson.myGuess.toUpperCase());
        }
      }
      const word = "BANANA";
      if (word.includes(formJson.myGuess.toUpperCase())) {
        const newWordBuild = buildWord(formJson.myGuess.toUpperCase(), word, wordBuild);
        if (!newWordBuild.includes("_")) {
          setMessage("You Win!")
        }
        setWordBuild(newWordBuild);
       
        
      } else {
        if (!guessString.includes(formJson.myGuess.toUpperCase())) {
          setCount(count + 1);
        }
      }
      
    } else {
      setMessage("You Die")
    }

  }


    return (<div>
        <h1>Play Hangman</h1>
        <div>
          Current Guessed Letters: {guessString}
        </div>
        <div>
          Word: {wordBuild}
        </div>
        
        <pre>
          <HangedFigure count={count} />
        </pre>
        <form onSubmit={handleSubmit}>
          <input id="guessInput" type="text" name="myGuess" maxLength="1"/>
          <button>Guess</button>
        </form>
        <h1 className="red">{message}</h1>
      </div>)
  }



  function HangedFigure({count}) {

      const hangmanPics = ["\n            +---+\n            |   |\n                |\n                |\n                |\n                |\n          =========",
                          "\n            +---+\n            |   |\n            O   |\n                |\n                |\n                |\n          =========",
                          "\n            +---+\n            |   |\n            O   |\n            |   |\n                |\n                |\n          =========",
                          "\n            +---+\n            |   |\n            O   |\n           /|   |\n                |\n                |\n          =========",
                          "\n            +---+\n            |   |\n            O   |\n           /|\\  |\n                |\n                |\n          =========",
                          "\n            +---+\n            |   |\n            O   |\n           /|\\  |\n           /    |\n                |\n          =========",
                          "\n            +---+\n            |   |\n            O   |\n           /|\\  |\n           / \\  |\n                |\n          ========="
    ]


    if (count < 7) {
      return (
        <pre>
          {hangmanPics[count]}
        </pre>
        )
    } else {
      return (
        <pre>
          {hangmanPics[6]}
        </pre>
        )
    }
    
  }
