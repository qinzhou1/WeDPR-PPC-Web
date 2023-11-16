export function uniqueAppend(arr, item) {
  if (!arr) {
    arr = [item]
    return
  }
  for (var i = 0; i < arr.length; i++) {
    if (item === arr[i]) {
      return
    }
  }
  arr.push(item)
}

function stringToObject(input) {
  if (!input) {
    return null
  }
  return { 'value': input }
}

export function stringArrToObjectArr(stringList) {
  if (!stringList) {
    return null
  }
  var res = []
  for (const v of stringList) {
    res.push(stringToObject(v))
  }
  return res
}
