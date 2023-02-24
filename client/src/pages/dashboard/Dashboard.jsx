import React, { useState } from "react";
import { useSelector } from "react-redux";
import Card from "../../components/cards/Card";
import Tasks from "../../components/tables/Tasks";
import Users from "../../components/tables/Users";

function Dashboard() {
  const [usersData, setUsersData] = useState({ enable: 0, disable: 0 });
  const [taskData, setTasksData] = useState({
    complete: 0,
    pending: 0,
    expired: 0,
  });
  const userState = useSelector((state) => state.userReducer);
  return (
    <div>
      {userState?.isSuper && <div
        style={{
          marginTop: "100px",
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <Card class={"success"} count={usersData.enable} title={"Enabled Users"} />
        <Card class={"danger"} count={usersData.disable} title={"Disabled Users"} />
        <Card class={"success"} count={taskData.complete} title={"Completed Tasks"} />
        <Card class={"danger"} count={taskData.expired} title={"Expired Tasks"} />
        <Card class={"secondary"} count={taskData.pending} title={"Pending Tasks"} />
      </div>}
      <Tasks handleTaskData={setTasksData}/>
      {userState?.isSuper && <Users handleUserData={setUsersData}/>}
    </div>
  );
}

export default Dashboard;
