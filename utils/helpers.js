module.exports = {
  format_date: (date) => {
    const newDate = new Date(date);
    const gettedDate = `${
      newDate.getDate() < 10 ? `0${newDate.getDate()}` : `${newDate.getDate()}`
    }`;
    const gettedMonth = `${
      newDate.getMonth() + 1 < 10
        ? `0${newDate.getMonth() + 1}`
        : `${newDate.getMonth() + 1}`
    }`;
    const gettedYear = newDate.getFullYear();

    return `${gettedDate}/${gettedMonth}/${gettedYear}`;
  },
};
