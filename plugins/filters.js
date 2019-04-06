import Vue from 'vue'

Vue.filter('toUpper', function(value) {
  return value.toUpperCase()
})

Vue.filter('toLower', function(value) {
  return value.toLowerCase()
})

Vue.filter('format', function(d) {
  var monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  function pad(n) {
    return n < 10 ? '0' + n : n
  }
  const t = new Date(d)
  /**
   *
   * Timezone offset correction:
   * https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off/31732581#31732581
   *
   */
  const target = new Date(t.getTime() + Math.abs(t.getTimezoneOffset() * 60000))
  const date = target.getDate()
  const month = target.getMonth()
  const year = target.getFullYear()
  //const monthDateYear = pad(month + 1) + '/' + pad(date) + '/' + year
  const dateWithFullMonthName =
    monthNames[month] + ' ' + pad(date) + ', ' + year
  return dateWithFullMonthName
})
