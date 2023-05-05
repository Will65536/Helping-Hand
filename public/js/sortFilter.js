window.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("footer").getElementsByTagName("p")[0].innerHTML =
    "&copy; " + new Date().getFullYear() + " Helping Hands, Inc";
});

//slider
let noContent = document.getElementsByClassName("empty");
if (noContent.length > 0) {
  $("#next").prop("disabled", true);
}

var eventSliderIndex = 2;
$(".homepage-events .card").css({ "max-width": "33%", display: "none" });
for (let card = 0; card < 3; card++) {
  $(`.homepage-events .card-${card}`).css("display", "");
}
$("#pre").html("<");
$("#next").html(">");
$("#pre").prop("disabled", true);

function showNextEvent(event) {
  $("#pre").prop("disabled", false);
  eventSliderIndex++;
  if ($(".homepage-events .card").length - 1 === eventSliderIndex) {
    $("#next").prop("disabled", true);
  }
  $(`.homepage-events
    .card-${eventSliderIndex}`).css("display", "");
  $(`.homepage-events
    .card-${eventSliderIndex - 3}`).css("display", "none");
}
function showPreEvent(event) {
  $("#next").prop("disabled", false);
  if (eventSliderIndex === 3) {
    $("#pre").prop("disabled", true);
  }
  $(`.homepage-events .card-${eventSliderIndex}`).css("display", "none");
  $(`.homepage-events .card-${eventSliderIndex - 3}`).css("display", "");
  eventSliderIndex--;
}

//sorting
let els = document.getElementsByClassName("card");
Array.prototype.forEach.call(els, function (el) {
  el.getElementsByClassName("card-text")[0].innerHTML =
    el
      .getElementsByClassName("card-text")[0]
      .textContent.trim()
      .substring(0, 100)
      .trim()
      .replace(/.$/, "") + "...";
});

function sortEventBy(arg, sel, elem, order, by) {
  var $selector = $(sel);
  var $element = $selector.children(elem);
  $element.sort(function (a, b) {
    if (by === "popularity" || by === "recent") {
      var an = parseInt(a.getAttribute(arg)),
        bn = parseInt(b.getAttribute(arg));
    } else if (by === "due") {
      var an = new Date(a.getAttribute(arg)),
        bn = new Date(b.getAttribute(arg));
    }
    if (order == "asc") {
      if (an > bn) return 1;
      if (an < bn) return -1;
    } else if (order == "desc") {
      if (an < bn) return;
      1;
      if (an > bn) return -1;
    }
    return 0;
  });
  $element.detach().appendTo($selector);
}
function sortEvent(sortBy) {
  if (sortBy === "recent") {
    sortEventBy(
      `data-${sortBy}`,
      "#events \
    .row",
      "div",
      "desc",
      sortBy
    );
  } else if (sortBy === "due") {
    sortEventBy(`data-${sortBy}`, "#events .row", "div", "asc", sortBy);
  } else if (sortBy === "popularity") {
    sortEventBy(
      `data-${sortBy}`,
      "#events\
    .row",
      ".card",
      "desc",
      sortBy
    );
  }
}
