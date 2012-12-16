(function ($) {

/**
 * Attaches double-click behavior to toggle full path of Krumo elements.
 */
Drupal.behaviors.devel = {
  attach: function (context, settings) {

    // Add hint to footnote
    $('.krumo-footnote .krumo-call').before('<img style="vertical-align: middle;" title="Click to expand. Double-click to show path." src="' + Drupal.settings.basePath + 'misc/help.png"/>');

    var krumo_name = [];
    var krumo_type = [];

    function krumo_traverse(el) {
      krumo_name.push($(el).html());
      krumo_type.push($(el).siblings('em').html().match(/\w*/)[0]);

      if ($(el).closest('.krumo-nest').length > 0) {
        krumo_traverse($(el).closest('.krumo-nest').prev().find('.krumo-name'));
      }
    }

    $('.krumo-child > div:first-child', context).dblclick(
      function(e) {
        if ($(this).find('> .krumo-php-path').length > 0) {
          // Remove path if shown.
          $(this).find('> .krumo-php-path').remove();
        }
        else {
          // Get elements.
          krumo_traverse($(this).find('> a.krumo-name'));

          // Create path.
          var krumo_path_string = '';
          for (var i = krumo_name.length - 1; i >= 0; --i) {
            // Start element.
            if ((krumo_name.length - 1) == i)
              krumo_path_string += '$' + krumo_name[i];

            if (typeof krumo_name[(i-1)] !== 'undefined') {
              if (krumo_type[i] == 'Array') {
                krumo_path_string += "[";
                if (!/^\d*$/.test(krumo_name[(i-1)]))
                  krumo_path_string += "'";
                krumo_path_string += krumo_name[(i-1)];
                if (!/^\d*$/.test(krumo_name[(i-1)]))
                  krumo_path_string += "'";
                krumo_path_string += "]";
              }
              if (krumo_type[i] == 'Object')
                krumo_path_string += '->' + krumo_name[(i-1)];
            }
          }
          $(this).append('<div class="krumo-php-path" style="font-family: Courier, monospace; font-weight: bold;">' + krumo_path_string + '</div>');

          // Reset arrays.
          krumo_name = [];
          krumo_type = [];
        }
      }
    );
  }
};

})(jQuery);
;

(function ($) {

/**
 * Provides a toggle for region label blocks.
 */
Drupal.behaviors.FusionLabels = {
  attach: function(context, settings) {

    $('div#fusion-label-toggle').toggle(function() {
      $(this).toggleClass('grid-on');
    },
    function() {
      $(this).toggleClass('grid-on');
    });
  }
};

/**
 * Applies the grid overlay.
 */
Drupal.behaviors.fusionGridMask = {
  attach: function (context, settings) {
    // Exit if grid mask not enabled
    if ($('body.grid-mask-enabled').size() == 0) {
      return;
    }

    var grid_width_pos = parseInt($('body').attr('class').indexOf('grid-width-')) + 11;
    var grid_width = $('body').attr('class').substring(grid_width_pos, grid_width_pos + 2);
    var grid = '<div id="grid-mask-overlay" class="full-width"><div class="region">';
    for (i = 1; i <= grid_width; i++) {
      grid += '<div class="block grid' + grid_width + '-1"><div class="gutter"></div></div>';
    }
    grid += '</div></div>';
    $('body.grid-mask-enabled').prepend(grid);
    $('#grid-mask-overlay .region').addClass('grid' + grid_width + '-' + grid_width);
    $('#grid-mask-overlay .block .gutter').height($('body').height());
  }
};

/**
 * Provides a toggle for grid overlay.
 */
Drupal.behaviors.fusionGridMaskToggle = {
  attach: function (context, settings) {
    // Exit if grid mask not enabled
    if ($('body.grid-mask-enabled').size() == 0) {
      return;
    }

    $('body.grid-mask-enabled').prepend('<div id="grid-mask-toggle">grid</div>');

    $('div#grid-mask-toggle')
    .toggle( function () {
      $(this).toggleClass('grid-on');
      $('body').toggleClass('grid-mask');
    },
    function() {
      $(this).toggleClass('grid-on');
      $('body').toggleClass('grid-mask');
    });
  }
};

/**
 * Provides a toggle for grid overlay.
 */
Drupal.behaviors.FusionLabelsToggle = {
  attach: function (context, settings) {
    $('#fusion-label-toggle').toggle(
      function() {
        $('div.block-fusion-labels').show();
      },
      function() {
        $('div.block-fusion-labels').hide();
      }
    );
  }
};

})(jQuery);;
