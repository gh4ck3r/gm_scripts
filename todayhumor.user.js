// ==UserScript==
// @name          Todayhumor script
// @namespace     http://www.github.com/gh4ck3r
// @description   Customize Todayhumor site.
// @include       http://*.todayhumor.*
// @version       10
// @grant         none
// @run-at     		document-end
// ==/UserScript==

document.styleSheets[0].insertRule('div.contentContainer > div:first-of-type, div.under_ad_div, td.list_ad, div.ad_adsense {display: none;}');
document.styleSheets[0].insertRule('.view {height: auto !important;}');
document.styleSheets[0].insertRule('div.okNokBookDiv {padding: 0px;}');

// Shrink buttons
document.querySelectorAll('div.okNokBookDiv img')
  .forEach(({style, width, height, parentElement: {style:pstyle}}) => {
  style.width=(width>>1)+'px';
  style.height=(height>>1)+'px';
  pstyle.height='auto';
});
  
(function() {
	const container = document.querySelector('.writerInfoContainer');
  if (!container) return;

  const toggle = container.classList.toggle.bind(container.classList);
	toggle('hidden');
	document.querySelector('div.viewSubjectDiv').addEventListener('click', () => {
	  toggle('hidden');
	});
})();
