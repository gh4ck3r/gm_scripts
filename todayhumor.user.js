// ==UserScript==
// @name          Todayhumor script
// @namespace     http://www.github.com/gh4ck3r
// @description   Customize Todayhumor site.
// @include       http://*.todayhumor.*
// @version       11
// @grant         none
// @run-at     		document-end
// ==/UserScript==

const css = document.styleSheets.item(0);
if (css != null) {
	[
    'div.contentContainer > div:first-of-type, div.under_ad_div, td.list_ad, div.ad_adsense {display: none;}',
    '.view {height: auto !important;}',
    'div.okNokBookDiv {padding: 0px;}',
    '.slideToggle {transition: height .3s; overflow-y:hidden }',
    '.toggleHidden {height: 0px }',
  ].forEach(css.insertRule.bind(css));
}


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

  container.classList.add('slideToggle');
  
  const {style, offsetHeight: initialHeight} = container;
  style.height = '0px';
  
	document.querySelector('div.viewSubjectDiv').addEventListener('click', () => {
    container.style.height = (container.offsetHeight === 0 ? initialHeight : 0) + 'px';
	});
})();
