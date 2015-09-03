/*
Any models using database of choice would be included in relevant controllers
*/

exports.index = function (req, res) {
  res.render('index', {
    title: 'Example Express website'
  });
};

exports.about = function (req, res) {
  res.render('about', {
    title: 'About page'
  });
};
