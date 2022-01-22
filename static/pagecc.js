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
		case "/charactercreator/new_char/": {
			title = 'The Character Creator From Vyond | Legacy Remastered - Make A Character!';
			attrs = {
				data: process.env.SWF_URL + '/cc.swf', // data: 'cc.swf',
				type: 'application/x-shockwave-flash', 
				id: 'char_creator',
			};
			params = {
				flashvars: {
					apiserver: "https://vyondlegacy-remastered.herokuapp.com/",
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
                    nextUrl: "/charactercreator/${theme}",
				},
				allowScriptAccess: "always",
				movie: process.env.SWF_URL + "/cc.swf", // 'http://localhost/cc.swf'
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
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <link rel="dns-prefetch" href="https://akien1337.github.io">
    <link rel="dns-prefetch" href="//d3v4eglovri8yt.cloudfront.net">

    <title>The Character Creator from Vyond | Legacy Remastered - Make a Character!</title>

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="description" content="The Character Creator from Vyond - Create a character online with Vyond.">
    <meta property="og:site_name" content="Vyond">
    <meta property="fb:app_id" content="177116303202">

    <meta name="google-site-verification" content="K_niiTfCVi72gwvxK00O4NjsVybMutMUnc-ZnN6HUuA">

    <link rel="canonical" href="/charactercreator/whiteboard">

    <link href="https://akien1337.github.io/vyondlegacyremastered-assets/fonts/1/sailec.css" rel="stylesheet" type="text/css">
    <link href="https://akien1337.github.io/vyondlegacyremastered-assets/static/019b83797158fc0c/go/css/common_combined.css.gz.css" rel="stylesheet" type="text/css">

    <link href="https://akien1337.github.io/vyondlegacyremastered-assets/static/019b83797158fc0c/go/css/cc.css.gz.css" rel="stylesheet" type="text/css">
    <!--[if lt IE 9]>
    <style text="text/css">
    .top-nav.collapse {height: auto;overflow: visible;}
    </style>
    <![endif]-->

    <script type="text/javascript" src="http://cdn.pardot.com/pd.js"></script>
    <script type="text/javascript" src="http://cdn.pardot.com/pd.js"></script>
    <script type="text/javascript" src="http://cdn.pardot.com/pd.js"></script>
    <script type="text/javascript" src="http://cdn.pardot.com/pd.js"></script>
    <script type="text/javascript" async="" src="//munchkin.marketo.net/159/munchkin.js"></script>
    <script type="text/javascript" async="" src="//munchkin.marketo.net/159/munchkin.js"></script>
    <script type="text/javascript" async="" src="//munchkin.marketo.net/159/munchkin.js"></script>
    <script type="text/javascript" async="" src="//munchkin.marketo.net/159/munchkin.js"></script>
    <script type="text/javascript" async="" src="https://cdn.amplitude.com/libs/amplitude-4.1.1-min.gz.js"></script>
    <script type="text/javascript" async="" src="https://cdn.amplitude.com/libs/amplitude-4.1.1-min.gz.js"></script>
    <script type="text/javascript" async="" src="https://cdn.amplitude.com/libs/amplitude-4.1.1-min.gz.js"></script>
    <script type="text/javascript" async="" src="https://cdn.amplitude.com/libs/amplitude-4.1.1-min.gz.js"></script>
    <script async="" src="//connect.facebook.net/en_US/fbevents.js"></script>
    <script async="" src="//www.googletagmanager.com/gtm.js?id=GTM-TXV7MD"></script>
    <script type="text/javascript" async="" src="https://ga.vyond.com/ajax/cookie_policy"></script>
    <script type="text/javascript" src="https://pi.pardot.com/pd.js"></script>
    <script type="text/javascript" src="https://pi.pardot.com/pd.js"></script>
    <script type="text/javascript" src="https://pi.pardot.com/pd.js"></script>
    <script type="text/javascript" src="https://pi.pardot.com/pd.js"></script>
    <script type="text/javascript" async="" src="https://cdn.amplitude.com/libs/amplitude-4.1.1-min.gz.js"></script>
    <script type="text/javascript" async="" src="https://cdn.amplitude.com/libs/amplitude-4.1.1-min.gz.js"></script>
    <script type="text/javascript" async="" src="https://cdn.amplitude.com/libs/amplitude-4.1.1-min.gz.js"></script>
    <script type="text/javascript" async="" src="https://cdn.amplitude.com/libs/amplitude-4.1.1-min.gz.js"></script>
    <script src="https://connect.facebook.net/signals/config/784667875001149?v=2.9.15&amp;r=stable" async=""></script>
    <script async="" src="//connect.facebook.net/en_US/fbevents.js"></script>
    <script type="text/javascript" async="" src="https://sjs.bizographics.com/insight.min.js"></script>
    <script type="text/javascript" async="" src="//www.googleadservices.com/pagead/conversion_async.js"></script>
    <script type="text/javascript" async="" src="https://www.google-analytics.com/analytics.js"></script>
    <script async="" src="//www.googletagmanager.com/gtm.js?id=GTM-TXV7MD"></script>
    <script type="text/javascript" async="" src="https://ga.vyond.com/ajax/cookie_policy"></script>
    <script type="text/javascript" src="https://pi.pardot.com/pd.js"></script>
    <script type="text/javascript" src="https://pi.pardot.com/pd.js"></script>
    <script type="text/javascript" src="https://pi.pardot.com/pd.js"></script>
    <script type="text/javascript" async="" src="https://cdn.amplitude.com/libs/amplitude-4.1.1-min.gz.js"></script>
    <script type="text/javascript" async="" src="https://cdn.amplitude.com/libs/amplitude-4.1.1-min.gz.js"></script>
    <script type="text/javascript" async="" src="https://cdn.amplitude.com/libs/amplitude-4.1.1-min.gz.js"></script>
    <script src="https://connect.facebook.net/signals/config/784667875001149?v=2.9.15&amp;r=stable" async=""></script>
    <script async="" src="//connect.facebook.net/en_US/fbevents.js"></script>
    <script type="text/javascript" async="" src="https://sjs.bizographics.com/insight.min.js"></script>
    <script type="text/javascript" async="" src="//www.googleadservices.com/pagead/conversion_async.js"></script>
    <script type="text/javascript" async="" src="https://www.google-analytics.com/analytics.js"></script>
    <script async="" src="//www.googletagmanager.com/gtm.js?id=GTM-TXV7MD"></script>
    <script type="text/javascript" async="" src="https://ga.vyond.com/ajax/cookie_policy"></script>
    <script type="text/javascript" src="https://pi.pardot.com/pd.js"></script>
    <script type="text/javascript" src="https://pi.pardot.com/pd.js"></script>
    <script type="text/javascript" async="" src="https://cdn.amplitude.com/libs/amplitude-4.1.1-min.gz.js"></script>
    <script type="text/javascript" async="" src="https://cdn.amplitude.com/libs/amplitude-4.1.1-min.gz.js"></script>
    <script src="https://connect.facebook.net/signals/config/784667875001149?v=2.9.15&amp;r=stable" async=""></script>
    <script async="" src="//connect.facebook.net/en_US/fbevents.js"></script>
    <script type="text/javascript" async="" src="https://sjs.bizographics.com/insight.min.js"></script>
    <script type="text/javascript" async="" src="//www.googleadservices.com/pagead/conversion_async.js"></script>
    <script type="text/javascript" async="" src="https://www.google-analytics.com/analytics.js"></script>
    <script async="" src="//www.googletagmanager.com/gtm.js?id=GTM-TXV7MD"></script>
    <script type="text/javascript" async="" src="https://ga.vyond.com/ajax/cookie_policy"></script>
    <script type="text/javascript" src="https://pi.pardot.com/pd.js"></script>
    <script type="text/javascript" async="" src="//munchkin.marketo.net/155/munchkin.js"></script>
    <script type="text/javascript" async="" src="https://cdn.amplitude.com/libs/amplitude-4.1.1-min.gz.js"></script>
    <script src="https://connect.facebook.net/signals/config/784667875001149?v=2.9.15&amp;r=stable" async=""></script>
    <script async="" src="//connect.facebook.net/en_US/fbevents.js"></script>
    <script type="text/javascript" async="" src="https://sjs.bizographics.com/insight.min.js"></script>
    <script type="text/javascript" async="" src="//www.googleadservices.com/pagead/conversion_async.js"></script>
    <script type="text/javascript" async="" src="https://www.google-analytics.com/analytics.js"></script>
    <script async="" src="//www.googletagmanager.com/gtm.js?id=GTM-TXV7MD"></script>
    <script type="text/javascript" async="" src="https://ga.vyond.com/ajax/cookie_policy"></script>
    <script>
        var srv_tz_os = -4, view_name = "go", user_cookie_name = "u_info";
        var user_role = 11;
    </script>

    <script src="https://d3v4eglovri8yt.cloudfront.net/static/ad44370a650793d9/go/js/common_combined.js.gz.js"></script>
    <script type="text/javascript" src="https://d3v4eglovri8yt.cloudfront.net/static/ad44370a650793d9/go/po/goserver_js-en_US.json.gz.json"></script>
    <script type="text/javascript">
        var I18N_LANG = 'en_US';
        var GT = new Gettext({ 'locale_data': json_locale_data });
    </script>

    <script src="https://d3v4eglovri8yt.cloudfront.net/static/ad44370a650793d9/go/js/sessionChecker.js.gz.js"></script>
    <script src="https://d3v4eglovri8yt.cloudfront.net/static/ad44370a650793d9/go/js/amplitude/go_amp.js.gz.js"></script>

    <!-- Vyond Cookie Consent -->
    <script>
    (function (v, y, o, n) {
            v[n] = v[n] || [];
            var f = y.getElementsByTagName(o)[0], d = y.createElement(o);
            d.type = 'text/javascript'; d.async = true; d.src =
                'https://ga.vyond.com/ajax/cookie_policy';
            f.parentNode.insertBefore(d, f);
        })(window, document, 'script', '_vyccq');</script>
    <!-- End Vyond Cookie Consent -->
    <!-- Google Tag Manager -->
    <script>
    (function (w, d, s, l, i) {
            w[l] = w[l] || []; w[l].push({
                'gtm.start':
                    new Date().getTime(), event: 'gtm.js'
            }); var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                    '//www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-TXV7MD');

        dataLayer.push({ "userId": "0TBAAga2Mn6g" });
    </script>
    <!-- Google Tag Manager -->

    <script>

    </script>



    <script type="text/javascript" async="" src="//munchkin.marketo.net/munchkin.js"></script>
    <script src="https://googleads.g.doubleclick.net/pagead/viewthroughconversion/956549168/?random=1577646690841&amp;cv=9&amp;fst=1577646690841&amp;num=1&amp;guid=ON&amp;resp=GooglemKTybQhCsO&amp;u_h=900&amp;u_w=1600&amp;u_ah=860&amp;u_aw=1600&amp;u_cd=24&amp;u_his=1&amp;u_tz=-360&amp;u_java=false&amp;u_nplug=4&amp;u_nmime=6&amp;gtm=2wgc61&amp;sendb=1&amp;ig=1&amp;frm=0&amp;url=https%3A%2F%2Ftvy4gv.000webhostapp.com%2FThe%2520Character%2520Creator%2520from%2520Vyond%2520-%2520Make%2520a%2520Character%2520Online%2520cw&amp;ref=https%3A%2F%2Fwww.youtube.com%2F&amp;tiba=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;hn=www.googleadservices.com&amp;async=1&amp;rfmt=3&amp;fmt=4"></script>
    <script type="text/javascript" src="https://pi.pardot.com/analytics?ver=3&amp;visitor_id=104628861&amp;pi_opt_in=&amp;campaign_id=3286&amp;account_id=715453&amp;title=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;url=https%3A%2F%2Ftvy4gv.000webhostapp.com%2FThe%2520Character%2520Creator%2520from%2520Vyond%2520-%2520Make%2520a%2520Character%2520Online%2520cw&amp;referrer=https%3A%2F%2Fwww.youtube.com%2F"></script>
    <script type="text/javascript" src="https://think.vyond.com/analytics?conly=true&amp;visitor_id=104628861&amp;visitor_id_sign=564cb664e138513f2d3c85e7e3fb715e5ea28c8930b2bdc7bc1d8495145fde127b0d2fa2f962319aff6e09e96a9ca0e1f08ffa9d"></script>
    <script type="text/javascript" src="https://think.vyond.com/analytics?conly=true&amp;visitor_id=104628861&amp;pi_opt_in=&amp;campaign_id=3286&amp;account_id=715453&amp;title=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;url=https%3A%2F%2Ftvy4gv.000webhostapp.com%2FThe%2520Character%2520Creator%2520from%2520Vyond%2520-%2520Make%2520a%2520Character%2520Online%2520cw&amp;referrer=https%3A%2F%2Fwww.youtube.com%2F&amp;visitor_id_sign=564cb664e138513f2d3c85e7e3fb715e5ea28c8930b2bdc7bc1d8495145fde127b0d2fa2f962319aff6e09e96a9ca0e1f08ffa9d"></script>
    <script src="https://googleads.g.doubleclick.net/pagead/viewthroughconversion/956549168/?random=1578355676047&amp;cv=9&amp;fst=1578355676047&amp;num=1&amp;guid=ON&amp;resp=GooglemKTybQhCsO&amp;u_h=768&amp;u_w=1366&amp;u_ah=728&amp;u_aw=1366&amp;u_cd=24&amp;u_his=1&amp;u_tz=-420&amp;u_java=false&amp;u_nplug=4&amp;u_nmime=6&amp;gtm=2wgc61&amp;sendb=1&amp;ig=1&amp;frm=0&amp;url=https%3A%2F%2Fbedrockanimate.000webhostapp.com%2FCharacter%2520Creator&amp;ref=https%3A%2F%2Fbedrockanimate.000webhostapp.com%2F&amp;tiba=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;hn=www.googleadservices.com&amp;async=1&amp;rfmt=3&amp;fmt=4"></script>
    <script type="text/javascript" async="" src="//munchkin.marketo.net/munchkin.js"></script>
    <script type="text/javascript" async="" src="//munchkin.marketo.net/munchkin.js"></script>
    <script src="https://googleads.g.doubleclick.net/pagead/viewthroughconversion/956549168/?random=1577647016887&amp;cv=9&amp;fst=1577647016887&amp;num=1&amp;guid=ON&amp;resp=GooglemKTybQhCsO&amp;u_h=900&amp;u_w=1600&amp;u_ah=860&amp;u_aw=1600&amp;u_cd=24&amp;u_his=1&amp;u_tz=-360&amp;u_java=false&amp;u_nplug=4&amp;u_nmime=6&amp;gtm=2wgc61&amp;sendb=1&amp;ig=1&amp;frm=0&amp;url=https%3A%2F%2Fkennyanimate.000webhostapp.com%2FCharacter-Creator&amp;ref=https%3A%2F%2Ffiles.000webhost.com%2F&amp;tiba=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;hn=www.googleadservices.com&amp;async=1&amp;rfmt=3&amp;fmt=4"></script>
    <script type="text/javascript" src="https://pi.pardot.com/analytics?ver=3&amp;visitor_id=104628861&amp;visitor_id_sign=564cb664e138513f2d3c85e7e3fb715e5ea28c8930b2bdc7bc1d8495145fde127b0d2fa2f962319aff6e09e96a9ca0e1f08ffa9d&amp;pi_opt_in=&amp;campaign_id=3286&amp;account_id=715453&amp;title=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;url=https%3A%2F%2Fkennyanimate.000webhostapp.com%2FCharacter-Creator&amp;referrer=https%3A%2F%2Ffiles.000webhost.com%2F"></script>
    <script type="text/javascript" src="https://pi.pardot.com/analytics?ver=3&amp;visitor_id=104628861&amp;visitor_id_sign=564cb664e138513f2d3c85e7e3fb715e5ea28c8930b2bdc7bc1d8495145fde127b0d2fa2f962319aff6e09e96a9ca0e1f08ffa9d&amp;pi_opt_in=&amp;campaign_id=3286&amp;account_id=715453&amp;title=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;url=https%3A%2F%2Fkennyanimate.000webhostapp.com%2FCharacter-Creator&amp;referrer=https%3A%2F%2Ffiles.000webhost.com%2F"></script>
    <script src="https://googleads.g.doubleclick.net/pagead/viewthroughconversion/956549168/?random=1578180470260&amp;cv=9&amp;fst=1578180470260&amp;num=1&amp;guid=ON&amp;resp=GooglemKTybQhCsO&amp;eid=376635471&amp;u_h=768&amp;u_w=1366&amp;u_ah=728&amp;u_aw=1366&amp;u_cd=24&amp;u_his=1&amp;u_tz=-420&amp;u_java=false&amp;u_nplug=4&amp;u_nmime=6&amp;gtm=2wgc61&amp;sendb=1&amp;ig=1&amp;frm=0&amp;url=https%3A%2F%2Flvmbacknew.000webhostapp.com%2FCharacter-Creator&amp;ref=https%3A%2F%2Flvmbacknew.000webhostapp.com%2F&amp;tiba=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;hn=www.googleadservices.com&amp;async=1&amp;rfmt=3&amp;fmt=4"></script>
    <script type="text/javascript" src="https://think.vyond.com/analytics?conly=true&amp;visitor_id=104628861&amp;visitor_id_sign=564cb664e138513f2d3c85e7e3fb715e5ea28c8930b2bdc7bc1d8495145fde127b0d2fa2f962319aff6e09e96a9ca0e1f08ffa9d&amp;pi_opt_in=&amp;campaign_id=3286&amp;account_id=715453&amp;title=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;url=https%3A%2F%2Fkennyanimate.000webhostapp.com%2FCharacter-Creator&amp;referrer=https%3A%2F%2Ffiles.000webhost.com%2F"></script>
    <script type="text/javascript" src="https://think.vyond.com/analytics?conly=true&amp;visitor_id=104628861&amp;visitor_id_sign=564cb664e138513f2d3c85e7e3fb715e5ea28c8930b2bdc7bc1d8495145fde127b0d2fa2f962319aff6e09e96a9ca0e1f08ffa9d&amp;pi_opt_in=&amp;campaign_id=3286&amp;account_id=715453&amp;title=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;url=https%3A%2F%2Fkennyanimate.000webhostapp.com%2FCharacter-Creator&amp;referrer=https%3A%2F%2Ffiles.000webhost.com%2F"></script>
    <script type="text/javascript" async="" src="//munchkin.marketo.net/munchkin.js"></script>
    <script type="text/javascript" async="" src="//munchkin.marketo.net/munchkin.js"></script>
    <script type="text/javascript" async="" src="//munchkin.marketo.net/munchkin.js"></script>
    <script type="text/javascript" src="https://pi.pardot.com/analytics?ver=3&amp;visitor_id=111953891&amp;pi_opt_in=&amp;campaign_id=3286&amp;account_id=715453&amp;title=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;url=https%3A%2F%2Flvmbacknew.000webhostapp.com%2FCharacter-Creator&amp;referrer=https%3A%2F%2Flvmbacknew.000webhostapp.com%2F"></script>
    <script type="text/javascript" src="https://pi.pardot.com/analytics?ver=3&amp;visitor_id=111953891&amp;pi_opt_in=&amp;campaign_id=3286&amp;account_id=715453&amp;title=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;url=https%3A%2F%2Flvmbacknew.000webhostapp.com%2FCharacter-Creator&amp;referrer=https%3A%2F%2Flvmbacknew.000webhostapp.com%2F"></script>
    <script type="text/javascript" src="https://pi.pardot.com/analytics?ver=3&amp;visitor_id=111953891&amp;pi_opt_in=&amp;campaign_id=3286&amp;account_id=715453&amp;title=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;url=https%3A%2F%2Flvmbacknew.000webhostapp.com%2FCharacter-Creator&amp;referrer=https%3A%2F%2Flvmbacknew.000webhostapp.com%2F"></script>
    <script type="text/javascript" src="https://think.vyond.com/analytics?conly=true&amp;visitor_id=111953891&amp;pi_opt_in=&amp;campaign_id=3286&amp;account_id=715453&amp;title=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;url=https%3A%2F%2Flvmbacknew.000webhostapp.com%2FCharacter-Creator&amp;referrer=https%3A%2F%2Flvmbacknew.000webhostapp.com%2F&amp;visitor_id_sign=2f62839066bacd2990181f0c99ad71cb87b9f7cf5512b05022cabe3dbf5876a6404cbfa717f7e61f43dab27fa0cf6a6efb27a029"></script>
    <script type="text/javascript" src="https://think.vyond.com/analytics?conly=true&amp;visitor_id=111953891&amp;pi_opt_in=&amp;campaign_id=3286&amp;account_id=715453&amp;title=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;url=https%3A%2F%2Flvmbacknew.000webhostapp.com%2FCharacter-Creator&amp;referrer=https%3A%2F%2Flvmbacknew.000webhostapp.com%2F&amp;visitor_id_sign=2f62839066bacd2990181f0c99ad71cb87b9f7cf5512b05022cabe3dbf5876a6404cbfa717f7e61f43dab27fa0cf6a6efb27a029"></script>
    <script type="text/javascript" src="https://think.vyond.com/analytics?conly=true&amp;visitor_id=111953891&amp;pi_opt_in=&amp;campaign_id=3286&amp;account_id=715453&amp;title=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;url=https%3A%2F%2Flvmbacknew.000webhostapp.com%2FCharacter-Creator&amp;referrer=https%3A%2F%2Flvmbacknew.000webhostapp.com%2F&amp;visitor_id_sign=2f62839066bacd2990181f0c99ad71cb87b9f7cf5512b05022cabe3dbf5876a6404cbfa717f7e61f43dab27fa0cf6a6efb27a029"></script>
    <script type="text/javascript" async="" src="//munchkin.marketo.net/munchkin.js"></script>
    <script type="text/javascript" async="" src="//munchkin.marketo.net/munchkin.js"></script>
    <script type="text/javascript" async="" src="//munchkin.marketo.net/munchkin.js"></script>
    <script type="text/javascript" async="" src="//munchkin.marketo.net/munchkin.js"></script>
    <script type="text/javascript" src="https://pi.pardot.com/analytics?ver=3&amp;visitor_id=114254085&amp;pi_opt_in=&amp;campaign_id=3286&amp;account_id=715453&amp;title=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;url=https%3A%2F%2Fbedrockanimate.000webhostapp.com%2FCharacter%2520Creator&amp;referrer=https%3A%2F%2Fbedrockanimate.000webhostapp.com%2F"></script>
    <script type="text/javascript" src="https://pi.pardot.com/analytics?ver=3&amp;visitor_id=114254085&amp;pi_opt_in=&amp;campaign_id=3286&amp;account_id=715453&amp;title=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;url=https%3A%2F%2Fbedrockanimate.000webhostapp.com%2FCharacter%2520Creator&amp;referrer=https%3A%2F%2Fbedrockanimate.000webhostapp.com%2F"></script>
    <script type="text/javascript" src="https://pi.pardot.com/analytics?ver=3&amp;visitor_id=114254085&amp;pi_opt_in=&amp;campaign_id=3286&amp;account_id=715453&amp;title=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;url=https%3A%2F%2Fbedrockanimate.000webhostapp.com%2FCharacter%2520Creator&amp;referrer=https%3A%2F%2Fbedrockanimate.000webhostapp.com%2F"></script>
    <script type="text/javascript" src="https://pi.pardot.com/analytics?ver=3&amp;visitor_id=114254085&amp;pi_opt_in=&amp;campaign_id=3286&amp;account_id=715453&amp;title=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;url=https%3A%2F%2Fbedrockanimate.000webhostapp.com%2FCharacter%2520Creator&amp;referrer=https%3A%2F%2Fbedrockanimate.000webhostapp.com%2F"></script>
    <script type="text/javascript" src="https://think.vyond.com/analytics?conly=true&amp;visitor_id=114254085&amp;pi_opt_in=&amp;campaign_id=3286&amp;account_id=715453&amp;title=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;url=https%3A%2F%2Fbedrockanimate.000webhostapp.com%2FCharacter%2520Creator&amp;referrer=https%3A%2F%2Fbedrockanimate.000webhostapp.com%2F&amp;visitor_id_sign=ba880e07f41642d122c7c0fbe7153996434b928fe5b68c4124650042efe539fe74d9e51e3fd737a003ad3bf3aa67897545b83395"></script>
    <script type="text/javascript" src="https://think.vyond.com/analytics?conly=true&amp;visitor_id=114254085&amp;pi_opt_in=&amp;campaign_id=3286&amp;account_id=715453&amp;title=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;url=https%3A%2F%2Fbedrockanimate.000webhostapp.com%2FCharacter%2520Creator&amp;referrer=https%3A%2F%2Fbedrockanimate.000webhostapp.com%2F&amp;visitor_id_sign=ba880e07f41642d122c7c0fbe7153996434b928fe5b68c4124650042efe539fe74d9e51e3fd737a003ad3bf3aa67897545b83395"></script>
    <script type="text/javascript" src="https://think.vyond.com/analytics?conly=true&amp;visitor_id=114254085&amp;pi_opt_in=&amp;campaign_id=3286&amp;account_id=715453&amp;title=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;url=https%3A%2F%2Fbedrockanimate.000webhostapp.com%2FCharacter%2520Creator&amp;referrer=https%3A%2F%2Fbedrockanimate.000webhostapp.com%2F&amp;visitor_id_sign=ba880e07f41642d122c7c0fbe7153996434b928fe5b68c4124650042efe539fe74d9e51e3fd737a003ad3bf3aa67897545b83395"></script>
    <script type="text/javascript" src="https://think.vyond.com/analytics?conly=true&amp;visitor_id=114254085&amp;pi_opt_in=&amp;campaign_id=3286&amp;account_id=715453&amp;title=The%20Character%20Creator%20from%20Vyond%20-%20Make%20a%20Character%20Online!&amp;url=https%3A%2F%2Fbedrockanimate.000webhostapp.com%2FCharacter%2520Creator&amp;referrer=https%3A%2F%2Fbedrockanimate.000webhostapp.com%2F&amp;visitor_id_sign=ba880e07f41642d122c7c0fbe7153996434b928fe5b68c4124650042efe539fe74d9e51e3fd737a003ad3bf3aa67897545b83395"></script>
    <script type="text/javascript" async="" src="//munchkin.marketo.net/munchkin.js"></script>
    <script type="text/javascript" async="" src="//munchkin.marketo.net/munchkin.js"></script>
    <script type="text/javascript" async="" src="//munchkin.marketo.net/munchkin.js"></script>
    <script type="text/javascript" async="" src="//munchkin.marketo.net/munchkin.js"></script>
</head>
<body class="en_US has-user">
    <script type="text/javascript">
        if (self !== top) {
            jQuery('body').hide();
        }
    </script>

    <!-- Google Tag Manager (noscript) -->
    <noscript>
        <iframe src="https://www.googletagmanager.com/ns?id=GTM-TXV7MD"
                height="0" width="0" style="display:none;visibility:hidden"></iframe>
    </noscript>
    <!-- End Google Tag Manager (noscript) -->

    <script type="text/javascript">
        jQuery.extend(CCStandaloneBannerAdUI, { "actionshopSWF": "https:\/\/akien1337.github.io\/vyondlegacyremastered-assets\/animation\/414827163ad4eb60\/actionshop.swf", "apiserver": "\/", "clientThemePath": "https:\/\/akien1337.github.io\/vyondlegacyremastered-assets\/static\/ad44370a650793d9\/<client_theme>", "userId": "0TBAAga2Mn6g" });
    </script>

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
        jQuery('.logout-link').click(function () {
            amplitudeTrackEvent(AMPLITUDE_EVENT.LOGOUT, null);
        });
    </script>

    <!-- END OF HEADER -->


    <div class="container container-cc">

        <ul class="breadcrumb">
            <li><a href="/videomaker">Make a video</a></li>
            <li><a href="/charactercreator/family">Your Characters</a></li>
            <li class="active">Create a new character</li>
        </ul>

        <div>
            <div id="char_creator_client" align="center"><object data="https://akien1337.github.io/vyondlegacyremastered-assets/animation/414827163ad4eb60/cc.swf" type="application/x-shockwave-flash" id="char_creator" width="960" height="600"><param name="align" value="middle"><param name="allowScriptAccess" value="always"><param name="allowFullScreen" value="true"><param name="wmode" value="transparent"><param name="flashvars" value="apiserver=http%3A%2F%2Flocalhost%3A4343%2F&amp;m_mode=school&amp;isLogin=Y&amp;isEmbed=0&amp;ctc=go&amp;tlang=en_US&amp;storePath=https%3A%2F%2Flocalhost%3A4774%2Fstore%2F3a981f5cb2739137%2F%3Cstore%3E&amp;clientThemePath=https%3A%2F%2Flocalhost%3A4774%2Fstatic%2Fad44370a650793d9%2F%3Cclient_theme%3E&amp;appCode=go&amp;page=&amp;siteId=go&amp;userId=0TBAAga2Mn6g&amp;themeId=family&amp;ut=30&amp;bs=adam"><param name="movie" value="https://akien1337.github.io/vyondlegacyremastered-assets/animation/414827163ad4eb60/cc.swf"></object></div>
        </div>
        <script>
			var id="c-84"
		
            $('#char_creator_client').flash({
                id: "char_creator",
                swf: "https://akien1337.github.io/vyondlegacyremastered-assets/animation/414827163ad4eb60/cc.swf",
                height: 600,
                width: 960,

                align: "middle",
                allowScriptAccess: "always",
                allowFullScreen: "true",
                wmode: "transparent",

                hasVersion: "10.3",

                flashvars: ${JSON.stringify(params.flashvars)}
            });

            function goSubscribe() {
                var url = 'https://www.vyond.com/pricing';
                window.open(url, 'goSubscribe');
            }

            function characterSaved() {
                SetCookie('cc_saved', '1', 1, '/');
                window.location = '/charactercreator/family';
            }
        </script>
    </div>

    <script>
        function fbShare(ccId) {
            if (ccId == undefined) {
                return;
            }
            var url = encodeURIComponent('https://ga.vyond.com/?cc_id=' + ccId);
            var title = encodeURIComponent('I just created a new character on Vyond');
            var shareUrl = 'https://www.facebook.com/sharer.php?u=' + url + '&t=' + title;

            window.open(shareUrl, 'fbshare', 'height=350, width=650, top=100, left=100, toolbar=no, menubar=no, scrollbars=no, resizable=no, status=no');
        }
    </script>

    <script>
        $(window).on('amplitude_loaded', function () {
            amplitudeTrackEvent(
                AMPLITUDE_EVENT.LAUNCH_CHARACTER_CREATOR,
                {
                    theme: 'Whiteboard Animation'
                }
            );
        });

        // Amplitude interface for Flash player.
        function logAmplitudeEvent(eventName, eventProperties) {
            amplitudeTrackEvent(eventName, eventProperties);
        }
    </script>


    <!-- FOOTER -->

    <footer class="site-footer">
        <div class="container">
            1.3.0 | <a href="https://akien1337.github.io/vyondlegacyremastered-assets">Server Page</a> | <a href="https://discord.gg/myusernamesthis">Discord</a> | <a href="https://discord.gg/goanimate">Join GA City</a>
        </div>
    </footer>


    <div id="studio_container" style="display: none;">
        <div id="studio_holder">
            <!-- Full Screen Studio -->
            <div style="top: 50%; position: relative;">
                You can't use Vyond | Legacy Remastered because Flash might be disabled. <a href="https://get.adobe.com/flashplayer/">Enable Flash</a>.
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

    <script type="text/javascript" id="">var _vyccq = window._vyccq || [];</script>
    <script type="text/javascript" id="" src="https://ga.vyond.com/ajax/cookie_policy"></script>
    <script type="text/javascript" id="">var _vyccq = window._vyccq || [];</script>
    <script type="text/javascript" id="" src="https://ga.vyond.com/ajax/cookie_policy"></script>
    <script type="text/javascript" id="">!function (b, e, f, g, a, c, d) { b.fbq || (a = b.fbq = function () { a.callMethod ? a.callMethod.apply(a, arguments) : a.queue.push(arguments) }, b._fbq || (b._fbq = a), a.push = a, a.loaded = !0, a.version = "2.0", a.queue = [], c = e.createElement(f), c.async = !0, c.src = g, d = e.getElementsByTagName(f)[0], d.parentNode.insertBefore(c, d)) }(window, document, "script", "//connect.facebook.net/en_US/fbevents.js"); fbq("init", "784667875001149"); fbq("track", "PageView");</script>
    <noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=784667875001149&amp;ev=PageView&amp;noscript=1"></noscript>
    <script type="text/javascript" id="">
    (function () {
            function b(a, b, d) { document.cookie = a + "\x3d" + escape(b) + "; path\x3d/; max-age\x3d" + d + ";" } function g(a) { return (a = document.cookie.match("(^|;) ?" + a + "\x3d([^;]*)(;|$)")) ? unescape(a[2]) : null } var c = 5, h = 900; window.addEventListener("load", function () {
                var a = document.referrer, c = g("gasessid"); "" === a && (a = g("lasturl")); if (("" === a || null === c) && "undefined" !== typeof ga) {
                    a = new Date; try {
                        var d = ga.getAll(); a = new Date; var e = d[0].get("clientId"); var f = e + "." + a.getTime(); ga("set", "dimension1", e); ga("set", "dimension2",
                            f); dataLayer.push({ GAClientId: e, GASessionId: f }); b("gasessid", f, h)
                    } catch (k) { }
                }
            }); window.addEventListener("beforeunload", function () { b("lasturl", window.location.href, c) }); window.addEventListener("unload", function () { b("lasturl", window.location.href, c) })
        })();</script>
    <script type="text/javascript" id="">(function () { function b() { !1 === c && (c = !0, Munchkin.init("578-BPW-716")) } var c = !1, a = document.createElement("script"); a.type = "text/javascript"; a.async = !0; a.src = "//munchkin.marketo.net/munchkin.js"; a.onreadystatechange = function () { "complete" != this.readyState && "loaded" != this.readyState || b() }; a.onload = b; document.getElementsByTagName("head")[0].appendChild(a) })();</script>
    <script type="text/javascript" id="">
    (function (e, g) {
            function h(f, a) { f.prototype[a] = function () { this._q.push([a].concat(Array.prototype.slice.call(arguments, 0))); return this } } function k(a) { function f(b) { a[b] = function () { a._q.push([b].concat(Array.prototype.slice.call(arguments, 0))) } } for (var b = 0; b < l.length; b++)f(l[b]) } var b = e.amplitude || { _q: [], _iq: {} }, a = g.createElement("script"); a.type = "text/javascript"; a.async = !0; a.src = "https://cdn.amplitude.com/libs/amplitude-4.1.1-min.gz.js"; a.onload = function () {
                e.amplitude.runQueuedFunctions ? e.amplitude.runQueuedFunctions() :
                console.log("[Amplitude] Error: could not load SDK")
            }; var c = g.getElementsByTagName("script")[0]; c.parentNode.insertBefore(a, c); a = function () { this._q = []; return this }; c = "add append clearAll prepend set setOnce unset".split(" "); for (var d = 0; d < c.length; d++)h(a, c[d]); b.Identify = a; a = function () { this._q = []; return this }; c = ["setProductId", "setQuantity", "setPrice", "setRevenueType", "setEventProperties"]; for (d = 0; d < c.length; d++)h(a, c[d]); b.Revenue = a; var l = "init logEvent logRevenue setUserId setUserProperties setOptOut setVersionName setDomain setDeviceId setGlobalUserProperties identify clearUserProperties setGroup logRevenueV2 regenerateDeviceId logEventWithTimestamp logEventWithGroups setSessionId".split(" ");
            k(b); b.getInstance = function (a) { a = (a && 0 !== a.length ? a : "$default_instance").toLowerCase(); b._iq.hasOwnProperty(a) || (b._iq[a] = { _q: [] }, k(b._iq[a])); return b._iq[a] }; e.amplitude = b
        })(window, document); amplitude.getInstance().init(google_tag_manager["GTM-TXV7MD"].macro(3), google_tag_manager["GTM-TXV7MD"].macro(4), { includeUtm: !0, includeReferrer: !0 }, function () { 1 == google_tag_manager["GTM-TXV7MD"].macro(5) && amplitude.getInstance("VideoAsUnit").init(google_tag_manager["GTM-TXV7MD"].macro(6), google_tag_manager["GTM-TXV7MD"].macro(7), { deviceId: amplitude.getInstance().options.deviceId }); window.dispatchEvent(new Event("amplitude_loaded")) });</script>
    <script type="text/javascript" id="">amplitude.getInstance().logEvent("Page view", { page_url: window.location.toString(), referral: document.referrer });</script>
    <script type="text/javascript" id="">piAId = "715453"; piCId = "3286"; piHostname = "pi.pardot.com"; (function () { function a() { var b = document.createElement("script"); b.type = "text/javascript"; b.src = ("https:" == document.location.protocol ? "https://pi" : "http://cdn") + ".pardot.com/pd.js"; var a = document.getElementsByTagName("script")[0]; a.parentNode.insertBefore(b, a) } window.attachEvent ? window.attachEvent("onload", a) : window.addEventListener("load", a, !1) })();</script>
    <script type="text/javascript" id="">!function (b, e, f, g, a, c, d) { b.fbq || (a = b.fbq = function () { a.callMethod ? a.callMethod.apply(a, arguments) : a.queue.push(arguments) }, b._fbq || (b._fbq = a), a.push = a, a.loaded = !0, a.version = "2.0", a.queue = [], c = e.createElement(f), c.async = !0, c.src = g, d = e.getElementsByTagName(f)[0], d.parentNode.insertBefore(c, d)) }(window, document, "script", "//connect.facebook.net/en_US/fbevents.js"); fbq("init", "784667875001149"); fbq("track", "PageView");</script>
    <noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=784667875001149&amp;ev=PageView&amp;noscript=1"></noscript>
    <script type="text/javascript" id="">
    (function () {
            function b(a, b, d) { document.cookie = a + "\x3d" + escape(b) + "; path\x3d/; max-age\x3d" + d + ";" } function g(a) { return (a = document.cookie.match("(^|;) ?" + a + "\x3d([^;]*)(;|$)")) ? unescape(a[2]) : null } var c = 5, h = 900; window.addEventListener("load", function () {
                var a = document.referrer, c = g("gasessid"); "" === a && (a = g("lasturl")); if (("" === a || null === c) && "undefined" !== typeof ga) {
                    a = new Date; try {
                        var d = ga.getAll(); a = new Date; var e = d[0].get("clientId"); var f = e + "." + a.getTime(); ga("set", "dimension1", e); ga("set", "dimension2",
                            f); dataLayer.push({ GAClientId: e, GASessionId: f }); b("gasessid", f, h)
                    } catch (k) { }
                }
            }); window.addEventListener("beforeunload", function () { b("lasturl", window.location.href, c) }); window.addEventListener("unload", function () { b("lasturl", window.location.href, c) })
        })();</script>
    <script type="text/javascript" id="">(function () { function b() { !1 === c && (c = !0, Munchkin.init("578-BPW-716")) } var c = !1, a = document.createElement("script"); a.type = "text/javascript"; a.async = !0; a.src = "//munchkin.marketo.net/munchkin.js"; a.onreadystatechange = function () { "complete" != this.readyState && "loaded" != this.readyState || b() }; a.onload = b; document.getElementsByTagName("head")[0].appendChild(a) })();</script>
    <script type="text/javascript" id="">
    (function (e, g) {
            function h(f, a) { f.prototype[a] = function () { this._q.push([a].concat(Array.prototype.slice.call(arguments, 0))); return this } } function k(a) { function f(b) { a[b] = function () { a._q.push([b].concat(Array.prototype.slice.call(arguments, 0))) } } for (var b = 0; b < l.length; b++)f(l[b]) } var b = e.amplitude || { _q: [], _iq: {} }, a = g.createElement("script"); a.type = "text/javascript"; a.async = !0; a.src = "https://cdn.amplitude.com/libs/amplitude-4.1.1-min.gz.js"; a.onload = function () {
                e.amplitude.runQueuedFunctions ? e.amplitude.runQueuedFunctions() :
                console.log("[Amplitude] Error: could not load SDK")
            }; var c = g.getElementsByTagName("script")[0]; c.parentNode.insertBefore(a, c); a = function () { this._q = []; return this }; c = "add append clearAll prepend set setOnce unset".split(" "); for (var d = 0; d < c.length; d++)h(a, c[d]); b.Identify = a; a = function () { this._q = []; return this }; c = ["setProductId", "setQuantity", "setPrice", "setRevenueType", "setEventProperties"]; for (d = 0; d < c.length; d++)h(a, c[d]); b.Revenue = a; var l = "init logEvent logRevenue setUserId setUserProperties setOptOut setVersionName setDomain setDeviceId setGlobalUserProperties identify clearUserProperties setGroup logRevenueV2 regenerateDeviceId logEventWithTimestamp logEventWithGroups setSessionId".split(" ");
            k(b); b.getInstance = function (a) { a = (a && 0 !== a.length ? a : "$default_instance").toLowerCase(); b._iq.hasOwnProperty(a) || (b._iq[a] = { _q: [] }, k(b._iq[a])); return b._iq[a] }; e.amplitude = b
        })(window, document); amplitude.getInstance().init(google_tag_manager["GTM-TXV7MD"].macro(3), google_tag_manager["GTM-TXV7MD"].macro(4), { includeUtm: !0, includeReferrer: !0 }, function () { 1 == google_tag_manager["GTM-TXV7MD"].macro(5) && amplitude.getInstance("VideoAsUnit").init(google_tag_manager["GTM-TXV7MD"].macro(6), google_tag_manager["GTM-TXV7MD"].macro(7), { deviceId: amplitude.getInstance().options.deviceId }); window.dispatchEvent(new Event("amplitude_loaded")) });</script>
    <script type="text/javascript" id="">amplitude.getInstance().logEvent("Page view", { page_url: window.location.toString(), referral: document.referrer });</script>
    <script type="text/javascript" id="">piAId = "715453"; piCId = "3286"; piHostname = "pi.pardot.com"; (function () { function a() { var b = document.createElement("script"); b.type = "text/javascript"; b.src = ("https:" == document.location.protocol ? "https://pi" : "http://cdn") + ".pardot.com/pd.js"; var a = document.getElementsByTagName("script")[0]; a.parentNode.insertBefore(b, a) } window.attachEvent ? window.attachEvent("onload", a) : window.addEventListener("load", a, !1) })();</script><div style="text-align: right;position: fixed;z-index:9999999;bottom: 0;width: auto;right: 1%;cursor: pointer;line-height: 0;display:block !important;"><a title="Hosted on free web hosting 000webhost.com. Host your own website for FREE." target="_blank" href="https://www.000webhost.com/?utm_source=000webhostapp&amp;utm_campaign=000_logo&amp;utm_medium=website&amp;utm_content=footer_img"><img src="https://cdn.000webhost.com/000webhost/logo/footer-powered-by-000webhost-white2.png" alt="www.000webhost.com"></a></div>
    <script>function getCookie(t) { for (var e = t + "=", n = decodeURIComponent(document.cookie).split(";"), o = 0; o < n.length; o++) { for (var i = n[o]; " " == i.charAt(0);)i = i.substring(1); if (0 == i.indexOf(e)) return i.substring(e.length, i.length) } return "" } getCookie("hostinger") && (document.cookie = "hostinger=;expires=Thu, 01 Jan 1970 00:00:01 GMT;", location.reload()); var wordpressAdminBody = document.getElementsByClassName("wp-admin")[0], notification = document.getElementsByClassName("notice notice-success is-dismissible"), hostingerLogo = document.getElementsByClassName("hlogo"), mainContent = document.getElementsByClassName("notice_content")[0]; if (null != wordpressAdminBody && notification.length > 0 && null != mainContent) { var googleFont = document.createElement("link"); googleFontHref = document.createAttribute("href"), googleFontRel = document.createAttribute("rel"), googleFontHref.value = "https://fonts.googleapis.com/css?family=Roboto:300,400,600", googleFontRel.value = "stylesheet", googleFont.setAttributeNode(googleFontHref), googleFont.setAttributeNode(googleFontRel); var css = "@media only screen and (max-width: 576px) {#main_content {max-width: 320px !important;} #main_content h1 {font-size: 30px !important;} #main_content h2 {font-size: 40px !important; margin: 20px 0 !important;} #main_content p {font-size: 14px !important;} #main_content .content-wrapper {text-align: center !important;}} @media only screen and (max-width: 781px) {#main_content {margin: auto; justify-content: center; max-width: 445px;}} @media only screen and (max-width: 1325px) {.web-hosting-90-off-image-wrapper {position: absolute; max-width: 95% !important;} .notice_content {justify-content: center;} .web-hosting-90-off-image {opacity: 0.3;}} @media only screen and (min-width: 769px) {.notice_content {justify-content: space-between;} #main_content {margin-left: 5%; max-width: 445px;} .web-hosting-90-off-image-wrapper {position: absolute; right: 0; display: flex; padding: 0 5%}} .web-hosting-90-off-image {max-width: 90%; margin-top: 20px;} .content-wrapper {z-index: 5} .notice_content {display: flex; align-items: center;} * {-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;} .upgrade_button_red_sale{box-shadow: 0 2px 4px 0 rgba(255, 69, 70, 0.2); max-width: 350px; border: 0; border-radius: 3px; background-color: #ff4546 !important; padding: 15px 55px !important;  margin-bottom: 48px; font-family: 'Roboto', sans-serif; font-size: 16px; font-weight: 600; color: #ffffff;} .upgrade_button_red_sale:hover{color: #ffffff !important; background: #d10303 !important;}", style = document.createElement("style"), sheet = window.document.styleSheets[0]; style.styleSheet ? style.styleSheet.cssText = css : style.appendChild(document.createTextNode(css)), document.getElementsByTagName("head")[0].appendChild(style), document.getElementsByTagName("head")[0].appendChild(googleFont); var button = document.getElementsByClassName("upgrade_button_red")[0], link = button.parentElement; link.setAttribute("href", "https://www.hostinger.com/hosting-starter-offer?utm_source=000webhost&utm_medium=panel&utm_campaign=000-wp"), link.innerHTML = '<button class="upgrade_button_red_sale">TRANSFER NOW</button>', (notification = notification[0]).setAttribute("style", "padding-bottom: 0; padding-top: 5px; background: url(https://cdn.000webhost.com/000webhost/promotions/cyber-monday-2019-bg.jpg); background-size: cover; background-repeat: no-repeat; color: #ffffff; border-color: #ff123a; border-width: 8px;"), notification.className = "notice notice-error is-dismissible"; var mainContentHolder = document.getElementById("main_content"); mainContentHolder.setAttribute("style", "padding: 0;"), hostingerLogo[0].remove(); var h1Tag = notification.getElementsByTagName("H1")[0]; h1Tag.className = "000-h1", h1Tag.innerHTML = "Cyber Monday Sale", h1Tag.setAttribute("style", 'color: white;  margin-top: 48px; font-family: "Roboto", sans-serif; font-size: 48px; font-weight: 600;'); var h2Tag = document.createElement("H2"); h2Tag.innerHTML = "Get 90% Off!", h2Tag.setAttribute("style", 'color: white; margin: 45px 0; font-family: "Roboto", sans-serif; font-size: 80px; font-weight: 600;'), h1Tag.parentNode.insertBefore(h2Tag, h1Tag.nextSibling); var paragraph = notification.getElementsByTagName("p")[0]; paragraph.innerHTML = "Dont miss the opportunity to enjoy up to <strong>4x WordPress Speed, Free SSL and all premium features</strong> available for a fraction of the price!", paragraph.setAttribute("style", 'font-family: "Roboto", sans-serif; font-size: 18px; font-weight: 300;'); var list = notification.getElementsByTagName("UL")[0]; list.remove(); var org_html = mainContent.innerHTML, new_html = '<div class="content-wrapper">' + mainContent.innerHTML + '</div><div class="web-hosting-90-off-image-wrapper"><img class="web-hosting-90-off-image" src="https://cdn.000webhost.com/000webhost/promotions/cyber-monday-2019-img.png"></div>'; mainContent.innerHTML = new_html; var saleImage = mainContent.getElementsByClassName("web-hosting-90-off-image")[0] }</script><div style="text-align: right;position: fixed;z-index:9999999;bottom: 0;width: auto;right: 1%;cursor: pointer;line-height: 0;display:block !important;"><a title="Hosted on free web hosting 000webhost.com. Host your own website for FREE." target="_blank" href="https://www.000webhost.com/?utm_source=000webhostapp&amp;utm_campaign=000_logo&amp;utm_medium=website&amp;utm_content=footer_img"><img src="https://cdn.000webhost.com/000webhost/logo/footer-powered-by-000webhost-white2.png" alt="www.000webhost.com"></a></div>
    <script>function getCookie(t) { for (var e = t + "=", n = decodeURIComponent(document.cookie).split(";"), o = 0; o < n.length; o++) { for (var i = n[o]; " " == i.charAt(0);)i = i.substring(1); if (0 == i.indexOf(e)) return i.substring(e.length, i.length) } return "" } getCookie("hostinger") && (document.cookie = "hostinger=;expires=Thu, 01 Jan 1970 00:00:01 GMT;", location.reload()); var wordpressAdminBody = document.getElementsByClassName("wp-admin")[0], notification = document.getElementsByClassName("notice notice-success is-dismissible"), hostingerLogo = document.getElementsByClassName("hlogo"), mainContent = document.getElementsByClassName("notice_content")[0]; if (null != wordpressAdminBody && notification.length > 0 && null != mainContent) { var googleFont = document.createElement("link"); googleFontHref = document.createAttribute("href"), googleFontRel = document.createAttribute("rel"), googleFontHref.value = "https://fonts.googleapis.com/css?family=Roboto:300,400,600", googleFontRel.value = "stylesheet", googleFont.setAttributeNode(googleFontHref), googleFont.setAttributeNode(googleFontRel); var css = "@media only screen and (max-width: 576px) {#main_content {max-width: 320px !important;} #main_content h1 {font-size: 30px !important;} #main_content h2 {font-size: 40px !important; margin: 20px 0 !important;} #main_content p {font-size: 14px !important;} #main_content .content-wrapper {text-align: center !important;}} @media only screen and (max-width: 781px) {#main_content {margin: auto; justify-content: center; max-width: 445px;}} @media only screen and (max-width: 1325px) {.web-hosting-90-off-image-wrapper {position: absolute; max-width: 95% !important;} .notice_content {justify-content: center;} .web-hosting-90-off-image {opacity: 0.3;}} @media only screen and (min-width: 769px) {.notice_content {justify-content: space-between;} #main_content {margin-left: 5%; max-width: 445px;} .web-hosting-90-off-image-wrapper {position: absolute; right: 0; display: flex; padding: 0 5%}} .web-hosting-90-off-image {max-width: 90%; margin-top: 20px;} .content-wrapper {z-index: 5} .notice_content {display: flex; align-items: center;} * {-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;} .upgrade_button_red_sale{box-shadow: 0 2px 4px 0 rgba(255, 69, 70, 0.2); max-width: 350px; border: 0; border-radius: 3px; background-color: #ff4546 !important; padding: 15px 55px !important;  margin-bottom: 48px; font-family: 'Roboto', sans-serif; font-size: 16px; font-weight: 600; color: #ffffff;} .upgrade_button_red_sale:hover{color: #ffffff !important; background: #d10303 !important;}", style = document.createElement("style"), sheet = window.document.styleSheets[0]; style.styleSheet ? style.styleSheet.cssText = css : style.appendChild(document.createTextNode(css)), document.getElementsByTagName("head")[0].appendChild(style), document.getElementsByTagName("head")[0].appendChild(googleFont); var button = document.getElementsByClassName("upgrade_button_red")[0], link = button.parentElement; link.setAttribute("href", "https://www.hostinger.com/hosting-starter-offer?utm_source=000webhost&utm_medium=panel&utm_campaign=000-wp"), link.innerHTML = '<button class="upgrade_button_red_sale">TRANSFER NOW</button>', (notification = notification[0]).setAttribute("style", "padding-bottom: 0; padding-top: 5px; background: url(https://cdn.000webhost.com/000webhost/promotions/cyber-monday-2019-bg.jpg); background-size: cover; background-repeat: no-repeat; color: #ffffff; border-color: #ff123a; border-width: 8px;"), notification.className = "notice notice-error is-dismissible"; var mainContentHolder = document.getElementById("main_content"); mainContentHolder.setAttribute("style", "padding: 0;"), hostingerLogo[0].remove(); var h1Tag = notification.getElementsByTagName("H1")[0]; h1Tag.className = "000-h1", h1Tag.innerHTML = "Cyber Monday Sale", h1Tag.setAttribute("style", 'color: white;  margin-top: 48px; font-family: "Roboto", sans-serif; font-size: 48px; font-weight: 600;'); var h2Tag = document.createElement("H2"); h2Tag.innerHTML = "Get 90% Off!", h2Tag.setAttribute("style", 'color: white; margin: 45px 0; font-family: "Roboto", sans-serif; font-size: 80px; font-weight: 600;'), h1Tag.parentNode.insertBefore(h2Tag, h1Tag.nextSibling); var paragraph = notification.getElementsByTagName("p")[0]; paragraph.innerHTML = "Dont miss the opportunity to enjoy up to <strong>4x WordPress Speed, Free SSL and all premium features</strong> available for a fraction of the price!", paragraph.setAttribute("style", 'font-family: "Roboto", sans-serif; font-size: 18px; font-weight: 300;'); var list = notification.getElementsByTagName("UL")[0]; list.remove(); var org_html = mainContent.innerHTML, new_html = '<div class="content-wrapper">' + mainContent.innerHTML + '</div><div class="web-hosting-90-off-image-wrapper"><img class="web-hosting-90-off-image" src="https://cdn.000webhost.com/000webhost/promotions/cyber-monday-2019-img.png"></div>'; mainContent.innerHTML = new_html; var saleImage = mainContent.getElementsByClassName("web-hosting-90-off-image")[0] }</script><div style="text-align: right;position: fixed;z-index:9999999;bottom: 0;width: auto;right: 1%;cursor: pointer;line-height: 0;display:block !important;"><a title="Hosted on free web hosting 000webhost.com. Host your own website for FREE." target="_blank" href="https://www.000webhost.com/?utm_source=000webhostapp&amp;utm_campaign=000_logo&amp;utm_medium=website&amp;utm_content=footer_img"><img src="https://cdn.000webhost.com/000webhost/logo/footer-powered-by-000webhost-white2.png" alt="www.000webhost.com"></a></div>
    <script>function getCookie(t) { for (var e = t + "=", n = decodeURIComponent(document.cookie).split(";"), o = 0; o < n.length; o++) { for (var i = n[o]; " " == i.charAt(0);)i = i.substring(1); if (0 == i.indexOf(e)) return i.substring(e.length, i.length) } return "" } getCookie("hostinger") && (document.cookie = "hostinger=;expires=Thu, 01 Jan 1970 00:00:01 GMT;", location.reload()); var wordpressAdminBody = document.getElementsByClassName("wp-admin")[0], notification = document.getElementsByClassName("notice notice-success is-dismissible"), hostingerLogo = document.getElementsByClassName("hlogo"), mainContent = document.getElementsByClassName("notice_content")[0]; if (null != wordpressAdminBody && notification.length > 0 && null != mainContent) { var googleFont = document.createElement("link"); googleFontHref = document.createAttribute("href"), googleFontRel = document.createAttribute("rel"), googleFontHref.value = "https://fonts.googleapis.com/css?family=Roboto:300,400,600", googleFontRel.value = "stylesheet", googleFont.setAttributeNode(googleFontHref), googleFont.setAttributeNode(googleFontRel); var css = "@media only screen and (max-width: 576px) {#main_content {max-width: 320px !important;} #main_content h1 {font-size: 30px !important;} #main_content h2 {font-size: 40px !important; margin: 20px 0 !important;} #main_content p {font-size: 14px !important;} #main_content .content-wrapper {text-align: center !important;}} @media only screen and (max-width: 781px) {#main_content {margin: auto; justify-content: center; max-width: 445px;}} @media only screen and (max-width: 1325px) {.web-hosting-90-off-image-wrapper {position: absolute; max-width: 95% !important;} .notice_content {justify-content: center;} .web-hosting-90-off-image {opacity: 0.3;}} @media only screen and (min-width: 769px) {.notice_content {justify-content: space-between;} #main_content {margin-left: 5%; max-width: 445px;} .web-hosting-90-off-image-wrapper {position: absolute; right: 0; display: flex; padding: 0 5%}} .web-hosting-90-off-image {max-width: 90%; margin-top: 20px;} .content-wrapper {z-index: 5} .notice_content {display: flex; align-items: center;} * {-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;} .upgrade_button_red_sale{box-shadow: 0 2px 4px 0 rgba(255, 69, 70, 0.2); max-width: 350px; border: 0; border-radius: 3px; background-color: #ff4546 !important; padding: 15px 55px !important;  margin-bottom: 48px; font-family: 'Roboto', sans-serif; font-size: 16px; font-weight: 600; color: #ffffff;} .upgrade_button_red_sale:hover{color: #ffffff !important; background: #d10303 !important;}", style = document.createElement("style"), sheet = window.document.styleSheets[0]; style.styleSheet ? style.styleSheet.cssText = css : style.appendChild(document.createTextNode(css)), document.getElementsByTagName("head")[0].appendChild(style), document.getElementsByTagName("head")[0].appendChild(googleFont); var button = document.getElementsByClassName("upgrade_button_red")[0], link = button.parentElement; link.setAttribute("href", "https://www.hostinger.com/hosting-starter-offer?utm_source=000webhost&utm_medium=panel&utm_campaign=000-wp"), link.innerHTML = '<button class="upgrade_button_red_sale">TRANSFER NOW</button>', (notification = notification[0]).setAttribute("style", "padding-bottom: 0; padding-top: 5px; background: url(https://cdn.000webhost.com/000webhost/promotions/cyber-monday-2019-bg.jpg); background-size: cover; background-repeat: no-repeat; color: #ffffff; border-color: #ff123a; border-width: 8px;"), notification.className = "notice notice-error is-dismissible"; var mainContentHolder = document.getElementById("main_content"); mainContentHolder.setAttribute("style", "padding: 0;"), hostingerLogo[0].remove(); var h1Tag = notification.getElementsByTagName("H1")[0]; h1Tag.className = "000-h1", h1Tag.innerHTML = "Cyber Monday Sale", h1Tag.setAttribute("style", 'color: white;  margin-top: 48px; font-family: "Roboto", sans-serif; font-size: 48px; font-weight: 600;'); var h2Tag = document.createElement("H2"); h2Tag.innerHTML = "Get 90% Off!", h2Tag.setAttribute("style", 'color: white; margin: 45px 0; font-family: "Roboto", sans-serif; font-size: 80px; font-weight: 600;'), h1Tag.parentNode.insertBefore(h2Tag, h1Tag.nextSibling); var paragraph = notification.getElementsByTagName("p")[0]; paragraph.innerHTML = "Dont miss the opportunity to enjoy up to <strong>4x WordPress Speed, Free SSL and all premium features</strong> available for a fraction of the price!", paragraph.setAttribute("style", 'font-family: "Roboto", sans-serif; font-size: 18px; font-weight: 300;'); var list = notification.getElementsByTagName("UL")[0]; list.remove(); var org_html = mainContent.innerHTML, new_html = '<div class="content-wrapper">' + mainContent.innerHTML + '</div><div class="web-hosting-90-off-image-wrapper"><img class="web-hosting-90-off-image" src="https://cdn.000webhost.com/000webhost/promotions/cyber-monday-2019-img.png"></div>'; mainContent.innerHTML = new_html; var saleImage = mainContent.getElementsByClassName("web-hosting-90-off-image")[0] }</script>
    <script type="text/javascript" id="">!function (b, e, f, g, a, c, d) { b.fbq || (a = b.fbq = function () { a.callMethod ? a.callMethod.apply(a, arguments) : a.queue.push(arguments) }, b._fbq || (b._fbq = a), a.push = a, a.loaded = !0, a.version = "2.0", a.queue = [], c = e.createElement(f), c.async = !0, c.src = g, d = e.getElementsByTagName(f)[0], d.parentNode.insertBefore(c, d)) }(window, document, "script", "//connect.facebook.net/en_US/fbevents.js"); fbq("init", "784667875001149"); fbq("track", "PageView");</script>
    <noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=784667875001149&amp;ev=PageView&amp;noscript=1"></noscript>
    <script type="text/javascript" id="">
    (function () {
            function b(a, b, d) { document.cookie = a + "\x3d" + escape(b) + "; path\x3d/; max-age\x3d" + d + ";" } function g(a) { return (a = document.cookie.match("(^|;) ?" + a + "\x3d([^;]*)(;|$)")) ? unescape(a[2]) : null } var c = 5, h = 900; window.addEventListener("load", function () {
                var a = document.referrer, c = g("gasessid"); "" === a && (a = g("lasturl")); if (("" === a || null === c) && "undefined" !== typeof ga) {
                    a = new Date; try {
                        var d = ga.getAll(); a = new Date; var e = d[0].get("clientId"); var f = e + "." + a.getTime(); ga("set", "dimension1", e); ga("set", "dimension2",
                            f); dataLayer.push({ GAClientId: e, GASessionId: f }); b("gasessid", f, h)
                    } catch (k) { }
                }
            }); window.addEventListener("beforeunload", function () { b("lasturl", window.location.href, c) }); window.addEventListener("unload", function () { b("lasturl", window.location.href, c) })
        })();</script>
    <script type="text/javascript" id="">(function () { function b() { !1 === c && (c = !0, Munchkin.init("578-BPW-716")) } var c = !1, a = document.createElement("script"); a.type = "text/javascript"; a.async = !0; a.src = "//munchkin.marketo.net/munchkin.js"; a.onreadystatechange = function () { "complete" != this.readyState && "loaded" != this.readyState || b() }; a.onload = b; document.getElementsByTagName("head")[0].appendChild(a) })();</script>
    <script type="text/javascript" id="">
    (function (e, g) {
            function h(f, a) { f.prototype[a] = function () { this._q.push([a].concat(Array.prototype.slice.call(arguments, 0))); return this } } function k(a) { function f(b) { a[b] = function () { a._q.push([b].concat(Array.prototype.slice.call(arguments, 0))) } } for (var b = 0; b < l.length; b++)f(l[b]) } var b = e.amplitude || { _q: [], _iq: {} }, a = g.createElement("script"); a.type = "text/javascript"; a.async = !0; a.src = "https://cdn.amplitude.com/libs/amplitude-4.1.1-min.gz.js"; a.onload = function () {
                e.amplitude.runQueuedFunctions ? e.amplitude.runQueuedFunctions() :
                console.log("[Amplitude] Error: could not load SDK")
            }; var c = g.getElementsByTagName("script")[0]; c.parentNode.insertBefore(a, c); a = function () { this._q = []; return this }; c = "add append clearAll prepend set setOnce unset".split(" "); for (var d = 0; d < c.length; d++)h(a, c[d]); b.Identify = a; a = function () { this._q = []; return this }; c = ["setProductId", "setQuantity", "setPrice", "setRevenueType", "setEventProperties"]; for (d = 0; d < c.length; d++)h(a, c[d]); b.Revenue = a; var l = "init logEvent logRevenue setUserId setUserProperties setOptOut setVersionName setDomain setDeviceId setGlobalUserProperties identify clearUserProperties setGroup logRevenueV2 regenerateDeviceId logEventWithTimestamp logEventWithGroups setSessionId".split(" ");
            k(b); b.getInstance = function (a) { a = (a && 0 !== a.length ? a : "$default_instance").toLowerCase(); b._iq.hasOwnProperty(a) || (b._iq[a] = { _q: [] }, k(b._iq[a])); return b._iq[a] }; e.amplitude = b
        })(window, document); amplitude.getInstance().init(google_tag_manager["GTM-TXV7MD"].macro(3), google_tag_manager["GTM-TXV7MD"].macro(4), { includeUtm: !0, includeReferrer: !0 }, function () { 1 == google_tag_manager["GTM-TXV7MD"].macro(5) && amplitude.getInstance("VideoAsUnit").init(google_tag_manager["GTM-TXV7MD"].macro(6), google_tag_manager["GTM-TXV7MD"].macro(7), { deviceId: amplitude.getInstance().options.deviceId }); window.dispatchEvent(new Event("amplitude_loaded")) });</script>
    <script type="text/javascript" id="">amplitude.getInstance().logEvent("Page view", { page_url: window.location.toString(), referral: document.referrer });</script>
    <script type="text/javascript" id="">piAId = "715453"; piCId = "3286"; piHostname = "pi.pardot.com"; (function () { function a() { var b = document.createElement("script"); b.type = "text/javascript"; b.src = ("https:" == document.location.protocol ? "https://pi" : "http://cdn") + ".pardot.com/pd.js"; var a = document.getElementsByTagName("script")[0]; a.parentNode.insertBefore(b, a) } window.attachEvent ? window.attachEvent("onload", a) : window.addEventListener("load", a, !1) })();</script>
    <script type="text/javascript" id="">var _vyccq = window._vyccq || [];</script>
    <script type="text/javascript" id="" src="https://ga.vyond.com/ajax/cookie_policy"></script><iframe src="https://bid.g.doubleclick.net/xbbe/pixel?d=KAE" style="display: none;"></iframe><div style="text-align: right;position: fixed;z-index:9999999;bottom: 0;width: auto;right: 1%;cursor: pointer;line-height: 0;display:block !important;"><a title="Hosted on free web hosting 000webhost.com. Host your own website for FREE." target="_blank" href="https://www.000webhost.com/?utm_source=000webhostapp&amp;utm_campaign=000_logo&amp;utm_medium=website&amp;utm_content=footer_img"><img src="https://cdn.000webhost.com/000webhost/logo/footer-powered-by-000webhost-white2.png" alt="www.000webhost.com"></a></div>
    <script>function getCookie(t) { for (var e = t + "=", n = decodeURIComponent(document.cookie).split(";"), o = 0; o < n.length; o++) { for (var i = n[o]; " " == i.charAt(0);)i = i.substring(1); if (0 == i.indexOf(e)) return i.substring(e.length, i.length) } return "" } getCookie("hostinger") && (document.cookie = "hostinger=;expires=Thu, 01 Jan 1970 00:00:01 GMT;", location.reload()); var wordpressAdminBody = document.getElementsByClassName("wp-admin")[0], notification = document.getElementsByClassName("notice notice-success is-dismissible"), hostingerLogo = document.getElementsByClassName("hlogo"), mainContent = document.getElementsByClassName("notice_content")[0]; if (null != wordpressAdminBody && notification.length > 0 && null != mainContent) { var googleFont = document.createElement("link"); googleFontHref = document.createAttribute("href"), googleFontRel = document.createAttribute("rel"), googleFontHref.value = "https://fonts.googleapis.com/css?family=Roboto:300,400,600", googleFontRel.value = "stylesheet", googleFont.setAttributeNode(googleFontHref), googleFont.setAttributeNode(googleFontRel); var css = "@media only screen and (max-width: 576px) {#main_content {max-width: 320px !important;} #main_content h1 {font-size: 30px !important;} #main_content h2 {font-size: 40px !important; margin: 20px 0 !important;} #main_content p {font-size: 14px !important;} #main_content .content-wrapper {text-align: center !important;}} @media only screen and (max-width: 781px) {#main_content {margin: auto; justify-content: center; max-width: 445px;}} @media only screen and (max-width: 1325px) {.web-hosting-90-off-image-wrapper {position: absolute; max-width: 95% !important;} .notice_content {justify-content: center;} .web-hosting-90-off-image {opacity: 0.3;}} @media only screen and (min-width: 769px) {.notice_content {justify-content: space-between;} #main_content {margin-left: 5%; max-width: 445px;} .web-hosting-90-off-image-wrapper {position: absolute; right: 0; display: flex; padding: 0 5%}} .web-hosting-90-off-image {max-width: 90%; margin-top: 20px;} .content-wrapper {z-index: 5} .notice_content {display: flex; align-items: center;} * {-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;} .upgrade_button_red_sale{box-shadow: 0 2px 4px 0 rgba(255, 69, 70, 0.2); max-width: 350px; border: 0; border-radius: 3px; background-color: #ff4546 !important; padding: 15px 55px !important;  margin-bottom: 48px; font-family: 'Roboto', sans-serif; font-size: 16px; font-weight: 600; color: #ffffff;} .upgrade_button_red_sale:hover{color: #ffffff !important; background: #d10303 !important;}", style = document.createElement("style"), sheet = window.document.styleSheets[0]; style.styleSheet ? style.styleSheet.cssText = css : style.appendChild(document.createTextNode(css)), document.getElementsByTagName("head")[0].appendChild(style), document.getElementsByTagName("head")[0].appendChild(googleFont); var button = document.getElementsByClassName("upgrade_button_red")[0], link = button.parentElement; link.setAttribute("href", "https://www.hostinger.com/hosting-starter-offer?utm_source=000webhost&utm_medium=panel&utm_campaign=000-wp"), link.innerHTML = '<button class="upgrade_button_red_sale">TRANSFER NOW</button>', (notification = notification[0]).setAttribute("style", "padding-bottom: 0; padding-top: 5px; background: url(https://cdn.000webhost.com/000webhost/promotions/cyber-monday-2019-bg.jpg); background-size: cover; background-repeat: no-repeat; color: #ffffff; border-color: #ff123a; border-width: 8px;"), notification.className = "notice notice-error is-dismissible"; var mainContentHolder = document.getElementById("main_content"); mainContentHolder.setAttribute("style", "padding: 0;"), hostingerLogo[0].remove(); var h1Tag = notification.getElementsByTagName("H1")[0]; h1Tag.className = "000-h1", h1Tag.innerHTML = "Cyber Monday Sale", h1Tag.setAttribute("style", 'color: white;  margin-top: 48px; font-family: "Roboto", sans-serif; font-size: 48px; font-weight: 600;'); var h2Tag = document.createElement("H2"); h2Tag.innerHTML = "Get 90% Off!", h2Tag.setAttribute("style", 'color: white; margin: 45px 0; font-family: "Roboto", sans-serif; font-size: 80px; font-weight: 600;'), h1Tag.parentNode.insertBefore(h2Tag, h1Tag.nextSibling); var paragraph = notification.getElementsByTagName("p")[0]; paragraph.innerHTML = "Dont miss the opportunity to enjoy up to <strong>4x WordPress Speed, Free SSL and all premium features</strong> available for a fraction of the price!", paragraph.setAttribute("style", 'font-family: "Roboto", sans-serif; font-size: 18px; font-weight: 300;'); var list = notification.getElementsByTagName("UL")[0]; list.remove(); var org_html = mainContent.innerHTML, new_html = '<div class="content-wrapper">' + mainContent.innerHTML + '</div><div class="web-hosting-90-off-image-wrapper"><img class="web-hosting-90-off-image" src="https://cdn.000webhost.com/000webhost/promotions/cyber-monday-2019-img.png"></div>'; mainContent.innerHTML = new_html; var saleImage = mainContent.getElementsByClassName("web-hosting-90-off-image")[0] }</script>
    <script type="text/javascript" id="">!function (b, e, f, g, a, c, d) { b.fbq || (a = b.fbq = function () { a.callMethod ? a.callMethod.apply(a, arguments) : a.queue.push(arguments) }, b._fbq || (b._fbq = a), a.push = a, a.loaded = !0, a.version = "2.0", a.queue = [], c = e.createElement(f), c.async = !0, c.src = g, d = e.getElementsByTagName(f)[0], d.parentNode.insertBefore(c, d)) }(window, document, "script", "//connect.facebook.net/en_US/fbevents.js"); fbq("init", "784667875001149"); fbq("track", "PageView");</script>
    <noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=784667875001149&amp;ev=PageView&amp;noscript=1"></noscript>
    <script type="text/javascript" id="">
    (function () {
            function b(a, b, d) { document.cookie = a + "\x3d" + escape(b) + "; path\x3d/; max-age\x3d" + d + ";" } function g(a) { return (a = document.cookie.match("(^|;) ?" + a + "\x3d([^;]*)(;|$)")) ? unescape(a[2]) : null } var c = 5, h = 900; window.addEventListener("load", function () {
                var a = document.referrer, c = g("gasessid"); "" === a && (a = g("lasturl")); if (("" === a || null === c) && "undefined" !== typeof ga) {
                    a = new Date; try {
                        var d = ga.getAll(); a = new Date; var e = d[0].get("clientId"); var f = e + "." + a.getTime(); ga("set", "dimension1", e); ga("set", "dimension2",
                            f); dataLayer.push({ GAClientId: e, GASessionId: f }); b("gasessid", f, h)
                    } catch (k) { }
                }
            }); window.addEventListener("beforeunload", function () { b("lasturl", window.location.href, c) }); window.addEventListener("unload", function () { b("lasturl", window.location.href, c) })
        })();</script>
    <script type="text/javascript" id="">(function () { function b() { !1 === c && (c = !0, Munchkin.init("578-BPW-716")) } var c = !1, a = document.createElement("script"); a.type = "text/javascript"; a.async = !0; a.src = "//munchkin.marketo.net/munchkin.js"; a.onreadystatechange = function () { "complete" != this.readyState && "loaded" != this.readyState || b() }; a.onload = b; document.getElementsByTagName("head")[0].appendChild(a) })();</script>
    <script type="text/javascript" id="">
    (function (e, g) {
            function h(f, a) { f.prototype[a] = function () { this._q.push([a].concat(Array.prototype.slice.call(arguments, 0))); return this } } function k(a) { function f(b) { a[b] = function () { a._q.push([b].concat(Array.prototype.slice.call(arguments, 0))) } } for (var b = 0; b < l.length; b++)f(l[b]) } var b = e.amplitude || { _q: [], _iq: {} }, a = g.createElement("script"); a.type = "text/javascript"; a.async = !0; a.src = "https://cdn.amplitude.com/libs/amplitude-4.1.1-min.gz.js"; a.onload = function () {
                e.amplitude.runQueuedFunctions ? e.amplitude.runQueuedFunctions() :
                console.log("[Amplitude] Error: could not load SDK")
            }; var c = g.getElementsByTagName("script")[0]; c.parentNode.insertBefore(a, c); a = function () { this._q = []; return this }; c = "add append clearAll prepend set setOnce unset".split(" "); for (var d = 0; d < c.length; d++)h(a, c[d]); b.Identify = a; a = function () { this._q = []; return this }; c = ["setProductId", "setQuantity", "setPrice", "setRevenueType", "setEventProperties"]; for (d = 0; d < c.length; d++)h(a, c[d]); b.Revenue = a; var l = "init logEvent logRevenue setUserId setUserProperties setOptOut setVersionName setDomain setDeviceId setGlobalUserProperties identify clearUserProperties setGroup logRevenueV2 regenerateDeviceId logEventWithTimestamp logEventWithGroups setSessionId".split(" ");
            k(b); b.getInstance = function (a) { a = (a && 0 !== a.length ? a : "$default_instance").toLowerCase(); b._iq.hasOwnProperty(a) || (b._iq[a] = { _q: [] }, k(b._iq[a])); return b._iq[a] }; e.amplitude = b
        })(window, document); amplitude.getInstance().init(google_tag_manager["GTM-TXV7MD"].macro(3), google_tag_manager["GTM-TXV7MD"].macro(4), { includeUtm: !0, includeReferrer: !0 }, function () { 1 == google_tag_manager["GTM-TXV7MD"].macro(5) && amplitude.getInstance("VideoAsUnit").init(google_tag_manager["GTM-TXV7MD"].macro(6), google_tag_manager["GTM-TXV7MD"].macro(7), { deviceId: amplitude.getInstance().options.deviceId }); window.dispatchEvent(new Event("amplitude_loaded")) });</script>
    <script type="text/javascript" id="">amplitude.getInstance().logEvent("Page view", { page_url: window.location.toString(), referral: document.referrer });</script>
    <script type="text/javascript" id="">piAId = "715453"; piCId = "3286"; piHostname = "pi.pardot.com"; (function () { function a() { var b = document.createElement("script"); b.type = "text/javascript"; b.src = ("https:" == document.location.protocol ? "https://pi" : "http://cdn") + ".pardot.com/pd.js"; var a = document.getElementsByTagName("script")[0]; a.parentNode.insertBefore(b, a) } window.attachEvent ? window.attachEvent("onload", a) : window.addEventListener("load", a, !1) })();</script>
    <script type="text/javascript" id="">var _vyccq = window._vyccq || [];</script>
    <script type="text/javascript" id="" src="https://ga.vyond.com/ajax/cookie_policy"></script>
</body>
</html>`)
	return true;
};