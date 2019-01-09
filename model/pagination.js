const limit = 20

const parse = (page, records, path = '') => {
  const maxNumberOfPages = Math.ceil(records.length / limit)
  if (page > maxNumberOfPages) {
    throw new Error(`Max number of pages is ${maxNumberOfPages}!`)
  }
  const startIndex = page === 1 ? 0 : page * limit - (limit + 1)
  const endIndex = page === 1 ? limit : (page * limit - 1) > records.length ? records.length - 1 : page * limit - 1
  const values = records.slice(startIndex, endIndex)
  const data = {
    '_metadata': {
      'page': `${page} / ${maxNumberOfPages}`,
      'page_count': values.length,
      'start_index': page === 1 ? 1 : startIndex + 2,
      'end_index': page === 1 ? limit : endIndex + 1,
      'total_count': records.length,
      'current_page': `${page}`
    },
    'records': values
  }

  if (page > 1) {
    data['_metadata']['previous_page'] = `${page - 1}`
  }
  if (page < maxNumberOfPages) {
    data['_metadata']['next_page'] = `${page + 1}`
  }

  return data
}

module.exports = {
  parse
}
