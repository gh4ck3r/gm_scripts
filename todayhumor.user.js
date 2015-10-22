// ==UserScript==
// @name          Todayhumor script
// @namespace     http://www.github.com/gh4ck3r
// @description   Customize Todayhumor site.
// @require       http://code.jquery.com/jquery-1.10.1.min.js
// @include       http://*.todayhumor.*
// @exclude
// @version       8
// @grant         none
// ==/UserScript==

$(document).ready(function(){
  $(function(){
    var apply_html = $('div.contentContainer > div > div > a > img[src="images/apply_html_btn.gif"]');
    if(apply_html.length){
      window.location = apply_html.parent().attr('href');
    }
  });

  var tail_layer = $('div#tail_layer');
  tail_layer.css('overflow', 'hidden')
    .data("orig_height", tail_layer.height())
    .data("orig_width", tail_layer.width());

  $('div.tailDiv > div > input[onclick="combo()"]')
    .attr('onclick', null)
    .click(function(event){
      if(tail_layer.css('overflow')=='hidden'){
                tail_layer.each(function(){
                    var setstyle = this.style.setProperty.bind(this.style);
                    setstyle('height', 'auto', 'important');
                    setstyle('width', 'auto', 'important');
                    setstyle('overflow', 'visible', 'important');
                });
      } else {
                console.log("Hide.. -> " + tail_layer.data('orig_width') + ", "  + tail_layer.data('orig_height'));
                tail_layer.each(function(){
                    var setstyle = this.style.setProperty.bind(this.style);
                    setstyle('height', ''+tail_layer.data('orig_height')+'px', 'important');
                    setstyle('width', ''+tail_layer.data('orig_width')+'px', 'important');
                    setstyle('overflow', 'hidden', 'important');
                });
      }
    });

  var removeTarget = $();
  removeTarget
    .add('.okListDiv')
    .add('.okListDiv + div')
    .add('div.ad_adsense')					// Ad on writer info
    .add('div.under_ad_div')				// Ad on bottom of comments
    .add($('ins#aswift_0_anchor').parent().parent())
    .add($('ins#aswift_1_anchor').parent().parent())	// Ad on top of content
    .remove();

  // Shrink buttons
  $('div.okNokBookDiv').find('img[src^="/board/images/"]')
    .width(function(idx, width){
      $(this).width((width>>1));
    })
    .height(function(idx, height){
      $(this).height(height>>1);
    })
    .parent().height('auto').parent().height('auto');

  $('#moreReplyButton').css('height', 40);

  // Article list table at bottom is distorted by date field width on firefox
  $('.table_list th:nth-child(5)').css('width', 'auto');

  function make_foldable(target, button_target) {
        if(!target || !target.length) {return;}

    var button = button_target || $('<button>')
        .html('&#9660;&#9650;')
        .css({
          'borderRadius'		: '0 0 5px 5px',
          'borerWidth'		: '0 0 1px',
          'width'				: '100%',
          'height'			: '15px',
          'paddingBottom'		: '0',
          'background'		: '-moz-linear-gradient(center top, #FFFFFF, #EFEFEF) repeat scroll 0 0'
        });
        button.mouseover(function(event){
      $(this).css('background', '-moz-linear-gradient(center top, #FFFFFF, #EAF2FD) repeat scroll 0 0');
    }).mouseout(function(event){
      $(this).css('background', '-moz-linear-gradient(center top, #FFFFFF, #EFEFEF) repeat scroll 0 0');
    }).click(function(event){
      target.slideToggle();
    });

        if(!button_target) {
            var div = $('<div>').append(button);
            target.replaceWith(div);
            div.append(target);
        }
    target.slideUp(0);
  }

  make_foldable($('.writerInfoContainer'), $('div.viewSubjectDiv'));
  make_foldable($('td#topmenu_container1').parent().parent());

  var menu_button = $('<button>').html('Menu').css({
    'borerWidth'		: '0 0 1px',
    'width'			: '100%',
    'paddingBottom'		: '0',
    'background'		: '-moz-linear-gradient(center top, #FFFFFF, #EFEFEF) repeat scroll 0 0',
    'margin'		: '4px 0 0 10px'
  });
  $("<div></div>").css({'float' : 'left',}).insertAfter('#logo_line2').append(menu_button);
  make_foldable($('#topmenu_container'), menu_button);

  $('div#_atssh').remove();
  $('div#semanticrepScript').remove();
  $('.view').css('height', '23px');
});
