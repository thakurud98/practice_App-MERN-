export const API_URL = window.location.origin+"/v1/api/"


export const USER_PROFILE = API_URL + 'get_user/me'
export const SIGNUP = API_URL + 'create_users'
export const USER_BY_ID = API_URL + 'user_by_id/'
export const DELETE_BY_ID = API_URL + 'delete_by_id/'
export const UPDATE_BY_ID = API_URL + 'update_by_id/' 
export const LOGIN = API_URL + 'login' 
export const LOGOUT_ALL = API_URL + 'logoutAll/' 
export const LOGOUT = API_URL + 'logout/'


// Social Credentials
export const GOOGLE_CLIENT_ID = '122659192363-5r5tvvl0mms3beft64ikovlrupgrugnj.apps.googleusercontent.com'
export const GOOGLE_CLIENT_SECRET = 'gZuLt6ND2ctjO0wI1KhLfXSh'
export const GOOGLE_CALLBACK_URL = 'http://localhost:4500/auth/google/callback'

export const FACEBOOK_APP_ID = '415899259090150'
export const FACEBOOK_APP_SECRET = '063e66933371ac85ecc916881a7061d0'
export const FACEBOOK_CALLBACK_URL = 'http://localhost:4500/api/auth/facebook/callback'