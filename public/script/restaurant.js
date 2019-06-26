// var rating = parseFloat($("#rating").html());
// var star = `<i class="fa fa-star"></i>`.repeat(rating);
// $("#rating").html(star);

// var rating = parseFloat(
//   $(".review")
//     .parent()
//     .find("h5")
//     .html()
// );
// var star = `<i class="fa fa-star"></i>`.repeat(rating);
// $(".review")
//   .parent()
//   .find("h5")
//   .html(star);

// var rating = parseFloat($("#rating").html());
// $(".review").on("hover", function() {
//   var rating = parseFloat(
//     $(this)
//       .parent()
//       .find("h5")
//       .html()
//   );
//   var star = `<i class="fa fa-star"></i>`.repeat(rating);
//   $(this)
//     .parent()
//     .find("h5")
//     .html(star);
// });
// var h5 = [];
var h5 = document.querySelectorAll("h5");
for (var i = 0; i < h5.length; i++) {
  var rating = parseFloat(h5[i].innerHTML);
  var star = `<i class="fa fa-star"></i>`.repeat(rating);
  h5[i].innerHTML = star;
}
