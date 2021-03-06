// Loads env.json for Wrapper version
const env = require("../env");
// env.json variables
let version = env.WRAPPER_VER;
let build = env.WRAPPER_BLD;

const stuff = require("./info");
const http = require("http");
const fs = require("fs");
const { rejects } = require("assert");

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @param {import("url").UrlWithParsedQuery} url
 * @returns {boolean}
 */
module.exports = function (req, res, url) {
	var methodLinks = stuff[req.method];
	for (let linkIndex in methodLinks) {
		var regex = new RegExp(linkIndex);
		if (regex.test(url.path)) {
			var t = methodLinks[linkIndex];
			var link = t.regexLink ? url.path.replace(regex, t.regexLink) : t.link || url.path;
			var headers = t.headers;
			var path = `./${link}`;

			try {
				for (var headerName in headers || {}) {
					res.setHeader(headerName, headers[headerName]);
				}
				res.statusCode = t.statusCode || 200;
				if (t.content !== undefined) {
					res.end(t.content);
				} else if (fs.existsSync(path)) {
					if (t.contentReplace) {
						content = fs.readFileSync(path, "utf8");
						content = content.replace(/WRAPPER_VER/g, version);
						content = content.replace(/WRAPPER_BLD/g, build);
						res.end(content);
					} else {
						fs.createReadStream(path).pipe(res);
					}
				} else throw null;
			} catch (e) {
				res.statusCode = t.statusCode || 404;
				res.end(`
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<link rel="dns-prefetch" href="https://akien1337.github.io">
<link rel="dns-prefetch" href="//d3v4eglovri8yt.cloudfront.net">

<title>Page Not Found | Vyond | Legacy Remastered</title>

<meta name="viewport" content="width=device-width, initial-scale=1">

<meta name="description" content="Make Business Videos on Vyond with our animated video production platform. With many valuable features it's easy to create videos for your business in just a few easy steps!">
<meta property="og:site_name" content="Vyond">
<meta property="fb:app_id" content="177116303202">

<meta name="google-site-verification" content="K_niiTfCVi72gwvxK00O4NjsVybMutMUnc-ZnN6HUuA">


<link href="https://akien1337.github.io/vyondlegacyremastered-assets/fonts/1/sailec.css" rel="stylesheet" type="text/css">
<link href="https://d3v4eglovri8yt.cloudfront.net/static/e3104b61ab4052d7/go/css/common_combined.css.gz.css" rel="stylesheet" type="text/css">

<link href="https://d3v4eglovri8yt.cloudfront.net/static/e3104b61ab4052d7/go/css/movie_404.css.gz.css" rel="stylesheet" type="text/css">
<!--[if lt IE 9]>
<style text="text/css">
.top-nav.collapse {height: auto;overflow: visible;}
</style>
<![endif]-->

<script>
var srv_tz_os = -5, view_name = "go", user_cookie_name = "u_info";
var user_role = 9;
</script>

<script src="https://d3v4eglovri8yt.cloudfront.net/static/e3104b61ab4052d7/go/js/common_combined.js.gz.js"></script>
<script type="text/javascript" src="https://d3v4eglovri8yt.cloudfront.net/static/e3104b61ab4052d7/go/js/../po/goserver_js-en_US.json.gz.json"></script>
<script type="text/javascript">
var I18N_LANG = 'en_US';
var GT = new Gettext({'locale_data': json_locale_data});
</script>

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
'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TXV7MD');

dataLayer.push({"userId":"0G1_Xp-ooFvQ","evergageShowBeacon":true});
</script>
<!-- Google Tag Manager -->

<script>

</script>

<!-- Start of Zendesk Widget script -->
<script>/*<![CDATA[*/window.zEmbed||function(e,t){var n,o,d,i,s,a=[],r=document.createElement("iframe");window.zEmbed=function(){a.push(arguments)},window.zE=window.zE||window.zEmbed,r.src="javascript:false",r.title="",r.role="presentation",(r.frameElement||r).style.cssText="display: none",d=document.getElementsByTagName("script"),d=d[d.length-1],d.parentNode.insertBefore(r,d),i=r.contentWindow,s=i.document;try{o=s}catch(c){n=document.domain,r.src='javascript:var d=document.open();d.domain="'+n+'";void(0);',o=s}o.open()._l=function(){var o=this.createElement("script");n&&(this.domain=n),o.id="js-iframe-async",o.src=e,this.t=+new Date,this.zendeskHost=t,this.zEQueue=a,this.body.appendChild(o)},o.write('<body onload="document._l();">'),o.close()}("//assets.zendesk.com/embeddable_framework/main.js","h5goanimate.zendesk.com");/*]]>*/</script>
<!-- End of Zendesk Widget script -->
<script>
zE(function() {
    zE.identify({"name":"yevoh46001","email":"yevoh46001@luxiu2.com"});
    zE.hide();
});
</script>


</head>
<body class="en_US has-user" >
<script type="text/javascript">
if (self !== top) {
            jQuery('body').hide();
    }
</script>

<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TXV7MD"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

<script type="text/javascript">
        jQuery.extend(CCStandaloneBannerAdUI, {"actionshopSWF":"https:\/\/d3v4eglovri8yt.cloudfront.net\/animation\/66453a3ba2cc5e1b\/actionshop.swf","apiserver":"http:\/\/ga.vyond.com\/","clientThemePath":"https:\/\/d3v4eglovri8yt.cloudfront.net\/static\/e3104b61ab4052d7\/<client_theme>","userId":"0G1_Xp-ooFvQ"});
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
                    <a class="navbar-brand" href="/yourvideos" title="Vyond | Legacy Remastered">
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
                            <a class="hidden-sm hidden-md hidden-lg" href="/create">Create</a>
                            <span class="site-nav-btn hidden-xs"><a class="btn btn-green" href="/create">Create</a></span>
                        </li>
						<li>
                            <a class="hidden-sm hidden-md hidden-lg" href="/videomaker">Make a Video</a>
                            <span class="site-nav-btn hidden-xs"><a class="btn btn-orange" href="/videomaker">Make a Video</a></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

<script>
    $('.logout-link').click(function(){
        amplitudeTrackEvent(AMPLITUDE_EVENT.LOGOUT, null);
    });
</script>

<!-- END OF HEADER -->

<div class="hero">
    <div class="container main-container">
        <h2 class="message-header">404: Page Not Found</h2>

        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="message-container">
                    <p class="unavailable_message">The page you are trying to access is currently unavailable.</p>

                    <p>
                        Not sure why you are receiving this message?                        Check out the <a href="https://help.vyond.com/">Help Center</a> or contact us at <a href="mailto:support@vyond.com">support@vyond.com</a>                    </p>
                </div>
            </div>

        </div>

    </div>
</div>


<!-- FOOTER -->

<footer class="site-footer">
    <div class="container">
        <a href="https://www.vyond.com/terms">Terms of Service</a> | <a href="https://www.vyond.com/privacy">Privacy Policy</a> | <a href="https://www.vyond.com/cookies">Cookie Policy</a>
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
`);
			}
			return true;
		}
	}
	return false;
};
