import { userActions } from 'store/reducers/userReducers'

export const logout = () => (dispatch) => {
  dispatch(userActions.resetUserInfo())
  localStorage.clear()
}
