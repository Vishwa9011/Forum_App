import { Dispatch } from "redux";
import * as Types from "./post.actionType"
import axios from "axios";
import { async } from '@firebase/util';
import { IComment, IPost } from "../../Constants/constant";


type CreateCommentType = {
     postID: string,
     message: string,
     parentID?: string,
     parent?: string
}

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

export const getSinglePost = (_id: string, setPost: Function) => async (dispatch: Dispatch) => {
     dispatch({ type: Types.POST_LOADING });
     try {
          let id = _id;
          const response = await axios.get(`post/singlepost/${id}`);
          const post = response.data.post;
          dispatch({ type: Types.GET_SINGLE_POST_SUCCESS, payload: post });
          setPost(post);
     } catch (error) {
          console.log('error: ', error);
          dispatch({ type: Types.POST_ERROR, payload: error });
     }
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
          console.log('response: ', response);
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
          console.log('response: ', response);

          dispatch(postLikes(userId));

          dispatch({ type: Types.GET_POST_LIKE_SUCCESS, payload: response.data.likes })
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

