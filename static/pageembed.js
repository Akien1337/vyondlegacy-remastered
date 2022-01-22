const fUtil = require("../misc/file");
const stuff = require("./info");
const http = require("http");

function toAttrString(table) {
	return typeof table == "object"
		? Object.keys(table)
				.filter((key) => table[key] !== null)
				.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(table[key])}`)
				.join("&")
		: table.replace(/"/g, '\\"');
}
function toParamString(table) {
	return Object.keys(table)
		.map((key) => `<param name="${key}" value="${toAttrString(table[key])}">`)
		.join(" ");
}
function toObjectString(attrs, params) {
	return `<object ${Object.keys(attrs)
		.map((key) => `${key}="${attrs[key].replace(/"/g, '\\"')}"`)
		.join(" ")}>${toParamString(params)}</object>`;
}

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @param {import("url").UrlWithParsedQuery} url
 * @returns {boolean}
 */
module.exports = function (req, res, url) {
	if (req.method != "GET") return;
	const query = url.query;

	var attrs, params, title;
	switch (url.pathname) {
		case "/player/embed/": {
			title = "Embed Player | Vyond | Legacy Remastered";
			attrs = {
				data: process.env.SWF_URL + "/player.swf",
				type: "application/x-shockwave-flash",
				id: "EmbedPlayer",
				quality: "medium",
				width: "100%",
				height: "100%",
			};
			params = {
				flashvars: {
					apiserver: "https://vyondlegacy-remastered.herokuapp.com/",
					storePath: process.env.STORE_URL + "/<store>",
					ut: 30,
					autostart: 0,
					isWide: 1,
					clientThemePath: process.env.CLIENT_URL + "/<client_theme>",
					showButtons: 1,
					isEmbed: 1,
				},
				allowScriptAccess: "always",
				allowFullScreen: "true",
			};
			break;
		}

		default:
			return;
	}
	res.setHeader("Content-Type", "text/html; charset=UTF-8");
	Object.assign(params.flashvars, query);
	// if you're seeing this, just know i hate doing this stuff - spark
	res.end(`	
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

<title>To All of you | Vyond</title>
<meta name="title" content="To All of you" />
<meta name="description" content="To all fans of Comedy World." />

<meta name="robots" content="noindex, nofollow" />
<meta name="google-site-verification" content="K_niiTfCVi72gwvxK00O4NjsVybMutMUnc-ZnN6HUuA" />

<link rel="alternate" type="application/json+oembed" href="https://ga.vyond.com/api/oembed?url=https%3A%2F%2Fga.vyond.com%2Fvideos%2F0MVc0G6sXLck&format=json" />
<link rel="alternate" type="text/xml+oembed" href="https://ga.vyond.com/api/oembed?url=https%3A%2F%2Fga.vyond.com%2Fvideos%2F0MVc0G6sXLck&format=xml" />

<style>
html, body, #player-container {margin:0;padding:0;width:100%;height:100%;overflow:hidden;}
</style>
<script src="https://d3v4eglovri8yt.cloudfront.net/static/e3104b61ab4052d7/go/js/jquery/jquery-1.11.1.min.js.gz.js"></script>
<script src="https://d3v4eglovri8yt.cloudfront.net/static/e3104b61ab4052d7/go/js/jquery/jquery.swfobject.min.js.gz.js"></script>
<script>
    // Amplitude interface for Flash player.
    function logAmplitudeEvent(eventName, eventProperties) {
    }
</script>
</head>
<body>
<div id="player-container">
    You can't use Vyond because Flash might be disabled. <a href="https://get.adobe.com/flashplayer/">Enable Flash</a>.
    <noscript>
        <object width="100%" height="100%"><param name="movie" value="/player/swf/0MVc0G6sXLck?autostart=0"></param><param name="bgcolor" value="#000000"><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="/player/swf/0MVc0G6sXLck?autostart=0"" type="application/x-shockwave-flash" width="100%" height="100%" bgcolor="#ffffff" allowscriptaccess="always" allowfullscreen="true"></embed></object>
    </noscript>
</div>
<script>
var player_data = {
           id: "EmbedPlayer",
           swf: "https://akien1337.github.io/vyondlegacyremastered-assets/animation/66453a3ba2cc5e1b/player.swf",
           width: "100%",
           height: "100%",

           align: "middle",
           allowScriptAccess: "always",
           allowFullScreen: "true",
           wmode: "transparent",

           hasVersion: "10.3",
		   flashvars: ${JSON.stringify(params.flashvars)}};

$('#player-container').flash(player_data);
</script>
</body>
</html>${stuff.pages[url.pathname] || ''}`)
	return true;
};