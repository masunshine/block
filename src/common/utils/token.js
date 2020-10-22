const tokenKey = 'K8TOKEN'

export const getToken = () => {
  return sessionStorage.getItem(tokenKey) || ''
}

export const setToken = token => {
  token = token || ''
  sessionStorage.setItem(tokenKey, token)
}
