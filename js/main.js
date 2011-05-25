$(function() {
  var isMouseDown = false;
  var isActivate = false;
  var holidays = [];

  var isHolidayCell = function(element) {
    return $(element).hasClass("sun") || $(element).hasClass("sat") || $(element).hasClass("holiday");
  };

  var getFromAndTo = function(year, month) {
    var cursor = new Date(year, month - 1);
    var dateOfMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();

    //calculate from
    var headBlank = -cursor.getDay();
    while (headBlank < 0) {
      cursor = cursor.yesterday();
      headBlank++;
    }
    var from = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate());

    //calculate to
    cursor = new Date(year, month - 1, dateOfMonth);
    var tailBlank = 6 - cursor.getDay();
    while (tailBlank > 0) {
      cursor = cursor.tomorrow();
      tailBlank--;
    }
    var to = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate());

    return {from: from, to: to};
  };

  var isHoliday = function(date) {
    for (var i = 0; i < holidays.length; i++) {
      if (holidays[i].getTime() === date.getTime()) {
        return true;
      }
    }
    return false;
  };

  var renderCalnedar = function(year, month) {
    var fromAndTo = getFromAndTo(year, month);
    var from = fromAndTo.from;
    var to = fromAndTo.to;

    var cursor = new Date(from.getFullYear(), from.getMonth(), from.getDate());

    var html = "";
    while (cursor.getTime() <= to.getTime()) {
      if (cursor.getDay() === 0) {
        html += "<tr class='row'>";
      }

      var className = "";
      if (cursor.getDay() === 6) {
        className = "sat";
      } else if (cursor.getDay() === 0) {
        className = "sun";
      } else if (isHoliday(cursor)) {
        className = "holiday";
      }

      html += ["<td class=", className, ">", cursor.getDate(), "</td>"].join("");;
      if (cursor.getDay() === 6) {
        html += "</tr>\n";
      }
      cursor = cursor.tomorrow();
    }

    $("table#calendar tr.row").remove();
    $("table#calendar").append(html);
    $("h2").html([year, "/", month].join(""));

    initCalendarEvent();
  };

  var initCalendarEvent = function() {
    $("table#calendar tr td").mousedown(function(event) {
      isActivate = $(event.target).hasClass("active");
      if (!isActivate && !isHolidayCell(event.target)) {
        $(event.target).addClass("active");
      } else {
        $(event.target).removeClass("active");
      }
      isMouseDown = true;
      countBusinessDay();
    });

    $("table#calendar tr td").mousemove(function(event) {
      if (isMouseDown) {
        if (!isActivate && !isHolidayCell(event.target)) {
          $(event.target).addClass("active");
        } else {
          $(event.target).removeClass("active");
        }
      }
      countBusinessDay();
    });

    $("table#calendar tr td").mouseup(function(event) {
      isMouseDown = false;
    });
  };

  var initNavigation = function() {
    $("#next").click(function(event) {
        now = now.nextMonth();
        loadHolidays();
    });

    $("#prev").click(function(event) {
        now = now.lastMonth();
        loadHolidays();
    });
  };

  var countBusinessDay = function() {
    var businessDay = $("table#calendar tr td.active").length;
    $("#businessDay").html([businessDay, " business day"].join(""));
  };

  var hide = function() {
    $("#container").hide();
  };

  var show = function() {
    $("#container").show();
  }

  var loadHolidays = function() {
    hide();

    var fromAndTo = getFromAndTo(now.getFullYear(), now.getMonth() + 1);
    var from = fromAndTo.from;
    var to = fromAndTo.to;

    var fromYear = from.getFullYear();
    var fromMonth = from.getMonth() + 1;
    fromMonth = fromMonth < 10 ? "0" + fromMonth : fromMonth;
    var fromDate = from.getDate();
    fromDate = fromDate < 10 ? "0" + fromDate : fromDate;

    var toYear = to.getFullYear();
    var toMonth = to.getMonth() + 1;
    toMonth = toMonth < 10 ? "0" + toMonth : toMonth;
    var toDate = to.getDate();
    toDate = toDate < 10 ? "0" + toDate : toDate;

    var script = document.createElement("script");
    //http://www.google.com/calendar/feeds/japanese@holiday.calendar.google.com/public/full?start-min=2011-05-01&start-max=2011-06-01&max-results=20&alt=json-in-script&callback=handleJson
    var apiUrl = ["http://www.google.com/calendar/feeds/japanese@holiday.calendar.google.com/public/full?start-min=", 
                 [fromYear, fromMonth, fromDate].join("-"),
                 "&start-max=",
                 [toYear, toMonth, toDate].join("-"),
                 "&alt=json-in-script&callback=loadHolidaysHandler"].join("");
    script.src = apiUrl;
    $("body").append(script);
  };

  var loadHolidaysHandler = function(json) {
    holidays = [];
    if (json.feed.entry) {
      for (var i = 0; i < json.feed.entry.length; i++) {
        var holiday = json.feed.entry[i]["gd$when"][0].startTime.split("-");
        holidays.push(new Date(holiday[0], Number(holiday[1]) - 1, Number(holiday[2])));
      }
    }

    show();
    renderCalnedar(now.getFullYear(), now.getMonth() + 1);
  };
  window.loadHolidaysHandler = loadHolidaysHandler;

  //entry point
  var now = new Date();
  now.setDate(1);
  //renderCalnedar(now.getFullYear(), now.getMonth() + 1);
  initNavigation();
  loadHolidays();
});
