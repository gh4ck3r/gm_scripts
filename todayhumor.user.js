// ==UserScript==
// @name          Todayhumor script
// @namespace     http://www.github.com/gh4ck3r
// @description   Customize Todayhumor site.
// @include       http://*.todayhumor.*
// @version       12
// @grant         none
// @run-at     	  document-end
// ==/UserScript==

const css = document.styleSheets.item(0);
if (css != null) {
	[
    'div.contentContainer > div:first-of-type, div.under_ad_div, td.list_ad, div.ad_adsense, .contentContainer > table:first-of-type, #purudingding, .okListDiv {display: none;}',
    '.view {height: auto !important;}',
    'div.okNokBookDiv {padding: 0px;}',
    '.slideToggle {transition: height .3s; overflow-y:hidden; }',
    '.slideToggleBtn {cursor: pointer;}',
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
  const toggleBtn = document.querySelector('div.viewSubjectDiv');

  makeSlideToggle(toggleBtn, container) && toggleBtn.insertAdjacentElement('afterend', container);
})();

function makeSlideToggle(toggler, content)
{
  if (![toggler, content].every(e => e instanceof HTMLElement)) return false;

  content.classList.add('slideToggle');
  const {style, offsetHeight: initialHeight} = content;
  style.height = '0px';

  toggler.classList.add('slideToggleBtn');
  toggler.addEventListener('click', () => {
    content.style.height = (content.offsetHeight === 0 ? initialHeight : 0) + 'px';
  });
  return true;
}
