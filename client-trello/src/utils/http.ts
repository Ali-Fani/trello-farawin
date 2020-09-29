import router from '@/router'

export function request(method: 'GET' | 'POST', url: string, data?: any) {
  return new Promise<any>((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, `/api${url}`)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onload = async () => {
      try {
        const result = JSON.parse(xhr.responseText)
        // if (false) {
        //   try {
        //     const result = await request('POST', '/refresh', { refreshToken: localStorage.getItem('refreshToken') })
        //     result.access_token
        //     return request(method, url, data)
        //   } catch (err) {
        //     router.push('/login')
        //   }
        // }
        resolve(result)
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
