export function request(method: 'GET' | 'POST', url: string, data?: never) {
  return new Promise<any>((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onload = () => {
      try {
        resolve(JSON.parse(xhr.responseText))
      } catch (err) {
        reject(err)
      }
    }
    xhr.onerror = reject
    xhr.send(JSON.stringify(data))
  })
}

export function post(url: string, data: any) {
  return request('POST', url, data)
}

export function get(url: string) {
  return request('GET', url)
}
