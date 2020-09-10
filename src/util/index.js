const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const getFormatedDate = (date) => {
  let d = date.getDate();
  let m = monthNames[date.getMonth()];
  let y = date.getFullYear();

  return `${m} ${d}, ${y}`;
};
