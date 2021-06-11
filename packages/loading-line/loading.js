export const name = 'loading-line';

LoadingLine = {
  id: null,
  width: 1,
};

LoadingLine.show = function (value) {
  $('.LoadingLine').css('display', 'inherit');

  LoadingLine.width = 1
  LoadingLine.progres(90);
};

LoadingLine.hide = function () {
  LoadingLine.progresSet(100);
  Meteor.setTimeout(function () {
    $('.LoadingLine').css('display', 'none');
  }, 500);
};

LoadingLine.progres = function (value,) {

  if (LoadingLine.id) {
    clearInterval(LoadingLine.id);
  }

  LoadingLine.id = Meteor.setInterval(function () {
    if (LoadingLine.width >= value) {
      clearInterval(LoadingLine.id);
    } else {
      LoadingLine.width++;
      LoadingLine.progresSet(LoadingLine.width);
    }
  }, 15);
};

LoadingLine.progresSet = function (width) {
  $('.LoadingLine.fixed-top > div > div').css('width', `${width}%`);
}

