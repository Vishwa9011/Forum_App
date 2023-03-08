import { IPost, IUser } from '../../../Constants/constant';
import * as Types from './comment.actionType';


export interface IAuthInitialState {
     loading: boolean
     error: string
     posts: IPost[]
     RootComments: []
     Replies: [],
     likes: []
}


const initialState: IAuthInitialState = {
     loading: false,
     error: '',
     posts: [],
     RootComments: [],
     Replies: [],
     likes: []
}

export const Reducer = (state = initialState, { type, payload }: any) => {
     switch (type) {
          case Types.POST_LOADING:
               return ({ ...state, loading: true });
          case Types.POST_ERROR:
               return ({ ...state, loading: false, error: payload });
          case Types.POST_OPERATION_SUCCESS:
               return ({ ...state, loading: false, error: "" });
          case Types.GET_POST_LIKE_SUCCESS:
               return ({ ...state, loading: false, error: "", likes: payload });
          case Types.GET_POST_DATA_SUCCESS:
               return ({ ...state, loading: false, error: "", posts: payload });
          case Types.GET_SINGLE_USER_ALLPOST_SUCCESS:
               return ({ ...state, loading: false, error: "", posts: payload });
          case Types.GET_SINGLE_POST_SUCCESS:
               return ({ ...state, loading: false, error: "" });
          case Types.GET_POST_COMMENT_SUCCESS:
               return ({ ...state, loading: false, error: "", RootComments: payload.RootComments, Replies: payload.comments });
          default:
               return state;
     }
}