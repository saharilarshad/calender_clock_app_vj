const clockTime = document.querySelector(".clock .time");
const clockDate = document.querySelector(".clock .date");

const calenderDate = document.querySelector(".calender .current-date");
const calenderDays = document.querySelector(".calender .days");
const calenderPrevNext = document.querySelectorAll(".calender .icons span");

const calenderShow = document.querySelector(".calender .show");
const calenderHide = document.querySelector(".calender .hide");
const calenderYears = document.querySelector(".calender .hide input");
const calenderMonth = document.querySelector(".calender .hide .months");
const calenderBtns = document.querySelectorAll(".calender .hide button");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let d = new Date();
let day = d.getDay(); // 0 - 6 render number day
let date = d.getDate();
let month = d.getMonth(); // 0 - 11 render month
let year = d.getFullYear();
let hour = d.getHours();
let count = 0;

//calender
function renderCalender() {
  let lists = ``;

  const lastDateOfLastMonth = new Date(year, month, 0).getDate();
  // console.log(lastDateOfLastMonth);
  const lastDateOfCurrentMonth = new Date(year, month + 1, 0).getDate();
  // console.log(lastDateOfCurrentMonth);
  const firstDayOfCurrentMonth = new Date(year, month, 1).getDay();
  // console.log(firstDayOfCurrentMonth);
  const firstDayOfNextMonth = new Date(year, month - 1, 1).getDay();
  // console.log(firstDayOfNextMonth);

  for (let i = firstDayOfCurrentMonth; i > 0; i--) {
    // console.log(i);
    lists += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateOfCurrentMonth; i++) {
    // console.log(i);
    lists += `<li class="${isToday(i) ? "active" : ""}">${i}</li>`;
  }

  for (let i = firstDayOfNextMonth; i < 7; i++) {
    // console.log(i);
    lists += `<li class="inactive">${i - firstDayOfNextMonth + 1}</li>`;
  }

  calenderDate.innerText = `${months[month]} ${year}`;
  calenderDays.innerHTML = lists;
  calenderYears.value = year;

  renderCalenderMonths();
}
renderCalender();

//today
function isToday(date) {
  const cy = new Date().getFullYear();
  const cm = new Date().getMonth();
  const cd = new Date().getDate();

  //   console.log(cm);

  return date === cd && month === cm && year === cy;
}
// isToday()

// console.log(calenderPrevNext)
calenderPrevNext.forEach((icon) => {
  icon.addEventListener("click", () => {
    // console.log(btn);
    month = icon.id === "prev" ? month - 1 : month + 1;
    // console.log(month);

    if (month < 0 || month > 11) {
      const d = new Date(year, month);
      // console.log(d);
      month = d.getMonth();
      year = d.getFullYear();
    }
    renderCalender();
  });
});

calenderDate.addEventListener("click", () => {
  // console.log("ok");
  calenderShow.style.display = "none";
  calenderHide.style.display = "block";
});

function renderCalenderMonths() {
  let lists = ``;
  months.forEach((m, index) => {
    // console.log(m);
    lists += `<li class="${
      index === month ? "active" : ""
    }" onClick="setMonth(${index})">${m}</li>`;
  });

  calenderMonth.innerHTML = lists;
}
// renderCalenderMonths();

function setMonth(m) {
  month = m;
  renderCalenderMonths();
}

calenderBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // console.log(btn.id);

    if (btn.id === "ok") {
      year = Number(calenderYears.value);
      // month = renderCalenderMonths();
      console.log(year, month);
      //   calenderYears.value = year;
    } else {
      year = new Date().getFullYear();
      month = new Date().getMonth();
    }
    calenderShow.style.display = "grid";
    calenderHide.style.display = "none";
    renderCalender();
  });
});

// clock
function renderClock() {
  const time = d.toLocaleTimeString();
  // console.log(time);
  clockTime.innerText = time;
}

function renderDay() {
  // console.log(days[day]);
  clockDate.innerText = `${days[day]}, ${months[month]} ${date}, ${year}`;
}

renderDay();

// init
function init() {
  d = new Date();
  // console.log(d);
  hour = d.getHours()
  renderClock();

  //starting a new day will re-render only once
  if (hour === 0 && count === 0) {
    day = d.getDay();
    date = d.getDate();
    month = d.getMonth();
    year = d.getYear();

    renderDay();
    renderCalender();
  }

  //   after 0h => reset count = 0
  if (hour > 0 && count > 0) {
    count = 0;
  }

  setTimeout(init, 1000);
}

init();
