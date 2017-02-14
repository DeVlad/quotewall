$(document).ready(function () {
    $(".quote-button").click(function () {
        $.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=parseQuote&?callback=?");
    });
});

function parseQuote(response) {
    var quote = response.quoteText;
    var author = response.quoteAuthor;
    quote = quote.trim();
    author = author.trim();
    $("#quote-text").html(quote);
    $("#quote-author").html(author);
    prepareTweet(quote, author);
}

function prepareTweet(quote, author) {
    var path = window.location + '&text=' + '"' + quote + '" - ' + author;
    var tweeturl = "http://twitter.com/share?url=" + encodeURI(path);
    $("#quote-tweet").html('<a id="tweet-url" href=" ' + tweeturl + ' ">Tweet Quote</a>');
    $("#tweet-url").addClass("tweet-link");
}