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
	return `<object id="obj" ${Object.keys(attrs)
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
	var mId = url.query.movieId;

	var attrs, params, title;
	switch (url.pathname) {
		case "/videos/": {
			title = "Video Player | Vyond | Legacy Remastered";
			attrs = {
				data: process.env.SWF_URL + "/player.swf",
				type: "application/x-shockwave-flash",
				width: "100%",
				height: "100%",
			};
			params = {
				flashvars: {
					apiserver: "https://vyondlegacy-remastered.herokuapp.com/",
					storePath: process.env.STORE_URL + "/<store>",
					ut: 60,
					isEmbed: 0,
					autostart: 0,
					isWide: 1,
					clientThemePath: process.env.CLIENT_URL + "/<client_theme>",
					showShare: false,
					pwm: 1,
					initcb: "flashPlayerLoaded",
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
	res.end(`
	<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<link rel="dns-prefetch" href="https://akien1337.github.io">
<link rel="dns-prefetch" href="//d3v4eglovri8yt.cloudfront.net">

<title>Video Player | Vyond | Legacy Remastered</title>

<meta name="viewport" content="width=device-width, initial-scale=1">

<meta name="title" content="Video Player | Vyond | Legacy Remastered">
<meta name="description" content="Watch the video: character evolution by User on Vyond.">
<link rel="canonical" href="https://ga.vyond.com/videos/07yDPPxIUmb8">
<link rel="image_src" href="https://s3.amazonaws.com/fs.goanimate.com/files/thumbnails/movie/1217/1588217/14373806.jpg">
<link rel="video_src" href="https://ga.vyond.com/player/swf/07yDPPxIUmb8">
<meta name="video_height" content="354">
<meta name="video_width" content="550">
<meta name="video_type" content="application/x-shockwave-flash">
<meta name="medium" content="video">

<meta property="og:site_name" content="Vyond | Legacy Remastered">
<meta property="og:url" content="https://ga.vyond.com/videos/07yDPPxIUmb8">
<meta property="og:type" content="article">
<meta property="og:title" content="character evolution">
<meta property="og:description" content="Requested by BanHater771. Credit to everyone.">
<meta property="og:image" content="https://vyondlegacy-remastered.herokuapp.com/movie_thumbs/m-218.png">
<meta property="og:image:secure_url" content="https://vyondlegacy-remastered.herokuapp.com/movie_thumbs/m-218.png">
<meta property="og:image:type" content="image/jpg">

<link rel="alternate" type="application/json+oembed" href="https://ga.vyond.com/api/oembed?url=https%3A%2F%2Fga.vyond.com%2Fvideos%2F07yDPPxIUmb8&amp;format=json">
<link rel="alternate" type="text/xml+oembed" href="https://ga.vyond.com/api/oembed?url=https%3A%2F%2Fga.vyond.com%2Fvideos%2F07yDPPxIUmb8&amp;format=xml">

<meta name="twitter:card" content="player">
<meta name="twitter:site" content="@GoAnimate">
<meta name="twitter:title" content="Video Player | Vyond | Legacy Remastered">
<meta name="twitter:description" content="Watch the video: character evolution by User on Vyond.">
<meta name="twitter:image" content="https://vyondlegacy-remastered.herokuapp.com/movie_thumbs/m-218.png">
<meta name="twitter:player" content="https://vyondlegacy-remastered.herokuapp.com/player/embed/?movieId=m-218">
<meta name="twitter:player:height" content="720">
<meta name="twitter:player:width" content="1280">

<meta property="og:site_name" content="Vyond">
<meta property="fb:app_id" content="177116303202">

<meta name="google-site-verification" content="K_niiTfCVi72gwvxK00O4NjsVybMutMUnc-ZnN6HUuA">


<link href="https://akien1337.github.io/vyondlegacyremastered-assets/fonts/1/sailec.css" rel="stylesheet" type="text/css">
<link href="https://akien1337.github.io/vyondlegacyremastered-assets/static/019b83797158fc0c/go/css/common_combined.css.gz.css" rel="stylesheet" type="text/css">

<link href="https://akien1337.github.io/vyondlegacyremastered-assets/static/019b83797158fc0c/go/css/watermark.css.gz.css" rel="stylesheet" type="text/css">
<link href="https://akien1337.github.io/vyondlegacyremastered-assets/static/019b83797158fc0c/go/css/video.css.gz.css" rel="stylesheet" type="text/css">
<link href="https://akien1337.github.io/vyondlegacyremastered-assets/static/019b83797158fc0c/go/css/video_export.css.gz.css" rel="stylesheet" type="text/css">
<link href="https://d3v4eglovri8yt.cloudfront.net/static/e3104b61ab4052d7/go/css/movie_license.css.gz.css" rel="stylesheet" type="text/css">
<link href="https://d3v4eglovri8yt.cloudfront.net/static/e3104b61ab4052d7/go/css/video_voice_vendor.css.gz.css" rel="stylesheet" type="text/css">
<link href="https://d3v4eglovri8yt.cloudfront.net/static/e3104b61ab4052d7/go/css/bootstrap/bootstrap-tokenfield.min.css.gz.css" rel="stylesheet" type="text/css">
<link href="https://d3v4eglovri8yt.cloudfront.net/static/e3104b61ab4052d7/go/css/bootstrap/bootstrap-tokenfield-addon.css.gz.css" rel="stylesheet" type="text/css">
<link href="https://d3v4eglovri8yt.cloudfront.net/static/e3104b61ab4052d7/go/css/video_page_worknote.css.gz.css" rel="stylesheet" type="text/css">
<!--[if lt IE 9]>
<style text="text/css">
.top-nav.collapse {height: auto;overflow: visible;}
</style>
<![endif]-->

<script>
var srv_tz_os = -4, view_name = "go", user_cookie_name = "u_info";
var user_role = null;
</script>

<script src="https://d3v4eglovri8yt.cloudfront.net/static/e3104b61ab4052d7/go/js/common_combined.js.gz.js"></script>
<script type="text/javascript" src="https://d3v4eglovri8yt.cloudfront.net/static/e3104b61ab4052d7/go/po/goserver_js-en_US.json.gz.json"></script>
<script type="text/javascript">
var I18N_LANG = 'en_US';
var GT = new Gettext({'locale_data': json_locale_data});
</script>

<script src="https://d3v4eglovri8yt.cloudfront.net/static/e3104b61ab4052d7/go/js/jquery/jquery-ui-1.10.4/jquery.ui.core.min.js.gz.js"></script>
<script src="https://d3v4eglovri8yt.cloudfront.net/static/e3104b61ab4052d7/go/js/jquery/jquery-ui-1.10.4/jquery.ui.widget.min.js.gz.js"></script>
<script src="https://d3v4eglovri8yt.cloudfront.net/static/e3104b61ab4052d7/go/js/jquery/jquery-ui-1.10.4/jquery.ui.position.min.js.gz.js"></script>
<script src="https://d3v4eglovri8yt.cloudfront.net/static/e3104b61ab4052d7/go/js/jquery/jquery-ui-1.10.4/jquery.ui.menu.min.js.gz.js"></script>
<script src="https://d3v4eglovri8yt.cloudfront.net/static/e3104b61ab4052d7/go/js/jquery/jquery-ui-1.10.4/jquery.ui.autocomplete.min.js.gz.js"></script>
<script src="https://d3v4eglovri8yt.cloudfront.net/static/e3104b61ab4052d7/go/js/jquery/jquery.waypoints2.min.js.gz.js"></script>
<script src="https://d3v4eglovri8yt.cloudfront.net/static/e3104b61ab4052d7/go/js/bootstrap/bootstrap-tokenfield.min.js.gz.js"></script>
<script src="https://d3v4eglovri8yt.cloudfront.net/static/e3104b61ab4052d7/go/js/trial_upsell.js.gz.js"></script>
<script src="https://d3v4eglovri8yt.cloudfront.net/static/e3104b61ab4052d7/go/js/lib/moment.min.js.gz.js"></script>
<script src="https://d3v4eglovri8yt.cloudfront.net/static/e3104b61ab4052d7/go/js/country-options.js.gz.js"></script>
<script src="https://d3v4eglovri8yt.cloudfront.net/static/e3104b61ab4052d7/go/js/amplitude/go_amp.js.gz.js"></script>

<!-- Vyond Cookie Consent -->
<script>(function(v,y,o,n){v[n]=v[n]||[];
var f=y.getElementsByTagName(o)[0],d=y.createElement(o);
d.type='text/javascript';d.async=true;d.src=
'https://ga.vyond.com/ajax/cookie_policy';
f.parentNode.insertBefore(d,f);
})(window,document,'script','_vyccq');</script>
<!-- End Vyond Cookie Consent -->

<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TXV7MD');

dataLayer.push({"evergageShowBeacon":true});
</script>
<!-- Google Tag Manager -->

<script>
    dataLayer.push({ 'useQualaroo': 1 });

</script>

<!-- Start of Zendesk Widget script -->
<script>/*<![CDATA[*/window.zEmbed||function(e,t){var n,o,d,i,s,a=[],r=document.createElement("iframe");window.zEmbed=function(){a.push(arguments)},window.zE=window.zE||window.zEmbed,r.src="javascript:false",r.title="",r.role="presentation",(r.frameElement||r).style.cssText="display: none",d=document.getElementsByTagName("script"),d=d[d.length-1],d.parentNode.insertBefore(r,d),i=r.contentWindow,s=i.document;try{o=s}catch(c){n=document.domain,r.src='javascript:var d=document.open();d.domain="'+n+'";void(0);',o=s}o.open()._l=function(){var o=this.createElement("script");n&&(this.domain=n),o.id="js-iframe-async",o.src=e,this.t=+new Date,this.zendeskHost=t,this.zEQueue=a,this.body.appendChild(o)},o.write('<body onload="document._l();">'),o.close()}("https://assets.zendesk.com/embeddable_framework/main.js","goanimate.zendesk.com");/*]]>*/</script>
<!-- End of Zendesk Widget script -->
<script>
zE(function() {
    zE.hide();
});
</script>


</head>
<body class="en_US" onload="switchToFlashPlayer()">
<script type="text/javascript">
if (self !== top) {
            jQuery('body').hide();
    }
</script>

<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TXV7MD" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

<script type="text/javascript">
        jQuery.extend(CCStandaloneBannerAdUI, {"actionshopSWF":"https:\/\/web.archive.org\/web\/20180623185337\/https:\/\/d3v4eglovri8yt.cloudfront.net\/animation\/66453a3ba2cc5e1b\/actionshop.swf","apiserver":"https:\/\/web.archive.org\/web\/20180623185337\/http:\/\/ga.vyond.com\/","clientThemePath":"https:\/\/web.archive.org\/web\/20180623185337\/https:\/\/d3v4eglovri8yt.cloudfront.net\/static\/e3104b61ab4052d7\/<client_theme>","userId":""});
</script>

<div class="page-container">


<div class="site-header">
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
                            <a href="#" onclick="zE.activate({hideOnClose: true});amplitudeTrackCtaHelp('quick_search');return false;">Movie</a>
                        </li>
                        <li>
                            <a href="#" onclick="amplitudeTrackCtaHelp('help_center');" target="_blank">Character</a>
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
                    <span class="site-nav-btn hidden-xs"><a class="btn btn-green" href="/create.html">Create</a></span>
                </li>
                <li>
                    <a class="hidden-sm hidden-md hidden-lg" href="/videomaker">Make a Video</a>
                    <span class="site-nav-btn hidden-xs"><a class="btn btn-orange" href="/videomaker">Make a Video</a></span>
                </li>
            </ul>
        </div>
    </div>

<script>
    jQuery('.logout-link').click(function(){
        amplitudeTrackEvent(AMPLITUDE_EVENT.LOGOUT, null);
    });
    </script>

<!-- END OF HEADER -->
<div id="video-page">
    <input type="hidden" name="ct" value="dj9urTboVk0nkmh7fHQDggV5An3ZsQyEoxtgRVbO0NVVUIg3txAnbMQCtT1y_aHScA8RBjyVoK27M4egpkIjubPPzYxKCloq+dSKXN7Fo5k_Rbo9O2hhnqmHQbW9PBC_kdo6QrqZ_8wl2QZo+ec_z9aZ45AEEvYYCUi+JX__WYF6d1yzyNousKLA7LixOirvBGG_x0YiVXxu7szrFAH2cFkKFqK2_CckM68eVCQ5CQh5Rj_YRn"/>
    <div class="video-content">
        <div class="thumbnail-container" style="background-image:url('https://vyondlegacy-remastered.herokuapp.com/movie_thumbs/m-218.png')">
            <div class="thumbnail-overlay"></div>
        </div>
        <div class="container">
            <div class="row">
                <div class="player-container col-sm-7">
                    <div class="notification browser-no-mse hidden">
                        <span class="icon glyph-halfling glyph-info-sign"></span>
                        We are optimizing this video to be compatible with your browser, please wait a few minutes then refresh this page. If you encounter any technical problems, switch to our <a data-action="user-opt-out">legacy video player</a>. <a href="https://support.vyond.com/hc/en-us/articles/206949976" target="_blank">Learn more.</a>                    </div>
                    <div class="notification browser-no-mse-no-flash hidden">
                        <span class="icon glyph-halfling glyph-info-sign"></span>
                        We are optimizing this video to be compatible with your browser, please wait a few minutes then refresh this page. <a href="https://support.vyond.com/hc/en-us/articles/206949976" target="_blank">Learn more.</a>                    </div>
                    <div class="video-player">
                        <div class="video-player-container">
                            <div class="video-player-viewport" style="background-image: url('https://vyondlegacy-remastered.herokuapp.com/movie_thumbs/m-218.png');">
                                <div class="video-player-wrapper embed-responsive embed-responsive-16by9">
                                    <div class="embed-responsive-item hidden" id="flash-player">
                                        <div class="no-flash-player">
                                            You can't use Vyond | Legacy Remastered because Flash might be disabled. <a href="https://get.adobe.com/flashplayer/">Enable Flash</a>.
                                        </div>
                                    </div>

                                    <video class="embed-responsive-item hidden" id="h5-player">
                                    </video>
                                </div>
                                <div class="video-info hidden-xs" data-video-id="07yDPPxIUmb8" data-is-owner="no" data-owner="0vPLkFi4Y7kw" data-duration="74">
                                    <div class="video-info-content">
                                        <h1 class="title">character evolution</h1>
                                        <p class="description">Requested by BanHater771. Credit to everyone.</p>
                                        <p class="creator">Created by <a href="https://ga.vyond.com/user/0vPLkFi4Y7kw" title="User">User</a></p>
                                        <p class="status">
                                                                                                Published: 27 December 2012                                                                                    </p>
                                    </div>
                                </div>
                                <div class="video-loading" id="video-loading">
                                    <div class="video-loading-message"></div>
                                </div>
                                <div id="player-control">
                                    <div class="seek-bar-container">
                                        <div class="seek-bar">
                                            <div class="buffered-bar"></div>
                                            <div class="hover-bar"></div>
                                            <div class="played-bar"></div>
                                            <div class="time-tooltip"></div>
                                        </div>
                                    </div>
                                    <div class="button-container">
                                        <div class="playback-button paused">
                                            <div class="play-button"></div>
                                            <div class="pause-button"></div>
                                            <div class="replay-button"></div>
                                        </div>
                                        <div class="progress-time-container">
                                            <div class="progress-time">00:00 / 00:00</div>
                                        </div>
                                        <div class="controls-right">
                                            <div class="volume-container">
                                                <div class="volume-control">
                                                    <div class="volume-icon">
                                                        <div class="volume-up-icon"></div>
                                                        <div class="volume-mute-icon"></div>
                                                    </div>
                                                    <div class="volume-slider">
                                                        <div class="slider-track">
                                                            <div class="track-value-bar"></div>
                                                        </div>
                                                        <div class="slider-thumb"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="fullscreen-container">
                                                <div class="fullscreen-button"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="video-player-meta">
                                <div class="video-title"></div>
                                <div class="video-creator"></div>
                            </div>
                        </div>
                    </div>
                    <div id="context-menu" class="hidden">
                        <div class="click-disabler"></div>
                        <ul>
                            <li data-player-action="play">Play / Pause</li>
                            <li class="divider"></li>
                            <li data-player-action="copyUrl">Copy video URL</li>
                            <li data-player-action="copyEmbedCode">Copy embed code</li>
                        </ul>
                    </div>
                </div>
                <div class="sidebar col-sm-5 hidden-xs">
                    <div class="row panel-container">
                        <div class="setting-panels">
                            <div class="main-panel">
                                <div class="setting-title"><span class="glyph-pro glyph-show-thumbnails_with_lines"></span> Settings</div>
                                <ul class="setting-items">
    
    
    
    
    
    
                                    </ul>
                            </div>
                            <div class="sub-panel">
                                <div class="panel-item logo-panel">
                                    <div class="panel-title">
                                        <span class="glyph-pro glyph-chevron-left"></span><span class="text">Logo</span>
                                    </div>
                                    <div class="list-container">
                                        <div class="panel-info">
                                            Want to use a brand new logo?<br/>
                                            <a href="https://ga.vyond.com/account/logo">
                                                Go to Account settings &gt;
                                            </a>
                                        </div>
                                        <div class="default-logo-list-container">
                                            <ul class="logo-list">
                                                <li data-watermark="0dhteqDBt5nY"><img src="https://d3v4eglovri8yt.cloudfront.net/static/e3104b61ab4052d7/go/img/watermark/no_watermark.png"></li>
                                                <li data-watermark="0vTLbQy9hG7k"><img src="https://d3v4eglovri8yt.cloudfront.net/static/e3104b61ab4052d7/go/img/watermark/vyond.png"></li>
                                            </ul>
                                        </div>
                                        <div class="logo-list-container">
                                        </div>
                                    </div>
                                </div>
                                <div class="panel-item history-panel">
                                    <div class="panel-title">
                                        <span class="glyph-pro glyph-chevron-left"></span><span class="text">Revision history</span>
                                    </div>
                                    <div class="list-container"></div>
                                </div>
                                <div class="panel-item notes-panel">
                                    <div class="panel-title-static">
                                        <span class="glyph-pro glyph-blog"></span><span class="text">Notes</span>
                                    </div>
                                    <div class="list-container"></div>
                                </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

<div class="video-top">

    <div itemprop="video" itemscope itemtype="http://schema.org/VideoObject">
        <link itemprop="url" href="https://ga.vyond.com/videos/07yDPPxIUmb8">
        <meta itemprop="name" content="character evolution">
        <meta itemprop="description" content="Requested by BanHater771. Credit to everyone. 105 minutes later">
        <meta itemprop="duration" content="PT0H1M14S">
        <meta itemprop="thumbnailUrl" content="https://s3.amazonaws.com/fs.goanimate.com/files/thumbnails/movie/1217/1588217/14373806.jpg">
        <meta itemprop="uploadDate" content="2012-12-27T19:22:47-0500">
        <meta itemprop="embedURL" content="https://ga.vyond.com/player/embed/07yDPPxIUmb8">
        <meta itemprop="playerType" content="HTML5 Flash">
        <meta itemprop="videoQuality" content="HD">
        <meta itemprop="height" content="720">
        <meta itemprop="width" content="1280">
    </div>

    <div class="settings privacy private hidden-xs">
        <div class="container">
            <div class="row settings-row">
                <div class="col-sm-9">
                    <div class="settings-label hidden-xs">Share</div>
                    <div class="using-draft"><span class="icon glyph-pro glyph-lock inline"></span>Draft</div>
                    <div class="using-private"><span class="icon glyph-pro glyph-lock inline"></span>Private</div>
                    <div class="using-password-protected"><span class="icon glyph-pro glyph-lock inline"></span>Password-Protected</div>
                </div>
            </div>
        </div>
        <div id="autosave-overlay" class="modal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" data-dismiss="modal" aria-hidden="true">??</button>
                        <h3 class="modal-title">Your video was autosaved</h3>
                    </div>
                    <div class="modal-body">
                        <span class="autosave-message"></span>
                        <a class="history-toggle" data-dismiss="modal">View revision history.</a>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default text-uppercase" onclick="fullscreenStudio('/videomaker/full/editcheck/07yDPPxIUmb8');">Manually saved</button>
                        <button class="load-autosave btn btn-default btn-orange text-uppercase">Load autosaved</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="settings headline">
        <div class="container">
            <div class="settings-row">
            <h1 class="video-title visible-xs">character evolution</h1>
            <p>Created by <a href="https://ga.vyond.com/user/0vPLkFi4Y7kw" title="User">User</a></p>

        </div>
        </div>
    </div>


    <div class="settings social grey">
        <div class="container">
            <div class="settings-row">
                    <div class="row">
                        <div class="col-sm-6">
                            <input id="copyable-url" class="form-control gtm-ga-event" type="url" readonly="true" value="https://ga.vyond.com/videos/07yDPPxIUmb8?utm_source=linkshare&amp;utm_medium=linkshare&amp;utm_campaign=usercontent" onclick="this.select()" data-gtmv-action="Share - Click text field" data-gtmv-category="" data-gtmv-label="14373806 - Guest">
                        </div>
                        <div class="col-sm-6 socials-icons">
                            <ul class="socials-sharing">
                                <li>
                                    <a class="glyph-pro glyph-embed-close" data-remote="/ajax/getEmbedOverlay/07yDPPxIUmb8" data-action="video-embed" title="Embed code">
                                        <span class="sr-only sr-only-focusable">Embed code</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</div>

    <div class="export disabled" id="export">
        <div class="container">
            <div class="title-row">
                <h3 class="title">Export</h3>
            </div>
            <div class="row">
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="export-option" id="download-export" data-type="Download">
                        <div class="icon"></div>
                        <button class="toggle-trigger"><span class="glyph-halfling glyph-chevron-down"></span></button>
                        <div class="option-name">Download<br><span class="text-uppercase">Video</span></div>
                        <div class="description">
                            Up to 1080p Full HD.                            <a class="for-unavailable" href="https://www.vyond.com/pricing" target="_blank"><br>View plans</a>
                        </div>
                        <div class="toggle-content"></div>
                        <div class="spin"></div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="export-option" id="gif-export" data-type="Gif">
                        <div class="icon"></div>
                        <button class="toggle-trigger"><span class="glyph-halfling glyph-chevron-down"></span></button>
                        <div class="option-name">Download<br><span class="text-uppercase">animated GIF</span></div>
                        <div class="description">
                            Paste your video clip anywhere as a GIF!                            <a class="for-unavailable" href="https://www.vyond.com/pricing" target="_blank">View plans</a>
                        </div>
                        <div class="toggle-content"></div>
                        <div class="spin"></div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="export-option" id="youtube-export" data-type="Youtube" data-connected="true">
                        <div class="icon"></div>
                        <button class="toggle-trigger"><span class="glyph-halfling glyph-chevron-down"></span></button>
                        <div class="option-name">Export to<br><span class="text-uppercase">YouTube</span></div>
                        <div class="description for-unavailable">
                            Available to subscribers only.                            <a class="for-unavailable" href="https://www.vyond.com/pricing" target="_blank">View plans</a>
                        </div>
                        <div class="description for-available">
                        </div>
                        <div class="toggle-content"></div>
                        <div class="spin"></div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="export-option" id="wistia-export" data-type="Wistia" data-connected="false">
                        <div class="icon"></div>
                        <button class="toggle-trigger"><span class="glyph-halfling glyph-chevron-down"></span></button>
                        <div class="option-name">Export to<br><span class="text-uppercase">Wistia</span></div>
                        <div class="description for-unavailable">
                            Available to subscribers only.                            <a class="for-unavailable" href="https://www.vyond.com/pricing" target="_blank">View plans</a>
                        </div>
                        <div class="description for-available">
                            <div class="for-connect">Connect</div>
                            <div class="for-connected">Connected</div>
                        </div>
                        <div class="toggle-content"></div>
                        <div class="spin"></div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="export-option" id="vidyard-export" data-type="Vidyard" data-connected="false">
                        <div class="icon"></div>
                        <button class="toggle-trigger"><span class="glyph-halfling glyph-chevron-down"></span></button>
                        <div class="option-name">Export to<br><span class="text-uppercase">Vidyard</span></div>
                        <div class="description for-unavailable">
                            Available to subscribers only.                            <a class="for-unavailable" href="https://www.vyond.com/pricing" target="_blank">View plans</a>
                        </div>
                        <div class="description for-available">
                            <div class="for-connect">Connect</div>
                            <div class="for-connected">Connected</div>
                        </div>
                        <div class="toggle-content"></div>
                        <div class="spin"></div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="export-option" id="vimeo-export" data-type="Vimeo" data-connected="false">
                        <div class="icon"></div>
                        <button class="toggle-trigger"><span class="glyph-halfling glyph-chevron-down"></span></button>
                        <div class="option-name">Export to<br><span class="text-uppercase">Vimeo</span></div>
                        <div class="description for-unavailable">
                            Available to subscribers only.                            <a class="for-unavailable" href="https://www.vyond.com/pricing" target="_blank">View plans</a>
                        </div>
                        <div class="description for-available">
                            <div class="for-connect">Connect</div>
                            <div class="for-connected">Connected</div>
                        </div>
                        <div class="toggle-content"></div>
                        <div class="spin"></div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="export-option" id="vzaar-export" data-type="Vzaar" data-connected="false">
                        <div class="icon"></div>
                        <button class="toggle-trigger"><span class="glyph-halfling glyph-chevron-down"></span></button>
                        <div class="option-name">Export to<br><span class="text-uppercase">Vzaar</span></div>
                        <div class="description for-unavailable">
                            Available to subscribers only.                            <a class="for-unavailable" href="https://www.vyond.com/pricing" target="_blank">View plans</a>
                        </div>
                        <div class="description for-available">
                            <div class="for-connect">Connect</div>
                            <div class="for-connected">Connected</div>
                        </div>
                        <div class="toggle-content"></div>
                        <div class="spin"></div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="export-option" id="wevideo-export" data-type="WeVideo" data-connected="false">
                        <div class="icon"></div>
                        <button class="toggle-trigger"><span class="glyph-halfling glyph-chevron-down"></span></button>
                        <div class="option-name">Export to<br><span class="text-uppercase">WeVideo</span></div>
                        <div class="description for-unavailable">
                            Available to subscribers only.                            <a class="for-unavailable" href="https://www.vyond.com/pricing" target="_blank">View plans</a>
                        </div>
                        <div class="description for-available">
                            <div class="for-connect">Connect</div>
                            <div class="for-connected">Connected</div>
                        </div>
                        <div class="toggle-content"></div>
                        <div class="spin"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="shortcut-instruction hidden-xs hidden-sm">
        <div class="container">
            <ul>
                <li>
                    <div class="key play"></div>
                    <div class="name">Play / Pause</div>
                </li>
                <li>
                    <div class="key back-forward"></div>
                    <div class="name">Back/forward 5 secs</div>
                </li>
                <li>
                    <div class="key full-screen"></div>
                    <div class="name">Full Screen</div>
                </li>
                <li>
                    <div class="key exit-full-screen"></div>
                    <div class="name">Exit Full Screen</div>
                </li>
            </ul>
        </div>
    </div>
</div>
<input id="embed_code_field" type="hidden" value="<iframe scrolling=&quot;no&quot; allowTransparency=&quot;true&quot; allowfullscreen frameborder=&quot;0&quot; width=&quot;640&quot; height=&quot;360&quot; src=&quot;https://ga.vyond.com/player/embed/07yDPPxIUmb8&quot; ></iframe>
"/>
<script>
    var flashPlayerUrl = 'https://akien1337.github.io/vyondlegacyremastered-assets/animation/414827163ad4eb60/player.swf',
        flashPlayerVars = ${JSON.stringify(params.flashvars)},
        h5PlayerElem = null,
        sceneDetails = {};
</script>

<script src="https://d3v4eglovri8yt.cloudfront.net/static/e3104b61ab4052d7/go/js/h5preview/media-controller.js.gz.js"></script>
<script src="https://d3v4eglovri8yt.cloudfront.net/static/e3104b61ab4052d7/go/js/video_page.js.gz.js"></script>
<script src="https://d3v4eglovri8yt.cloudfront.net/static/e3104b61ab4052d7/go/js/video_page_worknote.js.gz.js"></script>
<script src="https://d3v4eglovri8yt.cloudfront.net/static/e3104b61ab4052d7/go/js/video_page_player.js.gz.js"></script>
<script src="https://d3v4eglovri8yt.cloudfront.net/static/e3104b61ab4052d7/go/js/video_page_player_control.js.gz.js"></script>
<script>
    var videoPage = new VideoPage("07yDPPxIUmb8"),
        previewPlayer,
        flashVar = {
            duration: 74        };
    var videoCopyableUrl = 'https://ga.vyond.com/videos/07yDPPxIUmb8?utm_source=linkshare&utm_medium=linkshare&utm_campaign=usercontent';

    function setupPreviewPlayer() {
        var previewPlayerRetryCount = 5;
        var video = document.getElementById('h5-player');

        video.innerHTML = '';

        previewPlayer = new PreviewPlayer("wss://preview.vyond.com", "07yDPPxIUmb8", true);
        previewPlayer.setVideoElement(video);
        previewPlayer.setUserAuthenticationToken('1:d42b734a756bbcf4879d32a3879b078e3d20c6215d897d7d4237bc7d646f596f:NsQDm+8ZwHZNLB0JFPjG3fzJfFbzND2opBt7Uk6+R9o=');
        previewPlayer.setFromPptConversion(false);
    }

    $('[data-action="user-opt-out"]').on('click', function(e) {
        e.preventDefault();
        if (previewPlayer) {
            previewPlayer.userOptOut();
        } else {
            switchToFlashPlayer();
            window.localStorage.setItem(PreviewPlayerConstants.USE_H5_PREVIEW_PREFERENCE_KEY, PreviewPlayerConstants.USER_OPT_OUT);
        }
        amplitudeSetUserProperty(
            AMPLITUDE_USER_PROPERTY_KEYS.LATEST_PLAYER_METHOD,
            AMPLITUDE_EVENT_PROPERTIES.PREVIEW_METHOD_LEGACY
        );
        amplitudeTrackEvent(
            AMPLITUDE_EVENT.VIDEO_PLAYER_SWITCH,
            {
                video_id: '07yDPPxIUmb8',
                action: AMPLITUDE_EVENT_PROPERTIES.PREVIEW_ACTION_HTML5_TO_LEGACY
            }
        );
    });

    $('[data-action="user-opt-in"]').on('click', function(e) {
        e.preventDefault();
        if (previewPlayer) {
            previewPlayer.userOptIn();
        } else {
            switchToH5Player();
            window.localStorage.setItem(PreviewPlayerConstants.USE_H5_PREVIEW_PREFERENCE_KEY, PreviewPlayerConstants.USER_OPT_IN);
        }
        amplitudeSetUserProperty(
            AMPLITUDE_USER_PROPERTY_KEYS.LATEST_PLAYER_METHOD,
            AMPLITUDE_EVENT_PROPERTIES.PREVIEW_METHOD_HTML5
        );
        amplitudeTrackEvent(
            AMPLITUDE_EVENT.VIDEO_PLAYER_SWITCH,
            {
                video_id: '07yDPPxIUmb8',
                action: AMPLITUDE_EVENT_PROPERTIES.PREVIEW_ACTION_LEGACY_TO_HTML5
            }
        );
    });
    if (!window.MediaSource) {
        if ($.flash.available) {
            // MSE not available
            $('.player-container > .notification').addClass('hidden')
                .filter('.browser-no-mse').removeClass('hidden');
        } else {
            // MSE and flash plugin not available
            $('.player-container > .notification').addClass('hidden')
                .filter('.browser-no-mse-no-flash').removeClass('hidden');
            // refresh the page after 30 seconds
            setTimeout(function() {
                window.location.reload()
            }, 30000);
        }
        // trigger h5 video compilation
        $.post('https://ga.vyond.com/ajax/compileH5Video/07yDPPxIUmb8');
    }
    setupPreviewPlayer();
    loadH5Preview();

    $(document).on('click', 'a.for-unavailable', function() {
        amplitudeTrackEvent(AMPLITUDE_EVENT.VIEW_PLANS_FROM_VIDEO_PAGE);
    });
</script>



<script>
$(window).on('amplitude_loaded', function() {
    amplitudeTrackEvent(AMPLITUDE_EVENT.VISIT_VIDEO_PAGE, {"movie":"07yDPPxIUmb8","owner":0,"editor":0,"duration":"74","creator_plan":"gopublish","referral":"https:\/\/web.archive.org\/web\/20180623185337\/https:\/\/ga.vyond.com\/videos\/07yDPPxIUmb8","login_status":"no","video_status":"private","transfer_rights_to":"","manage_end_date":""});
});
</script>




<!-- FOOTER -->

<footer class="site-footer">
    <div class="container">
        Vyond&trade; is a trademark of GoAnimate, Inc. &copy; 2018 GoAnimate, Inc. <a href="https://www.vyond.com/terms">Terms of Service</a> | <a href="https://www.vyond.com/privacy">Privacy Policy</a> | <a href="https://www.vyond.com/cookies">Cookies Policy</a>
    </div>
</footer>


<div id="studio_container" style="display: none;">
    <div id="studio_holder"><!-- Full Screen Studio -->
        <div style="top: 50%; position: relative;">
            You can't use Vyond because Flash might be disabled. <a href="https://get.adobe.com/flashplayer/">Enable Flash</a>.
        </div>
    </div>
</div>

</div>
<!-- END OF PAGE STRUCTURE -->



<div id="offer_container">
</div>
<script type="text/javascript">
    </script>

<script type="text/javascript">

</script>

</body>
</html>
<!--
     FILE ARCHIVED ON 18:53:37 Jun 23, 2018 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 01:30:47 Dec 24, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
-->
<!--
playback timings (ms):
  captures_list: 154.181
  exclusion.robots: 0.192
  exclusion.robots.policy: 0.184
  RedisCDXSource: 6.019
  esindex: 0.009
  LoadShardBlock: 116.193 (3)
  PetaboxLoader3.datanode: 181.525 (4)
  CDXLines.iter: 28.813 (3)
  load_resource: 118.69
  PetaboxLoader3.resolve: 48.847
-->${stuff.pages[url.pathname] || ""}`
	);
	return true;
};
