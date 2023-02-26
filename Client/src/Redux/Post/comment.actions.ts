import { IComment } from "../../Constants/constant";
import { getAllPost } from "./post.actions";
import * as Types from "./post.actionType"
import { Dispatch } from "redux";
import axios from "axios";


type CreateCommentType = {
     postID: string,
     message: string,
     parentID?: string,
     parent?: string
}

export const getComments = (url: string) => async (dispatch: Dispatch) => {
     dispatch({ type: Types.POST_LOADING });
     try {
          const response = await axios.get(`/post/${url}/comments`);
          const { null: RootComments, ...comments } = commentsWithParentId(response.data.postComment)
          console.log('RootComments: ', RootComments);
          dispatch({ type: Types.GET_POST_COMMENT_SUCCESS, payload: { RootComments, comments } })
     } catch (error: any) {
          console.log('error: ', error.message);
          dispatch({ type: Types.POST_ERROR, payload: error });
     }
}

export const createComment = (data: CreateCommentType) => async (dispatch: Dispatch<any>) => {
     dispatch({ type: Types.POST_LOADING });
     try {
          await axios.post(`/post/comment/new`, data);
          dispatch(getAllPost());
          dispatch({ type: Types.POST_OPERATION_SUCCESS })
     } catch (error: any) {
          console.log('error: ', error.message);
          dispatch({ type: Types.POST_ERROR, payload: error });
     }
}

export const updateComment = (message: string, id: string) => async (dispatch: Dispatch<any>) => {
     dispatch({ type: Types.POST_LOADING });
     try {
          await axios.patch(`/post/comment/update/${id}`, { message });
          dispatch(getAllPost());
          dispatch({ type: Types.POST_OPERATION_SUCCESS })
     } catch (error: any) {
          console.log('error: ', error.message);
          dispatch({ type: Types.POST_ERROR, payload: error });
     }
}

export const deleteComment = (id: string) => async (dispatch: Dispatch<any>) => {
     dispatch({ type: Types.POST_LOADING });
     try {
          await axios.delete(`/post/comment/delete/${id}`);
          dispatch(getAllPost());
          dispatch({ type: Types.POST_OPERATION_SUCCESS })
     } catch (error: any) {
          console.log('error: ', error.message);
          dispatch({ type: Types.POST_ERROR, payload: error });
     }
}


export const commentsWithParentId = (Comments: IComment[]) => {
     if (Comments == null) return []
     const group: any = {};
     Comments?.forEach((comment: any) => {
          if (!group[comment?.parentID]) {
               group[comment?.parentID] = []
          }
          group[comment?.parentID].push(comment)
     })
     return group;
}

