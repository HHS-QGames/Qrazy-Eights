// main.js
/**
 * The entry point of the application.
 * This function creates objects, links them together, and starts the game.
 */
import Game from "./game.js";
import Player from "./components/Player.js";
import GameSettings from "./components/Gamesettings.js";
import { currentRandomMachine, randomMachine, randomSeed } from "./random.js";

const startButton = document.getElementById("startButton");

export var game = undefined;
export function main() {
  console.log("Start main")
  const name = window.prompt("What is your name?", "");

  const nameUUID = crypto.randomUUID();
  const peer = new Peer(nameUUID);

  let players = [];
  let connection;
  game = new Game(players, new GameSettings(), null, (move) => {
    if (opponent !== "") {
      connection.send(JSON.stringify({ type: "move", move}));
    } else {
      for (const p of players)
        if (p.connection !== null)
          p.connection.send(JSON.stringify({ type: "move", move}));
    }
  });

  const opponent = window.location.pathname.replace("/", "");
  if (opponent !== "") {
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("waiting").style.display = "initial";
    document.getElementById("connection").style.display = "none";

    peer.on('open', () => {
      const conn = peer.connect(opponent);
      conn.on('open', function() {
        document.getElementById("waiting").innerText = "Made connection... waiting for game to start!";
        connection = conn;
          conn.send(JSON.stringify({ type: "hello", name }));
          conn.on('data', (data) => {
            data = JSON.parse(data);
            console.log(data);
            if (data["type"] === "starting") {
              document.getElementById("game-screen").style.display = "grid";
              document.getElementById("waiting").style.display = "none";
              document.getElementById("connection").style.display = "none";
              currentRandomMachine.get = randomMachine(data["seed"]);
              players.push(...data["players"].map(name => new Player(name, name === name ? null : -1, undefined)));
              game.startGame();
            } else if (data["type"] === "move") {
              game.doMove(data["move"]);
            }
          });
      });
  }); 
  } else {
    players.push(new Player(name, null));
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("waiting").style.display = "none";
    document.getElementById("connection").style.display = "initial";

    const url = new URL(nameUUID, new URL(window.location.href).origin).href;
    new QRCode(document.querySelector("#qrcode"), {
      text: url,
      width: 180, //default 128
      height: 180,
      colorDark : "#000000",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.H
    });
    peer.on('open', () => {
        peer.on('connection', function(conn) {
            conn.on('data', (data) => {
              data = JSON.parse(data);
              console.log(data);
              if (data["type"] === "hello") {
                console.log("Pushing player");
                players.push(new Player(data["name"], conn));
                console.log(players);
                console.log(game.players);
              } else if (data["type"] === "move") {
                game.doMove(data["move"]);
                for (const p of players)
                  if (p.connection !== null && p.connection !== conn)
                    p.connection.send(JSON.stringify({ type: "move", move}));
              }
            });
        });
    }); 
  }
}

startButton.onclick = () => {
  document.getElementById("game-screen").style.display = "grid";
  document.getElementById("waiting").style.display = "none";
  document.getElementById("connection").style.display = "none";
  game.startGame();
}