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

const getAllPost = () => async (dispatch: Dispatch) => {
     dispatch({ type: Types.POST_LOADING });
     try {
          const response = await axios.get(`/post/all`);
          const posts = response.data.posts;

          const FinalPosts = posts.map((post: IPost) => {
               const { null: RootComments, ...Replies } = commentsWithParentId(post.comments)
               RootComments.sort((a: IComment, b: IComment) => b.createdAt - a.createdAt)
               return { ...post, RootComments, Replies }
          });

          dispatch({ type: Types.GET_POST_DATA_SUCCESS, payload: FinalPosts })
     } catch (error) {
          console.log('error: ', error);
          dispatch({ type: Types.POST_ERROR, payload: error });
     }
}

const getComments = (url: string) => async (dispatch: Dispatch) => {
     dispatch({ type: Types.POST_LOADING });
     try {
          const response = await axios.get(`/post/${url}/comments`);
          const { null: RootComments, ...comments } = commentsWithParentId(response.data.postComment)
          console.log('RootComments: ', RootComments);
          dispatch({ type: Types.GET_POST_COMMENT_SUCCESS, payload: { RootComments, comments } })
     } catch (error) {
          console.log('error: ', error);
          dispatch({ type: Types.POST_ERROR, payload: error });
     }
}

const createComment = (data: CreateCommentType) => async (dispatch: Dispatch<any>) => {
     dispatch({ type: Types.POST_LOADING });
     try {
          const user = JSON.parse(sessionStorage.getItem("user") || "");
          if (user == null) {
               return alert("Please Login");
          }

          const author = user._id;
          const response = await axios.post(`/post/comment/new`, { ...data, author, authorID: author });

          dispatch(getAllPost());
          dispatch({ type: Types.POST_OPERATION_SUCCESS })
     } catch (error) {
          console.log('error: ', error);
          dispatch({ type: Types.POST_ERROR, payload: error });
     }
}


const commentsWithParentId = (Comments: IComment[]) => {
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


export { getAllPost, getComments, createComment };