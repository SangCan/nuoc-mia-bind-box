let url = "https://quotes-api-self.vercel.app/quote";
let timeExpired = 10800000;

function fetchAndDisplayQuote() {
  const loadingImage = document.getElementById("loading");
  loadingImage.style.display = "block";
  fetch(url, {
    headers: {
      accept: "*/*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        loadingImage.style.display = "none";
        const quote = data.quote;
        const author = data.author;

        localStorage.setItem("quote", quote);
        localStorage.setItem("author", author);
        localStorage.setItem("quoteTimestamp", new Date().getTime());

        document.getElementById("quoteContent").textContent = '"' + quote + '"';
        document.getElementById("quoteAuthor").textContent = author;
      } else {
        console.error("No quotes found");
      }
    })
    .catch((error) => {
      console.error("Error fetching quote:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("Document is ready!");

  const quote = localStorage.getItem("quote");
  const author = localStorage.getItem("author");
  const quoteTimestamp = localStorage.getItem("quoteTimestamp");
  const currentTime = new Date().getTime();

  if (quote && quoteTimestamp && currentTime - quoteTimestamp < timeExpired) {
    document.getElementById("quoteContent").textContent = '"' + quote + '"';
    document.getElementById("quoteAuthor").textContent = author;
  } else {
    fetchAndDisplayQuote();
  }
});
