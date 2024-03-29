/* eslint-disable */
var customSearch;
//var BANNER_IMAGE = "true" == "true";
//var BANNER_CUSTOMIMAGE = "true" == "true";
  //var BANNER_IMAGELIST = "http://7xvoon.com1.z0.glb.clouddn.com/battle20170106.png".split(',');
(function ($) {

	"use strict";
	const scrollCorrection = 70; // (header height = 50px) + (gap = 20px)
	function scrolltoElement(a, correction) {
		correction = correction || scrollCorrection;
		$('html, body').animate({ 'scrollTop': $(a.getAttribute('href')).offset().top - correction }, 400);
	};

	function setHeaderMenu() {
		var $headerMenu = $('header .menu');
		var $underline = $headerMenu.find('.underline');
		function setUnderline($item, transition) {
			$item = $item || $headerMenu.find('li a.active');//get instant
			transition = transition === undefined ? true : !!transition;
			if (!transition) $underline.addClass('disable-trans');
			if ($item && $item.length) {
				$item.addClass('active').siblings().removeClass('active');
				$underline.css({
					left: $item.position().left,
					width: $item.innerWidth()
				});
			} else {
				$underline.css({
					left: 0,
					width: 0
				});
			}
			if (!transition) {
				setTimeout(function () { $underline.removeClass('disable-trans') }, 0);//get into the queue.
			}
		}
		$headerMenu.on('mouseenter', 'li', function (e) {
			setUnderline($(e.currentTarget));
		});
		$headerMenu.on('mouseout', function () {
			setUnderline();
		});
		//set current active nav
		var $active_link = null;
		if (location.pathname === '/' || location.pathname.startsWith('/page/')) {
			$active_link = $('.nav-home', $headerMenu);
		} else {
			var name = location.pathname.match(/\/(.*?)\//);
			if (name.length > 1) {
				$active_link = $('.nav-' + name[1], $headerMenu);
			}
		}
		setUnderline($active_link, false);
	}
	function setHeaderMenuPhone() {
		var $switcher = $('.l_header .switcher .s-menu');
		$switcher.click(function (e) {
			e.stopPropagation();
			$('body').toggleClass('z_menu-open');
			$switcher.toggleClass('active');
		});
		$(document).click(function (e) {
			$('body').removeClass('z_menu-open');
			$switcher.removeClass('active');
		});
	}
	function setHeaderSearch() {
		var $switcher = $('.l_header .switcher .s-search');
		var $header = $('.l_header');
		var $search = $('.l_header .m_search');
		if ($switcher.length === 0) return;
		$switcher.click(function (e) {
			e.stopPropagation();
			$header.toggleClass('z_search-open');
			$search.find('input').focus();
		});
		$(document).click(function (e) {
			$header.removeClass('z_search-open');
		});
		$search.click(function (e) {
			e.stopPropagation();
		})
	}
	function setWaves() {
		Waves.attach('.flat-btn', ['waves-button']);
		Waves.attach('.float-btn', ['waves-button', 'waves-float']);
		Waves.attach('.float-btn-light', ['waves-button', 'waves-float', 'waves-light']);
		Waves.attach('.flat-box', ['waves-block']);
		Waves.attach('.float-box', ['waves-block', 'waves-float']);
		Waves.attach('.waves-image');
		Waves.init();
	}
	function setScrollReveal(){
		const $reveal = $('.reveal');
		if($reveal.length === 0) return; 
		const sr = ScrollReveal();
		sr.reveal('.reveal');
	}
	function setTocToggle() {
		const $toc = $('.tog');
		if ($toc.length === 0) return;
		$toc.click((e) => {
			e.stopPropagation();
			$toc.addClass('active');
		});
		$(document).click(() => $toc.removeClass('active'));
		$toc.on('click', 'a', (e) => {
			e.preventDefault();
			e.stopPropagation();
			scrolltoElement(e.target.tagName.toLowerCase === 'a' ? e.target : e.target.parentElement);
		});

		const liElements = Array.from($toc.find('li a'));
		//function animate above will convert float to int.
		const getAnchor = () => liElements.map(elem => Math.floor($(elem.getAttribute('href')).offset().top - scrollCorrection));

		let anchor = getAnchor();
		const scrollListener = () => {
			const scrollTop = $('html').scrollTop() || $('body').scrollTop();
			if (!anchor) return;
			//binary search.
			let l = 0, r = anchor.length - 1, mid;
			while (l < r) {
				mid = (l + r + 1) >> 1;
				if (anchor[mid] === scrollTop) l = r = mid;
				else if (anchor[mid] < scrollTop) l = mid;
				else r = mid - 1;
			}
			$(liElements).removeClass('active').eq(l).addClass('active');
		}
		$(window)
			.resize(() => {
				anchor = getAnchor();
				scrollListener();
			})
			.scroll(() => {
				scrollListener()
			});
		scrollListener();
	}

	function getPicture() {
		const $banner = $('.banner');
		if ($banner.length === 0) return;
		const url = ROOT + 'js/lovewallpaper.json';
		$.get(url).done(res => {
			if (res.data.length > 0) {
				const index = Math.floor(Math.random() * res.data.length);
				//$banner.css('background-image', 'url(' + res.data[index].big + ')');123
				$banner.css('background-image', 'url("http://7xvoon.com1.z0.glb.clouddn.com/battle20170106.png")');
			}
		})
	}
	
// 	function getPicture() {
// 		console.log("BANNER_IMAGE="+BANNER_IMAGE);
// 		console.log("BANNER_CUSTOMIMAGE="+BANNER_CUSTOMIMAGE);
// 		if (BANNER_IMAGE) {
// 			if (BANNER_CUSTOMIMAGE) {
// 				console.log("1");
// 				getListImage();
// 			} else {
// 				console.log("2");
// 				getLovewallpaper();
// 			}
// 		} else {
// 			setNoimageBanner();
// 		}
// 	}

// 	function getListImage() {
// 		const $banner = $('.banner');
// 		if ($banner.length === 0) return;
// 		if (BANNER_IMAGELIST.length > 0) {
// 			const index = Math.floor(Math.random() * BANNER_IMAGELIST.length);
// 			$banner.css('background-image', 'url(' + BANNER_IMAGELIST[index] + ')');
// 		}
// 	}

// 	function getLovewallpaper() {
// 		const $banner = $('.banner');
// 		if ($banner.length === 0) return;
// 		const url = ROOT + 'js/lovewallpaper.json';
// 		$.get(url).done(res => {
// 			if (res.data.length > 0) {
// 				const index = Math.floor(Math.random() * res.data.length);
// 				$banner.css('background-image', 'url(' + res.data[index].big + ')');
// 			}
// 		})
// 	}

// 	function setNoimageBanner() {
// 		const $banner = $('.banner');
// 		if ($banner.length === 0) return;
// 		$banner.addClass('noimage');
// 	}

	function getHitokoto() {
		const $hitokoto = $('#hitokoto');
		if($hitokoto.length === 0) return;
		const url = 'https://api.hitokoto.cn/?length=80&encode=jsc&fun=handlerHitokoto';
		$('body').append('<script	src="%s"></script>'.replace('%s',url));
		window.handlerHitokoto = (data) => {
			$hitokoto
				.css('color','transparent')
				.text(data.hitokoto)
			if(data.source) $hitokoto.append('<cite> ——  %s</cite>'.replace('%s',data.source));
			else if(data.author) $hitokoto.append('<cite> ——  %s</cite>'.replace('%s',data.author));
			$hitokoto.css('color','white');
		}
	}

	$(function () {
		//set header
		setHeaderMenu();
		setHeaderMenuPhone();
		setHeaderSearch();
		setWaves();
		setScrollReveal();
		setTocToggle();
		getHitokoto();
		getPicture();
		$(".article .video-container").fitVids();

		setTimeout(function () {
			$('#loading-bar-wrapper').fadeOut(500);
		}, 300);

		if (SEARCH_SERVICE === 'google') {
			customSearch = new GoogleCustomSearch({
				apiKey: GOOGLE_CUSTOM_SEARCH_API_KEY,
				engineId: GOOGLE_CUSTOM_SEARCH_ENGINE_ID,
				imagePath: "/images/"
			});
		}
		else if (SEARCH_SERVICE === 'algolia') {
			customSearch = new AlgoliaSearch({
				apiKey: ALGOLIA_API_KEY,
				appId: ALGOLIA_APP_ID,
				indexName: ALGOLIA_INDEX_NAME,
				imagePath: "/images/"
			});
		}
		else if (SEARCH_SERVICE === 'hexo') {
			customSearch = new HexoSearch({
				imagePath: "/images/"
			});
		}
		else if (SEARCH_SERVICE === 'azure') {
			customSearch = new AzureSearch({
				serviceName: AZURE_SERVICE_NAME,
				indexName: AZURE_INDEX_NAME,
				queryKey: AZURE_QUERY_KEY,
				imagePath: "/images/"
			});
		}
		else if (SEARCH_SERVICE === 'baidu') {
			customSearch = new BaiduSearch({
				apiId: BAIDU_API_ID,
				imagePath: "/images/"
			});
		}

	});

})(jQuery);
