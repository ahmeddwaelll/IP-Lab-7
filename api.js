const SERVER_URL = "http://localhost:3000";

export const getAllPosts = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/posts`);
    if (!response.ok) throw new Error(`Error fetching posts: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("getAllPosts failed:", err);
    throw err;
  }
};

export const getPostDetails = async (postId) => {
  try {
    const [postRes, commentsRes] = await Promise.all([
      fetch(`${SERVER_URL}/posts/${postId}`),
      fetch(`${SERVER_URL}/posts/${postId}/comments`)
    ]);
    if (!postRes.ok) throw new Error(`Error fetching post: ${postRes.status}`);
    if (!commentsRes.ok) throw new Error(`Error fetching comments: ${commentsRes.status}`);
    const post = await postRes.json();
    const comments = await commentsRes.json();
    return { post, comments };
  } catch (err) {
    console.error("getPostDetails failed:", err);
    throw err;
  }
};

export const createNewPost = async (newPostData) => {
  try {
    const response = await fetch(`${SERVER_URL}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPostData)
    });
    if (!response.ok) throw new Error(`Error creating post: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("createNewPost failed:", err);
    throw err;
  }
};

export const createNewComment = async (postId, newCommentData) => {
  try {
    const response = await fetch(`${SERVER_URL}/posts/${postId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCommentData)
    });
    if (!response.ok) throw new Error(`Error creating comment: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("createNewComment failed:", err);
    throw err;
  }
};