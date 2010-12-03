/*
 * jQuery simplesearch (jQuery Plugin)
 *
 * Copyright (c) 2010 Tom Shimada
 *
 * Depends Script:
 *	jquery.js (1.3.2 ~)
 *	jquery.keyinterval.js
 */

(function($) {
  $.fn.simplesearch = function(configs) {
    var defaults = {
          lines: null,
          targets: null,
          interval: 500
        };
    if (!configs) return;
    configs = $.extend(defaults, configs);
    var $textbox = this;
    if (typeof($textbox) !== 'object' || $textbox.length !== 1) return;
    if (!configs.lines) return;
    if (typeof(configs.lines) == 'object') var $lines = configs.lines;
      else var $lines = $(configs.lines);
    if ($lines.length < 1) return;

    var $lines_list = [],
        textlist = [];

    $lines.each(function(_i){
      var $line = $(this);
      if (configs.targets) {
        var $targets = $(configs.targets, $line);
      } else {
        var $targets = $line;
      }

      $lines_list[_i] = $line;
      textlist[_i] = [];
      $targets.each(function(){
        var $target = $(this);
        textlist[_i].push($target.text());
      });
    });

    $textbox.keyinterval({
      callbackFunc: search,
      interval: configs.interval
    });

    function search(){
      var str = $textbox.val(),
          reg = new RegExp(str, 'i'),
          matched = null,
          removes = '';
      if (!str) {
        $lines.css('display', '');
        return;
      }
      $.each(textlist, function(_i){
        $.each(this, function(_j){
          matched = this.match(reg);
          if (matched) return false;
        });
        if (!matched) {
          $lines_list[_i].css('display', 'none');
        } else {
          $lines_list[_i].css('display', '');
        }
      });
    }

    return this;
  }
})(jQuery);
