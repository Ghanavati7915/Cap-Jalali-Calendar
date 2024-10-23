import moment from "moment-jalaali";

const getMonthsOfYear = (year:any) => {
  const months = [];
  for (let month = 1; month <= 12; month++) {
    const start = moment.jalaali(`${year}/${month}/01`, 'jYYYY/jM/jD');
    const end = start.clone().endOf('jMonth');

    months.push({
      name: start.format('jMMMM'),
      start: start.format('jYYYY/jMM/jDD'),
      end: end.format('jYYYY/jMM/jDD'),
    });
  }
  return months;
};


export { getMonthsOfYear };
