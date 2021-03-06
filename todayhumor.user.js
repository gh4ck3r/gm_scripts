// ==UserScript==
// @name          Todayhumor script
// @namespace     http://www.github.com/gh4ck3r
// @description   Customize Todayhumor site.
// @include       http://*.todayhumor.*
// @version       18
// @grant         none
// @run-at     	  document-end
// ==/UserScript==

const css = document.styleSheets.item(0);
if (css != null) {
	[
    [
      'div.contentContainer > div:first-of-type',
      'div.under_ad_div',
      'td.list_ad',
      'div.ad_adsense',
      '.contentContainer > table:first-of-type',
      '#purudingding',
      '.okListDiv',
      '#topmenu_line0 ~ div',
      '.no_take_out_alert_div_up',
      '.no_take_out_alert_div_down',
    ].join(',') + '{display: none;}',
    '.view {height: auto !important;}',
    'div.okNokBookDiv {padding: 0px;}',
    '#logo_line, #logo_line_container {width: 910px !important;}',
    '#topmenu_container { min-width: 0px !important; }',
    '#topmenu_container .topmenu_line_container { width: 850px !important; }',
    '.slideToggle {transition: height .3s; overflow-y:hidden; }',
    '.slideToggleBtn {cursor: pointer;}',
    '.toggleHidden {height: 0px }',
    '#tail_layer { min-height: 200px; }',
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


if (navigator.userAgent.includes('Android') && window.screen.availWidth < 910) {	// 910 comes from width of #logo_line
  document.querySelector('meta[name="viewport"]').content = "width=device-width, initial-scale=0.83";
}

(function() {
  const tail = document.querySelector('#tail_layer');
  if (!tail) return;
  tail.classList.add('slideToggle');
  tail.style.height = '0px';
  
	const script = document.createElement('script');
  script.type = 'text/javascript';
  script.textContent = popup_tail_view.toSource();

  document.head.appendChild(script);
  function popup_tail_view() {
    const {style, scrollHeight} = document.querySelector('#tail_layer');
    style.height = (parseInt(style.height) === 0 ? scrollHeight : 0)+'px';
  }
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
