module.exports = {
  todayMaker: () => {
    const date = new Date();
    const today = `${date.getFullYear()}-${
      date.getMonth().toString().length === 1
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1
    }-${
      date.getDate().toString().length === 1
        ? `0${date.getDate()}`
        : date.getDate()
    }`;
    return today;
  },
};
