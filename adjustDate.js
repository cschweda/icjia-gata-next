module.exports = Date.prototype.adjustDate = function(days) {
  var date

  days = days || 0

  if (days === 0) {
    date = new Date(this.getTime())
  } else if (days > 0) {
    date = new Date(this.getTime())

    date.setDate(date.getDate() + days)
  } else {
    date = new Date(
      this.getFullYear(),
      this.getMonth(),
      this.getDate() - Math.abs(days),
      this.getHours(),
      this.getMinutes(),
      this.getSeconds(),
      this.getMilliseconds()
    )
  }

  this.setTime(date.getTime())

  return this
}
