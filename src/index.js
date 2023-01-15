const monthEl = document.querySelector('.month-text');
const dateEl = document.querySelector('.date-text');
const daysEl = document.querySelector('.days');
const nextEl = document.querySelector('.next');

const modalEl = document.querySelector('.modal');
const modalCloseEl = document.querySelector('.modal-close');
const modalContainerEl = document.querySelector('.modal-container');

const today = new Date();
const date = new Date();
const months = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
];

const workTimes = [9, 10, 11, 12, 13, 14, 15, 16, 17];

const workLists = [];

let clickDate = '';

const renderCalendar = () => {
  const currentYears = date.getFullYear();
  const currentMonths = date.getMonth() + 1;

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const preMonth = date.getMonth();

  const firstDayIndex = new Date(
    `${date.getFullYear()}/${date.getMonth() + 1}/01`
  ).getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const lastMonth = date.getMonth() + 2;

  const nextDays = 7 - lastDayIndex - 1;

  monthEl.innerText = months[date.getMonth()];
  dateEl.innerHTML = today.toLocaleDateString();

  const days = [];

  for (let i = firstDayIndex; i > 0; i--) {
    days.push(`
    <div class="pre-date" data-time="${currentYears}/${preMonth}/${
      prevLastDay - i + 1
    }"><span>${prevLastDay - i + 1}</span></div>
    `);
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days.push(`
      <div class="today" data-time="${currentYears}/${currentMonths}/${i}"><span>${i}</span></div>`);
    } else {
      days.push(
        `<div data-time="${currentYears}/${currentMonths}/${i}"><span>${i}</span></div>`
      );
    }
  }

  for (let i = 1; i <= nextDays; i++) {
    days.push(
      `<div class="next-date" data-time="${currentYears}/${lastMonth}/${i}"><span>${i}</span></div>`
    );
  }

  daysEl.innerHTML = days.join('');
};

const renderList = () => {
  const allDayEl = document.querySelectorAll('.days div');
  allDayEl.forEach((day) => {
    const time = day.dataset.time;
    let workClickDate = '';
    const workListsDate = [];

    workLists.forEach((work) => {
      if (time !== work.clickDate) return;
      workClickDate = work.clickDate;

      workListsDate.push(`<p>${work.workTime}:00-${work.workTime + 1}:00</p>`);
    });
    if (time === workClickDate) {
      const clickDay = new Date(time).getDate();
      day.innerHTML = `<span>${clickDay}</span>` + workListsDate.join('');
    }
  });
};

nextEl.addEventListener('click', () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
  renderList();
});
monthEl.addEventListener('click', () => {
  date.setFullYear(today.getFullYear());
  date.setMonth(today.getMonth());
  renderCalendar();
  renderList();
});

const renderWorkTimesBtn = () => {
  for (const index in workTimes) {
    const divEl = document.createElement('div');
    divEl.innerText = `${workTimes[index]}:00-${workTimes[index] + 1}:00`;
    divEl.dataset.index = index;
    modalContainerEl.appendChild(divEl);
  }
};

renderWorkTimesBtn();

daysEl.addEventListener('click', (e) => {
  clickDate = e.target.dataset.time;
  modalEl.classList.add('modal-active');
});

modalCloseEl.addEventListener('click', () => {
  modalEl.classList.remove('modal-active');
});

modalContainerEl.addEventListener('click', (e) => {
  if (
    typeof Number(e.target.dataset.index) !== 'number' ||
    e.target.dataset.index === undefined
  )
    return;
  workLists.push({
    clickDate,
    workTime: workTimes[e.target.dataset.index],
  });
  modalEl.classList.remove('modal-active');
  renderList();
});

renderCalendar();
