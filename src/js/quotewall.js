(function () {
    function loadScript(url, callback) {
        var script = document.createElement("script")
        script.type = "text/javascript";
        if (script.readyState) { //IE
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        }
        else { //Other Browsers
            script.onload = function () {
                callback();
            };
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }
    loadScript("https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js", function () {
        //jQuery loaded
        $(document).ready(function () {
            $(".quote-button").click(function () {
                $.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=parseQuote&?callback=?");
            });
        });
    });
})();

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
    var tweeturl = 'http://twitter.com/share?url=' + encodeURI(path);
    $('#quote-tweet').html('<a id="tweet-url" href=" ' + tweeturl + ' ">Tweet Quote</a>');
    $("#tweet-url").addClass("tweet-link");
}