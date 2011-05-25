//http://blog.kaihatsubu.com/?p=1548
Date.prototype.tomorrow = function() {
  var d = new Date(this.getTime());
  d.setDate(this.getDate() + 1);
  return d;
};

Date.prototype.yesterday = function() {
  var d = new Date(this.getTime());
  d.setDate(this.getDate() - 1);
  return d;
};

Date.prototype.nextWeek = function() {
  var d = new Date(this.getTime());
  d.setDate(this.getDate() + 7);
  return d;
};

Date.prototype.lastWeek = function() {
  var d = new Date(this.getTime());
  d.setDate(this.getDate() - 7);
  return d;
};

Date.prototype.nextMonth = function() {
  var d = new Date(this.getTime());
  d.setMonth(this.getMonth() + 1);
  return d;
};

Date.prototype.lastMonth = function() {
  var d = new Date(this.getTime());
  d.setMonth(this.getMonth() - 1);
  return d;
};

Date.prototype.nextYear = function() {
  var d = new Date(this.getTime());
  d.setYear(this.getFullYear() + 1);
  return d;
};

Date.prototype.lastYear = function() {
  var d = new Date(this.getTime());
  d.setYear(this.getFullYear() - 1);
  return d;
};

Date.prototype._calcNextDay = function(day) {
  var dayNums = {
    "Sunday": 0,
    "Monday": 1,
    "Tuesday": 2,
    "Wednesday": 3,
    "Thursday": 4,
    "Friday": 5,
    "Saturday": 6};
  var d = new Date(this.getTime());
  var delta = dayNums[day] - d.getDay();
  if (delta <= 0) {
    d.setDate(d.getDate() + 7 - d.getDay() + dayNums[day]);
  } else {
    d.setDate(d.getDate() + delta);
  }
  return d;
};

Date.prototype.nextSunday = function() {
  return this._calcNextDay("Sunday");
};

Date.prototype.nextMonday = function() {
  return this._calcNextDay("Monday");
};

Date.prototype.nextTuesday = function() {
  return this._calcNextDay("Tuesday");
};

Date.prototype.nextWednesday = function() {
  return this._calcNextDay("Wednesday");
};

Date.prototype.nextThursday = function() {
  return this._calcNextDay("Thursday");
};

Date.prototype.nextFriday = function() {
  return this._calcNextDay("Friday");
};

Date.prototype.nextSaturday = function() {
  return this._calcNextDay("Saturday");
};

Date.prototype._calcLastDay = function(day) {
  var dayNums = {
    "Sunday": 0,
    "Monday": 1,
    "Tuesday": 2,
    "Wednesday": 3,
    "Thursday": 4,
    "Friday": 5,
    "Saturday": 6};
  var d = new Date(this.getTime());
  var delta = d.getDay() - dayNums[day];
  if (delta <=0) {
    d.setDate(d.getDate() - 7 - d.getDay() + dayNums[day]);
  } else {
    d.setDate(d.getDate() - delta);
  }
  return d;
};

Date.prototype.lastSunday = function() {
  return this._calcLastDay("Sunday");
};

Date.prototype.lastMonday = function() {
  return this._calcLastDay("Monday");
};

Date.prototype.lastTuesday = function() {
  return this._calcLastDay("Tuesday");
};

Date.prototype.lastWednesday = function() {
  return this._calcLastDay("Wednesday");
};

Date.prototype.lastThursday = function() {
  return this._calcLastDay("Thursday");
};

Date.prototype.lastFriday = function() {
  return this._calcLastDay("Friday");
};

Date.prototype.lastSaturday = function() {
  return this._calcLastDay("Saturday");
};
