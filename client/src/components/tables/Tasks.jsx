import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Tasks(props) {
  const {handleTaskData} = props
  const userState = useSelector((state) => state.userReducer);
  const [taskList, setTaskList] = useState([]);
  const [tasksReset,setTasksReset] = useState(false);

  setInterval( () => {
      const object = {};
      const completeTasks = taskList?.filter(
        (value) => (value.status === "Completed")
      );
      const pendingTasks = taskList?.filter((value) => (value.status === "Pending"));
      const expiredTasks = taskList?.filter((value) => (value.status === "Expired"));
  
  
      object.complete = completeTasks.length;
      object.pending = pendingTasks.length;
      object.expired = expiredTasks.length;
  
      handleTaskData({...object});
  },1000);
  
  useEffect(() => {
    const caller = async () => {
      const apiCall = async () => {
        const response = await axios.get(
          "http://localhost:8000/task/getTasks",
          {
            headers: {
              "auth-token": userState?.authToken,
            },
          }
        );
        return [...response?.data];
      };
      const data = await apiCall();
      setTaskList([...data]);
    };
    caller();
  }, [userState,tasksReset]);

  useEffect(() => {
    const expired = taskList.filter((item) => item.dueDate > Date.now());

    if (expired.length > 0) {
      expired.map(async (value, index) => {
        const apiCall = async () => {
          await axios.patch(
            `http://localhost:8000/task/changeStatus/${value.title}`,
            { status: "Expired" },
            {
              headers: {
                "auth-token": userState.authToken,
              },
            }
          );
        };
        await apiCall();
      });
    }
  });
  const handleUpdateStatus = (title) => {
    const caller = async () => {
      const apiCall = async () => {
        await axios.patch(
          `http://localhost:8000/task/changeStatus/${title}`,
          { status: "Completed" },
          {
            headers: {
              "auth-token": userState.authToken,
            },
          }
        );
      };
      await apiCall();
    };
    caller();
    setTasksReset((value) => !value);
  };
  return (
    <div style={{marginTop: "100px",backgroundColor: "rgba(255, 255, 255, 0.718)"}}>
      <h1>Tasks</h1>
      <table
        className="table table-hover table-responsive-md"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.718)",
          
        }}
      >
        
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Status</th>
            <th scope="col">Due Date</th>
            {userState.isSuper && <th scope="col">Assigned To</th>}
            {!userState?.isSuper && <th scope="col">Update Status</th>}
          </tr>
        </thead>
        <tbody>
          {taskList?.map((value, index) => (
            <tr
              key={index}
              className={
                value.status === "Completed"
                  ? "table-success"
                  : value.status === "Pending"
                  ? "table-secondary"
                  : "table-danger"
              }
            >
              <td>{value.title}</td>
              <td>{value.description}</td>
              <td>{value.status}</td>
              <td>{value.dueDate}</td>
              {userState.isSuper && <td>{value.assignedTo}</td>}
              {!userState?.isSuper && (
                <td>
                  {value.status === "Pending" ? (
                    <button type="button" className="btn btn-success btn-sm" onClick={()=>{handleUpdateStatus(value.title)}}>
                      Completed
                    </button>
                  ) : (
                    <span>NA</span>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tasks;
