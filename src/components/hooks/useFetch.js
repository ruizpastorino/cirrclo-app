const useFetch = (route, token) => {
  /* let url = `${process.env.REACT_SERVER}${route}`; */
  let url = route
  const handleMethod = async (method, body, param) => {
    try {
      if (param) {
        const entries = Object.entries(param)
        let keys = '?'
        entries.forEach(([key, value], idx) => {
          keys += `${key}=${value}${idx + 1 !== entries.length ? '&' : ''}`
        })
        url += keys
      }

      let settings = {
        method,
        body: body ? JSON.stringify(body) : null,
        headers: {
                "Access-Control-Allow-Origin": "*",
          'content-type': 'application/json',
          /* Authorization: token ? `Bearer ${token}` : null, */
        },
      }

      const response = await fetch(`${url}`, settings)
      return response
    } catch (err) {
      throw { err: err, message: 'Error de conexion' }
    }
  }

  const queryHandler = {
    get: (param) => handleMethod('GET', null, param),
    post: (body, param) => handleMethod('POST', body, param),
    put: (body, param) => handleMethod('PUT', body, param),
    delete: (param) => handleMethod('DELETE', null, param),
  }

  return queryHandler
}

export default useFetch
