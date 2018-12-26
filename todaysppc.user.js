// ==UserScript==
// @name        Todays PPC script
// @namespace   http://www.github.com/gh4ck3r
// @description Customize and remove Ad. from Todays PPC site
// @include     https://www.todaysppc.com/*
// @version     9
// @grant       none
// @run-at      document-end
// ==/UserScript==

document.styleSheets[0].insertRule('body>table:first-of-type>tbody>tr:first-of-type, ins.adsbygoogle, zeroboard>zeroboard>p:first-of-type, #right_ad {display: none;}');

//var adSelectors = [];
//document.querySelectorAll(adSelectors.join()).forEach(elem => elem.style.display='none');

const workDocument = document.querySelector('#work').contentDocument;
workDocument.querySelectorAll('#layer50,body>font:last-of-type')
	.forEach(elem => elem.style.display='none');
