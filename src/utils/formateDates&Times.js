export function formatTime(date) {
  // Get hours, minutes, and seconds
  var hours = String(date.getHours()).padStart(2, "0");
  var minutes = String(date.getMinutes()).padStart(2, "0");
  var seconds = String(date.getSeconds()).padStart(2, "0");

  // Concatenate and return the formatted time
  return hours + ":" + minutes + ":" + seconds;
}
