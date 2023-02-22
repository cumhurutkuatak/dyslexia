import React, { useEffect, useState } from "react";
import "./scss/Datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { fetchUsers } from "../api/axios";

const columns = [
  { field: "firstName", headerName: "First name", width: 100 },
  { field: "lastName", headerName: "Last name", width: 100 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 50,
  },
  { field: "username", headerName: "User name", width: 100 },
  { field: "grade", headerName: "Grade", width: 100 },
  { field: "signedAt", headerName: "Kayıt tarihi", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
];

let rows = [];


const Datatable = () => {

  const [data, setData] = useState(rows);
  
  const handleDelete = (id) => {
    setData(data.filter(item=>item.id !== id));
  }

  useEffect(() => {
    fetchUsers().then(response => {
      setData(response.data)
      console.log(response.data)
    }).catch(error => {
      console.log(error.response.data.message);
    })
  }, [])

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/admin/users/1" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
  
            <div className="deleteButton">Delete</div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Kayıt Olan Kullanıcılar
        <Link
          to="/admin/users/new"
          style={{ textDecoration: "none" }}
          className="link"
        >
          Kullanıcı Ekle
        </Link>
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          getRowId={(data) => data._id}
          className="datagrid"
          rows={data}
          columns={columns.concat(actionColumn)}
          pageSize={8}
          rowsPerPageOptions={[8]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default Datatable;
