import Numeral from 'numeral'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

export const getCurrentTimezone = () => {
    // return Intl.DateTimeFormat().resolvedOptions().timeZone;
    return "Australia/Sydney"
}


dayjs.extend(utc)

export const toK = (num, digit=4) => {
  if (digit === 4) return Numeral(num).format('0,0.[0000]')
  if (digit === 2) return Numeral(num).format('0,0.[00]')
  if (digit === 0) return Numeral(num).format('0,0')
}

export const formatDollarAmount = (num, digits) => {
  const formatter = new Intl.NumberFormat([], {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
  return formatter.format(num)
}

// eslint-disable-next-line no-unused-vars
export const formattedNum = (number, usd = false, acceptNegatives = false, abr = false) => {
  if (isNaN(number) || number === '' || number === undefined) {
    return usd ? '$0' : 0
  }
  let num = parseFloat(number)
  if (abr){
    if (num > 1000000000) {
      return (usd ? '$' : '') + (num/1000000000).toFixed(2).toString() + "B"
    }
    if (num > 1000000) {
      return (usd ? '$' : '') + (num/1000000).toFixed(2).toString() + "M"
    }
    if (num > 1000) {
      return (usd ? '$' : '') + (num/1000).toFixed(2).toString() + "K"
    }
  }

  if (num === 0) {
    if (usd) {
      return '$0'
    }
    return 0
  }

  if (num < 0.0001 && num > 0) {
    return usd ? '< $0.0001' : '< 0.0001'
  }

  if (num > 1000) {
    return usd ? formatDollarAmount(num, 2) : Number(parseFloat(num).toFixed(0)).toLocaleString()
  }
  if (usd) {
    if (num < 0.1) {
      return formatDollarAmount(num, 4)
    } else if (num < 10) {
      return formatDollarAmount(num, 4)
    } else if (num < 100) {
      return formatDollarAmount(num, 3)
    } else {
      return formatDollarAmount(num, 0)
    }
  }

  return Number(parseFloat(num).toFixed(4)).toString()
}