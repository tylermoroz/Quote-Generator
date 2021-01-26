const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const generateQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showloadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show new quote
function newQuote() {
    showloadingSpinner();
    // Pick random quote from API
    const randomQuote = Math.floor(Math.random() * apiQuotes.length);
    // Check if author field is null and replace it with 'Unknown'
    if (!apiQuotes[randomQuote].author) {
        quoteAuthor.textContent = 'Unknown';
    } else {
        quoteAuthor.textContent = apiQuotes[randomQuote].author;
    }
    // Check quote length to determine styling
    if (apiQuotes[randomQuote].text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = apiQuotes[randomQuote].text;
    removeLoadingSpinner();
}

// Get Quote From API
async function getQuote() {
    showloadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch Error Here
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
generateQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();