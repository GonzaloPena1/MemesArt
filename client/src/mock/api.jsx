import postData from "./posts.json";

//Mock GET posts
const get = (url) => {
  switch (url) {
    case "/api/posts":
      return Promise.resolve({ data: postData });
    default:
      return Promise.reject(new Error("Not found"));
  }
};

//Mock LOGIN & SIGNUP
const post = (url, params) => {
  switch (url) {
    case "/api/login":
      return Promise.resolve({
        data: {
          id: 1,
          username: "admin",
          email: "admin@test.com",
          token: "123456789",
        },
      });
    case "/api/signup":
      return Promise.resolve({
        data: {
          id: 1,
          username: "admin",
          email: "admin@test.com",
          token: "123456789",
        },
      });
  }
};

// Mock UPDATE
const put = (url, params) => {
  switch (url) {
    case "/api/updatePost":
      return Promise.resolve({
        data: {
          id: params.id,
          title: params.title,
          postedBy: params.postedBy,
          image: params.image,
        },
      });
    default:
      return Promise.reject(new Error("Not found"));
  }
};

// Mock DELETE
const deleteRequest = (url) => {
  switch (url) {
    case "/api/deletePost":
      return Promise.resolve({ data: { success: true } });
    default:
      return Promise.reject(new Error("Not found"));
  }
};

const axios = {
  get,
  post,
  put,
  delete: () => {},
};
export default axios;
