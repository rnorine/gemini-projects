document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const startButton = document.getElementById('startButton');
    const dealButton = document.getElementById('dealButton');
    const autoDealButton = document.getElementById('autoDealButton');
    const deckSelect = document.getElementById('decks');
    const speedInput = document.getElementById('speed');

    const cardDisplay = document.getElementById('cardDisplay');
    const cardRankTop = document.querySelector('.top-left');
    const cardSuitMiddle = document.querySelector('.middle');
    const cardRankBottom = document.querySelector('.bottom-right');

    const runningCountDisplay = document.getElementById('runningCount');
    const trueCountDisplay = document.getElementById('trueCount');
    const progressBar = document.getElementById('progressBar');
    const penetrationDisplay = document.getElementById('deckPenetration');

    // --- Game State Variables ---
    let deck = [];
    let runningCount = 0;
    let trueCount = 0;
    let cardsDealt = 0;
    let totalCards = 0;
    let autoDealInterval = null;

    // --- Core Functions ---

    /**
     * Creates a shoe of cards with the specified number of decks.
     * @param {number} numDecks - The number of 52-card decks to include.
     */
    const createDeck = (numDecks) => {
        deck = [];
        const suits = ['♥', '♦', '♣', '♠'];
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        
        for (let i = 0; i < numDecks; i++) {
            for (const suit of suits) {
                for (const rank of ranks) {
                    deck.push({ rank, suit });
                }
            }
        }
        totalCards = deck.length;
    };

    /**
     * Shuffles the deck using the Fisher-Yates algorithm.
     */
    const shuffleDeck = () => {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap elements
        }
    };

    /**
     * Calculates the card's value for the Hi-Lo counting system.
     * @param {string} rank - The rank of the card (e.g., '2', 'K', 'A').
     * @returns {number} The count value (+1, 0, or -1).
     */
    const getCountValue = (rank) => {
        if (['2', '3', '4', '5', '6'].includes(rank)) {
            return 1;
        } else if (['10', 'J', 'Q', 'K', 'A'].includes(rank)) {
            return -1;
        }
        return 0; // 7, 8, 9
    };

    /**
     * Updates the UI to display the current card.
     * @param {object} card - The card object with rank and suit.
     */
    const updateCardDisplay = (card) => {
        if (!card) {
            cardRankTop.textContent = '';
            cardSuitMiddle.textContent = '🏁';
            cardRankBottom.textContent = '';
            return;
        }

        const { rank, suit } = card;
        const isRed = suit === '♥' || suit === '♦';

        cardDisplay.classList.toggle('red', isRed);
        
        cardRankTop.textContent = rank;
        cardSuitMiddle.textContent = suit;
        cardRankBottom.textContent = rank;
    };

    /**
     * Deals a single card, updates counts, and updates the UI.
     */
    const dealCard = () => {
        if (deck.length === 0) {
            endGame();
            return;
        }

        const card = deck.pop();
        cardsDealt++;

        // Update counts
        runningCount += getCountValue(card.rank);
        const decksRemaining = (totalCards - cardsDealt) / 52;
        trueCount = decksRemaining > 0 ? runningCount / decksRemaining : 0;

        // Update UI
        updateCardDisplay(card);
        runningCountDisplay.textContent = runningCount;
        trueCountDisplay.textContent = trueCount.toFixed(1);

        const penetration = (cardsDealt / totalCards) * 100;
        progressBar.value = penetration;
        penetrationDisplay.textContent = `Deck Penetration: ${penetration.toFixed(0)}%`;
    };

    /**
     * Toggles the automatic dealing of cards.
     */
    const toggleAutoDeal = () => {
        if (autoDealInterval) {
            clearInterval(autoDealInterval);
            autoDealInterval = null;
            autoDealButton.textContent = 'Auto Deal';
            dealButton.disabled = false; // Re-enable manual deal
        } else {
            const speed = parseInt(speedInput.value, 10);
            autoDealInterval = setInterval(dealCard, speed);
            autoDealButton.textContent = 'Stop Auto';
            dealButton.disabled = true; // Disable manual deal
        }
    };
    
    /**
     * Resets the game state and UI to start a new game.
     */
    const startGame = () => {
        if (autoDealInterval) {
            clearInterval(autoDealInterval);
            autoDealInterval = null;
        }

        runningCount = 0;
        cardsDealt = 0;
        const numDecks = parseInt(deckSelect.value, 10);
        
        createDeck(numDecks);
        shuffleDeck();
        
        // Reset UI
        runningCountDisplay.textContent = '0';
        trueCountDisplay.textContent = '0.0';
        progressBar.value = 0;
        penetrationDisplay.textContent = 'Deck Penetration: 0%';
        updateCardDisplay({ rank: '?', suit: '♦' });
        
        // Enable controls
        startButton.textContent = 'Restart Game';
        dealButton.disabled = false;
        autoDealButton.disabled = false;
        autoDealButton.textContent = 'Auto Deal';
    };

    /**
     * Ends the game when all cards are dealt.
     */
    const endGame = () => {
        if (autoDealInterval) {
            clearInterval(autoDealInterval);
            autoDealInterval = null;
        }
        updateCardDisplay(null); // Show end-of-shoe symbol
        dealButton.disabled = true;
        autoDealButton.disabled = true;
        alert(`End of shoe! Final Running Count: ${runningCount}. Press "Restart Game" to play again.`);
    };

    // --- Event Listeners ---
    startButton.addEventListener('click', startGame);
    dealButton.addEventListener('click', dealCard);
    autoDealButton.addEventListener('click', toggleAutoDeal);
});
