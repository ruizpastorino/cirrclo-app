/*eslint no-extend-native: ["error", { "exceptions": ["Object","Number","Array"] }]*/

export const days = [
  'domingo',
  'lunes',
  'martes',
  'miercoles',
  'jueves',
  'viernes',
  'sabado',
]

Number.prototype.format = function (decimals) {
  const length = Math.pow(10, decimals === undefined ? 2 : decimals)
  if (typeof this === 'number') {
    return (Math.ceil(Number(this) * length) / length).toLocaleString('de-DE')
  }
  return this
}

Number.prototype.limit = function (min, max) {
  if (this > max) return max
  if (this < min) return min
  return this
}

Array.prototype.sum = function (key) {
  let total = 0
  this.forEach((item) => {
    total += Number(item[key])
  })
  return total
}

Array.prototype.sortBy = function (key, order) {
  let result = []
  result = this.sort((x, y) => {
    let a, b
    if (order === 'reverse') {
      a = y
      b = x
    } else {
      a = x
      b = y
    }
    if (a[key] > b[key]) {
      return 1
    }
    if (a[key] < b[key]) {
      return -1
    }
    return 0
  })
  return result
}

Array.prototype.shorten = function () {
  let result = this.filter((item, idx) => {
    return this.indexOf(item) === idx && item !== ''
  })
  return result
}

Array.prototype.shortenBy = function (key) {
  let buffer = []
  let result = this.filter((item) => {
    let exist = buffer.indexOf(item[key])
    if (exist === -1) {
      buffer.push(item[key])
    }
    return exist === -1
  })
  return result
}

export const clone = (element) => {
  return JSON.parse(JSON.stringify(element))
}

export const getShortCode = (format = 'LLNN') => {
  const text = 'abcdefghijklmnopqrstuvwxyz'
  let code = ''

  for (let i = 0; i < format.length; i++) {
    let chart = format.charAt(i)
    if (chart === 'L') {
      code += text[Math.round(Math.random() * 25)]
    } else if (chart === 'N') {
      code += (Math.random() * 9).toFixed(0)
    } else {
      code += chart
    }
  }
  return code
}

export const normalize = (value, fromMin, fromMax, toMin, toMax) => {
  const result =
    toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin)
  return result > toMax ? toMax : result < toMin ? toMin : result
}

export const getUndefined = (current) => {
  const type = Array.isArray(current) ? 'array' : typeof current

  switch (type) {
    case 'object':
      const buffer = {}
      const keys = Object.keys(current)
      keys.forEach((key) => {
        const bingo = getUndefined(current[key])
        if (bingo) {
          buffer[key] = bingo
        }
      })
      if (Object.keys(buffer).length) {
        return buffer
      }
      break

    case 'array':
      const matches = current.filter((doc) => getUndefined(doc))
      if (matches.length) return matches
      return matches

    default:
      if (current === undefined) {
        return 'bingo!'
      }
      break
  }
}

export const search = ({ target, keyword, ignore = [] }) => {
  if (!keyword) return target
  const ignoreDefault = []
  let words = keyword.split(' ')

  const evaluate = (element, word) => {
    if (element === null || element === undefined) return false
    const type = Array.isArray(element) ? 'array' : typeof element
    let match = false
    switch (type) {
      case 'array':
        const matches = element.map((doc) => !!evaluate(doc, word))
        return !!matches.some((value) => value)
      case 'object':
        const keys = Object.keys(element)
        keys.forEach((key) => {
          if (!ignore.concat(ignoreDefault).includes(key)) {
            if (!!evaluate(element[key], word)) match = true
          }
        })
        return match
      default:
        const value = String(element).toLowerCase()
        if (value.includes(word)) match = true
        return match
    }
  }

  const result = target.filter((doc) => {
    const matches = words.map((word) => !!evaluate(doc, word))
    return !!matches.every((value) => !!value)
  })
  return result
}
