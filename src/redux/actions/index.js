export const GET_PROFILE = 'GET_PROFILE'
export const GET_COMPANY = 'GET_COMPANY'
export const GET_DEVICE = 'GET_DEVICE'
export const RESET_PROFILE = 'RESET_PROFILE'
export const RESET_COMPANY = 'RESET_COMPANY'

export const resetProfile = () => ({
  type: RESET_PROFILE,
})

export const resetCompany = () => ({
  type: RESET_COMPANY,
})

export const getMyProfileAction = () => {
  return (dispatch) => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/user/me`, {
      headers: { Authorization: localStorage.getItem('tokenAdmin') },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error("Errore nel ricevere i dettagli dell' user loggato")
        }
      })
      .then((profile) => {
        dispatch({
          type: GET_PROFILE,
          payload: profile,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
export const getMyCompany = () => {
  return (dispatch) => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/company`, {
      headers: { Authorization: localStorage.getItem('tokenAdmin') },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          return res.json().then((err) => {
            throw new Error(
              err.message || "Errore nel ricevere l'azienda dell'utente"
            )
          })
        }
      })
      .then((company) => {
        dispatch({
          type: GET_COMPANY,
          payload: company,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
export const getMyDevice = () => {
  return (dispatch) => {
    fetch(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/device?page=0&size=10&order=installation`,
      {
        headers: { Authorization: localStorage.getItem('tokenAdmin') },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('Errore nel ricevere i dispositivi')
        }
      })
      .then((device) => {
        dispatch({
          type: GET_DEVICE,
          payload: device,
        })
      })
      .catch((err) => console.log(err))
  }
}
