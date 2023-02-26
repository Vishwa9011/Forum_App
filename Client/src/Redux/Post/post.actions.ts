import { IComment, IPost } from "../../Constants/constant";
import { commentsWithParentId } from "./comment.actions";
import * as Types from "./post.actionType"
import { Dispatch } from "redux";
import axios from "axios";


export const getAllPost = () => async (dispatch: Dispatch) => {
     dispatch({ type: Types.POST_LOADING });
     try {
          const response = await axios.get(`/post/all`);
          const posts = response.data.posts;
          console.log('posts: ', posts);

          const FinalPosts = posts.map((post: IPost) => {
               const { null: RootComments, ...Replies } = commentsWithParentId(post.comments)
               if (RootComments) {
                    RootComments.sort((a: IComment, b: IComment) => b.createdAt - a.createdAt)
               }
               return { ...post, RootComments, Replies }
          });

          dispatch({ type: Types.GET_POST_DATA_SUCCESS, payload: FinalPosts })
     } catch (error: any) {
          console.log('error: ', error.message);
          dispatch({ type: Types.POST_ERROR, payload: error });
     }
}

export const getSingleUserAllPost = (_id: string) => async (dispatch: Dispatch) => {
     dispatch({ type: Types.POST_LOADING });
     try {
          let id = _id;
          const response = await axios.get(`post/all/${id}`);
          const posts = response.data.posts;

          const FinalPosts = posts.map((post: IPost) => {
               const { null: RootComments, ...Replies } = commentsWithParentId(post.comments)
               if (RootComments) {
                    RootComments.sort((a: IComment, b: IComment) => b.createdAt - a.createdAt)
               }
               return { ...post, RootComments, Replies }
          });

          dispatch({ type: Types.GET_SINGLE_USER_ALLPOST_SUCCESS, payload: FinalPosts });
     } catch (error) {
          console.log('error: ', error);
          dispatch({ type: Types.POST_ERROR, payload: error });
     }
}

export const getSinglePost = (id: string) => async (dispatch: Dispatch) => {
     dispatch({ type: Types.POST_LOADING });
     try {
          const response = await axios.get(`post/${id}`);
          const post = response.data.post;
          dispatch({ type: Types.GET_SINGLE_POST_SUCCESS, payload: post });
     } catch (error) {
          console.log('error: ', error);
          dispatch({ type: Types.POST_ERROR, payload: error });
     }
}


export const createPost = (data: any) => async (dispatch: Dispatch<any>) => {
     dispatch({ type: Types.POST_LOADING });
     try {
          const response = await axios.post(`/post/new`, data);
          console.log('response: ', response);
          dispatch(getAllPost());

          dispatch({ type: Types.POST_OPERATION_SUCCESS })
     } catch (error: any) {
          console.log('error: ', error.message);
          dispatch({ type: Types.POST_ERROR, payload: error });
     }
}


export const updatePost = (id: string, data: { title: string, description: string, image?: any }) => async (dispatch: Dispatch<any>) => {
     dispatch({ type: Types.POST_LOADING });
     try {
          const response = await axios.patch(`/post/update/${id}`, data);

          dispatch(getAllPost());

          dispatch({ type: Types.POST_OPERATION_SUCCESS })
     } catch (error: any) {
          console.log('error: ', error.message);
          dispatch({ type: Types.POST_ERROR, payload: error });
     }
}

export const deletePost = (id: string) => async (dispatch: Dispatch<any>) => {
     dispatch({ type: Types.POST_LOADING });
     try {
          await axios.delete(`/post/delete/${id}`);

          dispatch(getAllPost());

          dispatch({ type: Types.POST_OPERATION_SUCCESS })
     } catch (error: any) {
          console.log('error: ', error.message);
          dispatch({ type: Types.POST_ERROR, payload: error });
     }
}


//  * likes

export const postLikes = (id: string) => async (dispatch: Dispatch<any>) => {
     try {
          const response = await axios.get(`/post/${id}/postlikes`);
          console.log('response: ', response.data.likes);
          dispatch({ type: Types.GET_POST_LIKE_SUCCESS, payload: response.data.likes })
     } catch (error: any) {
          console.log('error: ', error.message);
          dispatch({ type: Types.POST_ERROR, payload: error });
     }
}


export const likePost = (id: string, userId: string) => async (dispatch: Dispatch<any>) => {
     dispatch({ type: Types.POST_LOADING });
     try {
          const response = await axios.post(`/post/${id}/like`, { userId });
          console.log('response: ', response.data);

          dispatch(postLikes(userId));

          dispatch({ type: Types.GET_POST_LIKE_SUCCESS, payload: response.data.likes })
     } catch (error: any) {
          console.log('error: ', error.message);
          dispatch({ type: Types.POST_ERROR, payload: error });
     }
}

export const unLikePost = (id: string, userId: string) => async (dispatch: Dispatch<any>) => {
     dispatch({ type: Types.POST_LOADING });
     try {
          const response = await axios.post(`/post/${id}/unlike`, { userId });
          console.log('response: ', response.data);

          dispatch(postLikes(userId));

          dispatch({ type: Types.GET_POST_LIKE_SUCCESS, payload: response.data.likes })
     } catch (error: any) {
          console.log('error: ', error.message);
          dispatch({ type: Types.POST_ERROR, payload: error });
     }
}


