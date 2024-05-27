export const LocalStorageKeys = {
    TOKEN: 'token'
  }

export const getInLocalStorage = (key = LocalStorageKeys.TOKEN) => {
    const result = sessionStorage.getItem(key)
    return result
}

export const clearLocalStorage = () => {
    sessionStorage.clear()
}

export const setInLocalStorage = (key, value) => {
    try {
        sessionStorage.setItem(key, value)
    } catch (error) {
        console.error(error)
    }
}
