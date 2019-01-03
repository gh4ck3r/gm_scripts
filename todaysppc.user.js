// ==UserScript==
// @name        Todays PPC script
// @namespace   http://www.github.com/gh4ck3r
// @description Customize and remove Ad. from Todays PPC site
// @include     https://www.todaysppc.com/*
// @version     11
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
    ].join(',') + '{display: none;}',
    '#layer1, #layer1 ~ div { top: 40px !important;}',
  ].forEach(css.insertRule.bind(css));
})()

const workDocument = document.querySelector('#work').contentDocument;
if (workDocument) {
  workDocument.querySelectorAll('#layer50,body>font:last-of-type')
    .forEach(elem => elem.style.display='none');
}
