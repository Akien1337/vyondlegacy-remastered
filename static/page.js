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
		case "/cc":
		case "/character_creator": {
			title = 'Character Creator';
			attrs = {
				data: process.env.SWF_URL + '/cc.swf', // data: 'cc.swf',
				type: 'application/x-shockwave-flash', 
				id: 'char_creator',
			};
			params = {
				flashvars: {
					apiserver: "https://localhost:4343/",
					storePath: process.env.STORE_URL + "/<store>",
					clientThemePath: process.env.CLIENT_URL + "/<client_theme>",
					original_asset_id: query["id"] || null,
					themeId: "family",
					ut: 60,
					bs: "adam",
					appCode: "go",
					page: "",
					siteId: "go",
					m_mode: "school",
					isLogin: "Y",
					isEmbed: 1,
					ctc: "go",
					tlang: "en_US",
                    nextUrl: "/videomaker",
				},
				allowScriptAccess: "always",
				movie: process.env.SWF_URL + "/cc.swf", // 'http://localhost/cc.swf'
			};
			break;
		}

		case "/cc_browser":
		case "/character_browser": {
			title = "Character Browser";
			attrs = {
				data: process.env.SWF_URL + "/cc_browser.swf", // data: 'cc_browser.swf',
				type: "application/x-shockwave-flash",
				id: "char_browser",
			};
			params = {
				flashvars: {
					apiserver: "https://localhost:4343/",
					storePath: process.env.STORE_URL + "/<store>",
					clientThemePath: process.env.CLIENT_URL + "/<client_theme>",
					original_asset_id: query["id"] || null,
					themeId: "family",
					ut: 30,
					appCode: "go",
					page: "",
					siteId: "go",
					m_mode: "school",
					isLogin: "Y",
					retut: 1,
					goteam_draft_only: 1,
					isEmbed: 1,
					ctc: "go",
					tlang: "en_US",
					lid: 13,
				},
				allowScriptAccess: "always",
				movie: process.env.SWF_URL + "/cc_browser.swf", // 'http://localhost/cc_browser.swf'
			};
			break;
		}

		case "/go_full":
		case "/go_full/tutorial": {
			let presave =
				query.movieId && query.movieId.startsWith("m")
					? query.movieId
					: `m-${fUtil[query.noAutosave ? "getNextFileId" : "fillNextFileId"]("movie-", ".xml")}`;
			title = "The Video Maker from Vyond | Legacy Remastered - Make A Video for YouTube!";
			attrs = {
				data: process.env.SWF_URL + "/go_full.swf",
				type: "application/x-shockwave-flash",
				id: "video_maker",
				width: "100%",
				height: "100%",
			};
			params = {
				flashvars: {
					apiserver: "https://localhost:4343/",
					storePath: process.env.STORE_URL + "/<store>",
					isEmbed: 1,
					ctc: "go",
					ut: 60,
					bs: "default",
					appCode: "go",
					page: "",
					siteId: "go",
					lid: 13,
					isLogin: "Y",
					retut: 0,
					clientThemePath: process.env.CLIENT_URL + "/<client_theme>",
					themeId: "custom",
					tlang: "en_US",
					presaveId: presave,
					goteam_draft_only: 0,
					isWide: 1,
					collab: 0,
					nextUrl: "/player?movieId=<movieId>",
					noSkipTutorial: 1,
				},
				allowScriptAccess: "always",
				allowFullScreen: "true",
			};
			break;
		}

		case "/movie":
		case "/player": {
			title = "Video Player";
			attrs = {
				data: process.env.SWF_URL + "/player.swf",
				type: "application/x-shockwave-flash",
				id: "video_player",
			};
			params = {
				flashvars: {
					apiserver: "https://localhost:4343/",
					storePath: process.env.STORE_URL + "/<store>",
					ut: 30,
					autostart: 1,
					isWide: 1,
					clientThemePath: process.env.CLIENT_URL + "/<client_theme>",
				},
				allowScriptAccess: "always",
				allowFullScreen: "true",
			};
			break;
		}

		case "/recordWindow":
		case "/pausedPlayer": {
			title = "Video Player (Paused)";
			attrs = {
				data: process.env.SWF_URL + "/player.swf",
				type: "application/x-shockwave-flash",
				id: "video_player",
				quality: "medium",
			};
			params = {
				flashvars: {
					apiserver: "https://localhost:4343/",
					storePath: process.env.STORE_URL + "/<store>",
					ut: 30,
					autostart: 0,
					isWide: 1,
					clientThemePath: process.env.CLIENT_URL + "/<client_theme>",
				},
				allowScriptAccess: "always",
				allowFullScreen: "true",
			};
			break;
		}
		
		case "/player/embed": {
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
					apiserver: "https://localhost:4343/",
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
	<head>
		<script>
			document.title='${title}',flashvars=${JSON.stringify(params.flashvars)}
		</script>
		<script src="https://akien1337.github.io/vyondlegacyremastered-assets/static/019b83797158fc0c/go/js/wrapper/stuff.js"></script>
		<script>
			if(window.location.pathname == '/player/embed' || window.location.pathname == '/studio' || window.location.pathname == '/go_full' || window.location.pathname == '/studio/tutorial' || window.location.pathname == '/go_full/tutorial') {
				function hideHeaderAndFooter() {
					$("#header").remove();
					$("#footer").remove();
				}
			}
			
			if(window.location.pathname == '/player/embed') {
				function hideWarning() {
					$("#common").remove();
					$("#warning").remove();
				}
			}
		</script>
		<link rel="stylesheet" type="text/css" href="https://akien1337.github.io/vyondlegacyremastered-assets/fonts/1/sailec.css">
		<link rel="stylesheet" type="text/css" href="https://akien1337.github.io/vyondlegacyremastered-assets/static/019b83797158fc0c/go/css/wrapper/modern-normalize.css">
		<link id="common" rel="stylesheet" type="text/css" href="https://akien1337.github.io/vyondlegacyremastered-assets/static/019b83797158fc0c/go/css/common_combined.css.gz.css">
		<link rel="stylesheet" type="text/css" href="https://akien1337.github.io/vyondlegacyremastered-assets/static/019b83797158fc0c/go/css/wrapper/swf.css">
	</head>
	
	<div class="site-header" id="header">
        <div class="navbar site-nav site-nav--legacy" role="navigation">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="/yourvideos" title="Vyond">
                    <img alt="Vyond" src="https://akien1337.github.io/vyondlegacyremastered-assets/static/019b83797158fc0c/go/img/vyond/vyond_logo_legacy_remastered.png">
                </a>
            </div>

            <div class="collapse navbar-collapse navbar-ex1-collapse">
                <ul class="nav navbar-nav navbar-right">
                    <li class="dropdown">
                        <a class="dropdown-toggle" href="#" data-toggle="dropdown">Upload<span class="dropdown-caret"></span></a>
                        <ul class="dropdown-menu dropdown-menu-help">
                            <li>
                                <a onclick="document.getElementById('file').click()" target="_blank">Movie</a>
                            </li>
                            <li>
                                <a onclick="document.getElementById('file2').click()" target="_blank">Character</a>
                            </li>
                        </ul>
                   </li>

                    <script>
                        $('.dropdown-menu-help').click(function (e) {
                            e.stopPropagation();
                        });
                    </script>
                    <li>
                        <a class="hidden-sm hidden-md hidden-lg" href="/create.html">Create</a>
                        <span class="site-nav-btn hidden-xs"><a class="btn btn-green" href="./create">Create</a></span>
                    </li>
					<li>
                        <a class="hidden-sm hidden-md hidden-lg" href="./videomaker.html">Make a Video</a>
                            <span class="site-nav-btn hidden-xs"><a class="btn btn-orange" href="/videomaker">Make a Video</a></span>
                    </li>
                </ul>
            </div>
       </div>
    </div>
		
	<footer class="site-footer" id="footer">
        <div class="container">
            <a href="https://akien1337.github.io/vyondlegacyremastered-assets">Server Page</a> | <a href="https://discord.gg/myusernamesthis">Discord</a> | <a href="https://discord.gg/goanimate">Join GA City</a>
        </div>
    </footer>
	
	<!--Upload forms-->
	<form enctype='multipart/form-data' action='/upload_movie' method='post'>
		<input id='file' type="file" onchange="this.form.submit()" name='import' />
	</form>

	<form enctype='multipart/form-data' action='/upload_character' method='post'>
		<input id='file2' type="file" onchange="this.form.submit()" name='import' accept=".xml" />
	</form>
	<body onload="hideHeaderAndFooter(); hideWarning();">
		<div>
			${toObjectString(attrs, params)}
		</div>
	${stuff.pages[url.pathname] || ''}</body>`)
	return true;
};