import { useState} from "react";
import Image from 'next/image'
import JSConfetti from 'js-confetti'

export default function Home() {
  const [userChoice, setUserChoice] = useState("❓");
  const [computerChoice, setComputerChoice] = useState("❓");
  const [result, setResult] = useState("");
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [playing, setPlaying] = useState(false);
  const choices = ["🪨", "🧻", "✂️"];
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
 
  

  const handleClick = (value) => {
    setUserChoice(value);
    const generateComputerChoice = () => {
      const randomNumber = Math.floor(Math.random() * choices.length);
      const randomChoice = choices[randomNumber];
      setComputerChoice(randomChoice);
    };
    generateComputerChoice();
    
    
    
    
  };

  const playAgain = () => {
    setPlaying(false);
    setUserChoice("❓")
    setComputerChoice("❓")
  }

  const checkResult = (theAnswer) => {
    const jsConfetti = new JSConfetti()
    setPlaying(true);
    switch (userChoice + computerChoice) {
      case "✂️🧻":
      case "🪨✂️":
      case "🧻🪨":
    setPlayerScore(playerScore + 1);
    
    jsConfetti.addConfetti({
    emojis: ["🎈","🌹", "💐","🎉"],
  emojiSize: 70,
  confettiNumber: 50,
    })
        setResult("YOU WIN!");
        break;
      case "🧻✂️":
      case "✂️🪨":
      case "🪨🧻":
        
    
        setComputerScore(computerScore + 1)
        setResult("YOU LOSE!");
        break;
      case "🪨🪨":
      case "✂️✂️":
      case "🧻🧻":
        setResult("IT WAS A TIE!");
        break;
      default:
        setResult("Weaponless!");
    }
  };

  return (
    <>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet"/>
    <nav className="m-4 flex justify-between">
      <span className="flex items-center">
    <Image
      src={`/wim-logo.png`}
      width={50}
      height={50}
    />
    <p className="mx-3">Woahisme!</p>
    </span>
    <button className="text-sm bg-blue-500 text-white  hover:bg-sky-700 p-3 rounded-full">Browse Games</button>
    </nav>
    <div className="border-t-8 border-b-8 border-black bg-orange-100">
    <div className="flex flex-col justify-center items-center text-center m-5 p-5">
      <h1 className="  lg:text-3xl md:text-2xl text-1xl m-5">Rock {'>'} Paper {'>'} Scissors</h1>
      
      <h2 className="mb-5 lg:text-5xl md:text-4xl text-3xl flex items-center m-5 "> {playing ? <Image
      
      src={`/rps-game-assets/${computerChoice}-img.png`}
      alt={`${computerChoice}`}
      width={120}
      height={120}
    />: <Image
      
    src={`/rps-game-assets/❓-img.png`}
    
    width={120}
    height={120}
  /> } <span className="m-5 ">VS</span> <Image
      
      src={`/rps-game-assets/${userChoice}-img.png`}
      alt={`${userChoice}`}
      width={120}
      height={120}
    /></h2>
    
      <h2 className="text-amber-600 lg:text-4xl md:text-3xl text-2xl">{playing ? result : ""}</h2>
      {playing ? <button className="m-5 bg-blue-500 text-white m-5 border-2 p-3 hover:bg-blue-700 active:bg-blue-800" onClick={() => playAgain()} >Play Again? </button> : <button className="bg-blue-500 text-white m-5 border-2 p-3 hover:bg-blue-700 active:bg-blue-800" onClick={() => checkResult()} >Fight! </button> }
       
      <h3>Pick Your Weapon!</h3>
      <div>
      {choices.map((choice, index) => (
        <button className={`bg-white border-black border-4 p-4 mx-2 mt-3 border-2 mx-2 lg:text-8xl md:text-7xl text-4xl ${ playing ? "cursor-not-allowed" : "hover:bg-blue-700 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"}`} key={index} onClick={() => handleClick(choice)} disabled={playing}>
          <Image
      
      src={`/rps-game-assets/${choice}-img.png`}
      alt={`${choice}`}
      width={100}
      height={100}
    />
          
        </button>
      ))}
      </div>
      <h2 className="text-2xl mt-5 p-2 text-white bg-black">{date}</h2>
      <h2 className="lg:text-3xl md:text-2xl sm:text-1xl text-white bg-black p-3 mb-0">Human {playerScore} : {computerScore} Machine</h2>
      
      </div>
      </div>

      <footer className="text-center m-5">
        <p>Created by Mikesenh</p>
        <p>© Coded /w Love!</p>
      </footer>
    </>
    
  );
}
