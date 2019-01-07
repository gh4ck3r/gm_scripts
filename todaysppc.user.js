// ==UserScript==
// @name        Todays PPC script
// @namespace   http://www.github.com/gh4ck3r
// @description Customize and remove Ad. from Todays PPC site
// @include     https://www.todaysppc.com/*
// @version     13
// @grant       none
// @run-at      document-end
// ==/UserScript==

(function(){
  const css = document.styleSheets[0];
  if (!css) return;
  
  [
    [
      'body>table:first-of-type>tbody>tr:first-of-type',
      'ins.adsbygoogle',
      'zeroboard>zeroboard>p:first-of-type',
      '#right_ad',
      'nav',	// Left navigation pane and button on mobile
      'body>center ~ div[style="display:inline-block;padding:1px;width:100%;height:100px;position:-webkit-sticky;top:10px; border:1px;font-size:9pt;background:#eeeeee"]',	// "See Mobile version" at bottom on mobile
      '#ljUJfypZLugD', // right ad on mobile
      'body > table > tbody > tr > td[cellspadding="0"]:last-of-type',	// Right side pane
      'body > table > colgroup > col:last-of-type',											// Right side pane
    ].join(',') + '{display: none !important;}',
    '#layer1, #layer1 ~ div { top: 40px !important;}',
    '.slideToggle {transition: height .3s; overflow-y:hidden; }',
    '.slideToggleBtn {cursor: pointer;}',
    '.toggleHidden {height: 0px !important;, padding-top: 0px !important; padding-bottom: 0px !important; margin-top: 0px !important; margin-bottom: 0px !important;}',
    '#work {width: 100% !important;}',
  ].forEach(css.insertRule.bind(css));
})();

(function() {
  const commentsFrame = document.querySelector('#work');
  if (commentsFrame instanceof HTMLIFrameElement) {
    commentsFrame.addEventListener('load', e => {
      const css = commentsFrame.contentDocument.styleSheets[0];
      if (!css) return;

      [
        [
          '#layer50',
          'body>font:last-of-type',
          'img[src="skin/nzeo_bbs1/t.gif"][width="900"]',
        ].join(',') + ' {display: none !important;}',
      ].forEach(css.insertRule.bind(css));
    });
  }
})();


(function() {
  const leftSideBar = document.querySelector('#left-side-bar');
  if (!leftSideBar) return;

  const appendIntoLeftSideBar = leftSideBar.appendChild.bind(leftSideBar);
  document.querySelectorAll('.side-bar-category').forEach( category => {
    const list = category.nextElementSibling;
    if (!list.classList.contains('side-bar-list')) return;

    if (!leftSideBar.contains(category)) {
      [category, list].map(appendIntoLeftSideBar);
    }

    makeSlideToggle(category, list);
    list.classList.toggle('toggleHidden');
  });

  document.querySelectorAll('table[width="1330"]').forEach(t => t.width=1000);
})()

function makeSlideToggle(toggler, content)
{
  if (![toggler, content].every(e => e instanceof HTMLElement)) return false;

  const {style, offsetHeight, classList} = content;
  classList.add('slideToggle');
  style.height = offsetHeight;

  toggler.classList.add('slideToggleBtn');
  toggler.addEventListener('click', () => {
    classList.toggle('toggleHidden');
  });
  return true;
}
