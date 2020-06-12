const API_BASE = 'https://jsonplaceholder.typicode.com/'

const _get = async endpoint => {
  if (!endpoint.length) return

  const url = API_BASE + endpoint
  const response = await fetch(url)
  return await response.json()
}

export default {
  async albums () {
    return await _get('albums')
  },

  async photos () {
    return await _get('photos')
  }
}
