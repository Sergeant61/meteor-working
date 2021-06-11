export const name = 'loading';

Loading = {};

Loading.show = function() {
  $('.Loading').css('display', 'inherit');
};

Loading.hide = function() {
  $('.Loading').css('display', 'none');
};