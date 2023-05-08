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
$("#pre").css("color", "#949494");

function showNextEvent(event) {
  $("#pre").prop("disabled", false);
  $("#pre").css("color", "black");
  eventSliderIndex++;
  if ($(".homepage-events .card").length - 1 === eventSliderIndex) {
    $("#next").prop("disabled", true);
    $("#next").css("color", "#949494");
  }
  $(`.homepage-events
    .card-${eventSliderIndex}`).css("display", "");
  $(`.homepage-events
    .card-${eventSliderIndex - 3}`).css("display", "none");
}
function showPreEvent(event) {
  $("#next").prop("disabled", false);
  $("#next").css("color", "black");
  if (eventSliderIndex === 3) {
    $("#pre").prop("disabled", true);
    $("#pre").css("color", "#949494");
  }
  $(`.homepage-events .card-${eventSliderIndex}`).css("display", "none");
  $(`.homepage-events .card-${eventSliderIndex - 3}`).css("display", "");
  eventSliderIndex--;
}

//sorting
let eCard = $(".event-row-container .card");
let hCard = $(".homepage-events .card");

function trimCardText(els) {
  Array.prototype.forEach.call(els, function (el) {
    el.getElementsByClassName("card-text")[0].innerHTML =
      el
        .getElementsByClassName("card-text")[0]
        .textContent.trim()
        .substring(0, 100)
        .trim()
        .replace(/.$/, "") + "...";
  });
}
trimCardText(eCard);
trimCardText(hCard);

function sortEventBy(arg, sel, elem, order, by) {
  var $selector = $(sel);
  var $element = $selector.children(elem);
  $element.sort(function (a, b) {
    if (by === "popularity") {
      let an = parseInt(a.getAttribute(arg));
      let bn = parseInt(b.getAttribute(arg));

      if (order == "asc") {
        if (an > bn) return 1;
        if (an < bn) return -1;
      } else if (order == "desc") {
        if (an < bn) return;
        1;
        if (an > bn) return -1;
      }
      return 0;
    } else if (by === "due" || by === "recent") {
      let an = new Date(a.getAttribute(arg));
      let bn = new Date(b.getAttribute(arg));

      if (order == "asc") {
        return an - bn;
      } else if (order == "desc") {
        return bn - an;
      }
    }
  });
  $element.detach().appendTo($selector);
}
function sortEvent(sortBy) {
  if (sortBy === "recent") {
    sortEventBy(
      `data-${sortBy}`,
      "#events \
    .row",
      ".card",
      "asc",
      sortBy
    );
  } else if (sortBy === "due") {
    sortEventBy(`data-${sortBy}`, "#events .row", ".card", "asc", sortBy);
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

//event registration
function registerEvent(event_id) {
  let requestConfig = {
    url: `${event_id}`,
    method: "PATCH",
    data: { reqType: "register" },
  };

  $.ajax(requestConfig).then(function (responseMessage) {
    if (responseMessage.success) {
      alert("Registed Successfully!");
      let btn = `<button
      type="submit"
      id="unregister-btn"
      onclick="UnRegisterEvent('${event_id}')"
    >
    UNREGISTER
    </button>`;

      $("#event-r-btn").html(btn);
    } else {
      alert("Something went wrong! Please try again later.");
    }
  });
}

function UnRegisterEvent(event_id) {
  let requestConfig = {
    url: `${event_id}`,
    method: "PATCH",
    data: { reqType: "unregister" },
  };

  $.ajax(requestConfig).then(function (responseMessage) {
    if (responseMessage.success) {
      alert("Unregistered Successfully!");
      let btn = `<button
      type="submit"
      id="register-btn"
      onclick="registerEvent('${event_id}')"
    >
    REGISTER NOW
    </button>`;

      $("#event-r-btn").html(btn);
    } else {
      alert("Something went wrong! Please try again later.");
    }
  });
}

//like event

function likeEvent(ele, event_id) {
  if (!event_id) alert("Must provide event id");
  if (typeof event_id !== "string") alert("Event id must be of type string");
  let requestConfig = {
    url: `events`,
    method: "PATCH",
    data: { reqType: "like", event_id },
  };
  if (localStorage.getItem("status") === "loggedIn") {
    $.ajax(requestConfig).then(function (responseMessage) {
      if (responseMessage.success) {
        ele.parentElement.getElementsByClassName("likeCount")[0].innerHTML =
          responseMessage.likeCount;
      } else {
        alert("Something went wrong! Please try again later.");
      }
    });
  } else {
    window.location.href = "/profile";
  }
}

//load events

var currEventCount = 15;

function fetchMoreEvents() {
  let requestConfig = {
    url: `events/loadevents`,
    method: "GET",
    data: { currEventCount: currEventCount },
  };

  $.ajax(requestConfig).then(function (responseMessage) {
    if (responseMessage.success) {
      if (responseMessage.eventStr.trim().length > 0) {
        const newEvents = responseMessage.eventStr;
        document.getElementsByClassName("row")[0].innerHTML =
          document.getElementsByClassName("row")[0].innerHTML + newEvents;
        currEventCount += responseMessage.returneventsLength;
      }
      if (responseMessage.totalEventsCount <= currEventCount) {
        document.getElementById("load-event-btn").remove();
        $("#filter option:eq(0)").prop("selected", true);
      }
    } else {
      alert("Something went wrong! Please try again later.");
    }
  });
}
