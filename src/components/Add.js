import { Cache, gql, useMutation } from "@apollo/client";
// import { Mutation } from "@apollo/react-components";
import React, { useState } from "react";
import { ADD_USER, CREATE_USER, GET_LOCATIONS } from "../queries";

const Add = () => {
  const [user, setUser] = useState({});
  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    update(cache, { data }) {
      const { datas } = cache.readQuery({
        query: GET_LOCATIONS,
      });
      console.log(1212, datas);
      console.log(222, data);
      cache.writeQuery({
        query: GET_LOCATIONS,
        posts: {
          datas: [data.createPost, ...datas],
        },
      });
    },
  });
  const handleOnChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  // const updateCache = (cache, {data}) => {
  //     // Fetch the posts from the cache
  //     const existingPosts = cache.readQuery({

  //     })
  // console.log(888, data);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(user);
    createUser({
      variables: { input: user },

      // update: (cache, { data: { createUser } }) => {
      //   const data = cache.readQuery({ query: GET_LOCATIONS });
      //   console.log("UP", data);
      //   data.posts = [...data.posts.data, createUser];
      //   cache.writeQuery({ query: GET_LOCATIONS }, data);
      // },
    });

    console.log(444, user);
  };

  if (loading) return "Submitting...";
  if (error) console.log(error.message);
  return (
    <>
      <div>Add</div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            title:
            <input onChange={handleOnChange} type="text" name="title" />
          </label>
          <label>
            Body name:
            <input onChange={handleOnChange} type="text" name="body" />
          </label>

          <button className="btn btn-success" type="submit">
            Add New
          </button>
        </form>
      </div>
    </>
  );
};

export default Add;
