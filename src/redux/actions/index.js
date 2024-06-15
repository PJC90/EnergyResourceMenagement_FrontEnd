export const GET_PROFILE = 'GET_PROFILE'

export const getMyProfileAction = () => {
  return (dispatch) => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/user/me`, {
      headers: { Authorization: localStorage.getItem('tokenAdmin') },
    })
      .then((res) => {
        if (res.ok) {
          console.log('Response OK')
          return res.json()
        } else {
          console.error('Response not OK')
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
