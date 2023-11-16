/* eslint-disable prefer-const */

/*
input =
{
    "columns": [
        "id",
        "name",
        "age"
    ],
    "data": [
        [
            "1",
            "bob",
            "11"
        ]
    ]
}

output = {
    columns: [
        { dataItem: 'col0', dataName: 'key0' }, { dataItem: 'col1', dataName: 'key1' }
    ],
    data: [
        {
            col0: 'aaa', col1: 'bbb'
        },
        {
            col0: 'ccc', col1: 'ddd'
        }
    ]
}
*/

export function toDynamicTableData(input) {
  if (typeof (input) === 'undefined' || input === null) {
    return null
  }

  var dynamicTableData = {
    columns: [],
    data: []
  }

  dynamicTableData.data = Array(input.data.length)

  for (let i = 0; i < input.columns.length; i++) {
    dynamicTableData.columns.push({
      dataItem: 'col' + i,
      dataName: input.columns[i]
    })

    for (let j = 0; j < input.data.length; j++) {
      if (!dynamicTableData.data[j]) {
        dynamicTableData.data[j] = {}
      }

      dynamicTableData.data[j]['col' + i] = input.data[j][i]
    }
  }

  return dynamicTableData
}
