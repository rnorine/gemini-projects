<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Card Counting Practice</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="app-container">
        <h1>Card Counting Practice</h1>
        <p class="instructions">Practice the Hi-Lo system. The goal is to keep an accurate running count.</p>

        <div class="settings">
            <label for="decks">Number of Decks:</label>
            <select id="decks">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="6" selected>6</option>
                <option value="8">8</option>
            </select>
            <label for="speed">Dealing Speed (ms):</label>
            <input type="number" id="speed" value="1500" min="200" step="100">
        </div>

        <div class="game-area">
            <div class="card-display" id="cardDisplay">
                <span class="top-left"></span>
                <span class="middle">♦</span>
                <span class="bottom-right"></span>
            </div>
            <div class="counts">
                <div class="count-box">
                    <h2>Running Count</h2>
                    <p id="runningCount">0</p>
                </div>
                <div class="count-box">
                    <h2>True Count</h2>
                    <p id="trueCount">0.0</p>
                </div>
            </div>
        </div>
        
        <div class="controls">
            <button id="startButton">Start Game</button>
            <button id="dealButton" disabled>Deal Next Card</button>
            <button id="autoDealButton" disabled>Auto Deal</button>
        </div>

        <div class="progress-container">
            <p id="deckPenetration">Deck Penetration: 0%</p>
            <progress id="progressBar" value="0" max="100"></progress>
        </div>

    </div>
    <script src="script.js"></script>
</body>
</html>
