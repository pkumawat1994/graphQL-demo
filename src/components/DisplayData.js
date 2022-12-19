import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { DELETE_USER, GET_LOCATIONS } from "../queries";
// import { GET_USERS } from "../queries";
import "./DisplayData.css";

const DisplayData = () => {
  const [idd, setidd] = useState(null);
  const { loading, error, data } = useQuery(GET_LOCATIONS, {
    refetchQueries: [{ query: GET_LOCATIONS }],
  });
  const [deleteUser] = useMutation(DELETE_USER);
  console.log(5555, data);
  const deletItem = (id) => {
    // deleteUser({ variables: { idd } });
    // deleteMutation({ variables: { id: id } });
    // deleteUser({
    //   variables: { id },
    //   update(cache) {
    //     const normalizedId = cache.identify({ id, __typename: "Location" });
    //     cache.evict({ id: normalizedId });
    //     cache.gc();
    //   },
    // });
    deleteUser({
      variables: { id },
      update(cache, { data }) {
        const todos = cache.readQuery({
          query: GET_LOCATIONS,
        });
        // console.log(4545, todos.posts.data);
        cache.writeQuery({
          query: GET_LOCATIONS,
          data: {
            todos: todos.posts.data.filter(
              (todo) => todo.id !== todos.posts.data.id
            ),
          },
        });
      },
    });
  };
  return (
    <>
      {/* {error ? error : error.message} */}
      <h1>Display Data</h1>
      <table class="table table-condensed">
        <thead>
          <tr>
            <th>Id</th>
            <th>Tittle</th>
          </tr>
        </thead>
        <tbody>
          {loading ? "Loading..." : null}
          {/* {console.log(4444444, data?.posts?.data)} */}
          {data?.posts?.data?.map((ele) => {
            // console.log(555, ele);
            return (
              <>
                <tr>
                  <td>{ele.id}</td>
                  <td>{ele.title}</td>

                  <td
                    className="btn btn-danger ml-2"
                    onClick={() => deletItem(ele.id)}
                  >
                    DELETE
                  </td>
                  <td className="btn btn-success ml-2 ">EDIT</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default DisplayData;
