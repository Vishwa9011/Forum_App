import { IUser, Occupation } from '../../Constants/constant';
import * as Types from './auth.actionType';

const initialUserCredState = {
     _id: '',
     username: "",
     email: "",
     password: "",
     gender: "",
     online: false,
     photoURL: "",
     phoneNumber: 0,
     isVerified: false,
     role: null,
     isGoogleAuthenticated: false,
     createdAt: 0,
     lastLogin: 0,
     token: '',
     occupation: null,
     bio: ''
}

export interface IAuthInitialState {
     loading: boolean
     error: string
     authenticated: boolean
     userCredential: IUser
}


// var user = sessionStorage.getItem("user");
// let  data = user ? JSON.parse(user) : null

const initialState: IAuthInitialState = {
     loading: false,
     error: '',
     authenticated: false,
     // userCredential: data ? data : initialUserCredState 
     userCredential: initialUserCredState
}

export const Reducer = (state = initialState, { type, payload }: any) => {
     switch (type) {
          case Types.AUTH_LOADING:
               return ({ ...state, loading: true });
          case Types.AUTH_ERROR:
               return ({ ...state, loading: false, error: payload });
          case Types.SIGNIN_SUCCESS:
               return ({ ...state, loading: false, error: '', userCredential: { ...payload }, authenticated: true })
          case Types.SIGNUP_SUCCESS:
               return ({ ...state, loading: false, error: '', userCredential: payload, authenticated: true });
          case Types.AUTH_OPERATION_SUCCESS:
               return ({ ...state, loading: false, error: '', });
          case Types.SEND_VERIFY_EMAIL_SUCCESS:
               return ({ ...state, loading: false, error: '', });
          case Types.VERIFY_EMAIL_FAIL:
               return ({ ...state, loading: false, error: payload.message });
          case Types.VERIFY_EMAIL_SUCCESS:
               return ({ ...state, loading: false, error: '', userCredential: payload });
          case Types.AUTH_USER_PROFILE_PHOTO_UPDATE:
               return ({ ...state, loading: false, error: '', userCredential: { ...state.userCredential, photoURL: payload } })
          case Types.USER_UPDATE_SUCCESS:
               return ({ ...state, loading: false, error: '', userCredential: payload })
          case Types.USER_UPDATE_FAIL:
               return ({ ...state, loading: false, error: payload.message })
          case Types.SIGNOUT_SUCCESS:
               return initialState;
          default:
               return state;
     }
}