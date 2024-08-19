export function formatTime(date) {
  // Get hours, minutes, and seconds
  var hours = String(date.getHours()).padStart(2, "0");
  var minutes = String(date.getMinutes()).padStart(2, "0");
  var seconds = String(date.getSeconds()).padStart(2, "0");

  // Concatenate and return the formatted time
  return hours + ":" + minutes + ":" + seconds;
}


export function formatLocalTime(startTime, offset = '+0600') {
  // Create a date object with the provided startTime and adjust for timezone offset
  const date = new Date(`2000-01-01T${startTime}Z`);

  // Parse the offset, e.g., +0600
  const sign = offset[0];
  const hoursOffset = parseInt(offset.slice(1, 3), 10);
  const minutesOffset = parseInt(offset.slice(3, 5), 10);

  // Calculate the total offset in minutes
  const totalOffsetMinutes = hoursOffset * 60 + minutesOffset;
  const offsetInMilliseconds = totalOffsetMinutes * 60 * 1000;

  // Adjust the date object based on the offset
  if (sign === '+') {
    date.setTime(date.getTime() + offsetInMilliseconds);
  } else if (sign === '-') {
    date.setTime(date.getTime() - offsetInMilliseconds);
  }

  // Get the local time string
  const hours = date.toLocaleTimeString();
  const split = hours.split(':');
  const time = `${split[0].padStart(2, '0')}:${split[1]} ${split[2].split(' ')[1]}`;
  
  return time;
}


export function getSpecificDaysInMonth(dayName) {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const dayIndex = daysOfWeek.indexOf(dayName);

  if (dayIndex === -1) {
    throw new Error('Invalid day name');
  }

  const dates = [];
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  // Get the number of days in the current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    if (date.getDay() === dayIndex) {
      dates.push(date);
    }
  }

  return dates;
}