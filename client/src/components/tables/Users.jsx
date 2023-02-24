import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Users(props) {
  const { handleUserData } = props;
  const userState = useSelector((state) => state.userReducer);
  const [usersList, setUsersList] = useState([]);
  const [usersReset, setUsersReset] = useState(false);

  setInterval(() => {
    const object = {};
    const enableUsers = usersList?.filter((value) => value.enabled);
    const disableUsers = usersList?.filter((value) => !value.enabled);

    object.enable = enableUsers.length;
    object.disable = disableUsers.length;

    handleUserData({ ...object });
  }, 1000);


  useEffect(() => {
    const caller = async () => {
      const apiCall = async () => {
        const response = await axios.get(
          "http://localhost:8000/user/getUsers",
          {
            headers: {
              "auth-token": userState?.authToken,
            },
          }
        );
        return [...response?.data];
      };
      const data = await apiCall();
      setUsersList([...data]);
    };
    caller();
  }, [userState, usersReset]);

  const handleToggleEnable = (userName) => {
    const caller = async () => {
      const apiCall = async () => {
        await axios.patch(
          `http://localhost:8000/user/toggleEnable/${userName}`
        );
      };

      await apiCall();
    };
    caller();
    setTimeout(function () {
      setUsersReset((value) => !value);
    }, 1000);
  };
  return (
    <div
      style={{
        marginTop: "100px",
        backgroundColor: "rgba(255, 255, 255, 0.718)",
      }}
    >
      <h1>Users</h1>
      <table
        className="table table-hover table-responsive-md"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.718)",
        }}
      >
        <thead>
          <tr>
            <th scope="col">username</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Status</th>
            <th scope="col">Change Status</th>
          </tr>
        </thead>
        <tbody>
          {usersList?.map((value, index) => (
            <tr
              key={index}
              className={value.enabled ? "table-success" : "table-danger"}
            >
              <td>{value.userName}</td>
              <td>{value.name}</td>
              <td>{value.age}</td>
              <td>{value.enabled ? "Enabled" : "Disabled"}</td>

              <td>
                {value.isSuper ? (
                  <span>Super User</span>
                ) : !value.enabled ? (
                  <button
                    type="button"
                    className="btn btn-success btn-sm"
                    onClick={() => {
                      handleToggleEnable(value.userName);
                    }}
                  >
                    Enable
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      handleToggleEnable(value.userName);
                    }}
                  >
                    Disable
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
