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
  const target = new Date(d)
  const date = target.getDate()
  const month = target.getMonth()
  const year = target.getFullYear()
  //const monthDateYear = pad(month + 1) + '/' + pad(date) + '/' + year
  const dateWithFullMonthName =
    monthNames[month] + ' ' + pad(date) + ', ' + year
  return dateWithFullMonthName
})
