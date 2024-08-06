import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ManajemenUsers = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // Fetch the manajemen users data
    axios
      .get("/api/manajemen-users") // Replace with your API endpoint
      .then((response) => {
        setRecords(response.data);
      })
      .catch((error) => {
        console.error("Error fetching manajemen users data:", error);
      });
  }, []);

  const handleDelete = (username) => {
    if (window.confirm("Apa anda yakin untuk hapus Data ini?")) {
      axios
        .delete(`/api/delete-manajemen-user/${username}`) // Replace with your API endpoint
        .then(() => {
          setRecords(records.filter((record) => record.username !== username));
        })
        .catch((error) => {
          console.error("Error deleting manajemen user data:", error);
        });
    }
  };

  return (
    <div className="col-xs-12">
      <div className="box">
        <div className="box-header">
          <h3 className="box-title">Manajemen Users</h3>
          <a
            className="pull-right btn btn-primary btn-sm"
            href="/administrator/tambah_manajemenuser"
          >
            Tambahkan Data
          </a>
        </div>
        <div className="box-body">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th style={{ width: "20px" }}>No</th>
                <th>Username</th>
                <th>Nama Lengkap</th>
                <th>Email</th>
                <th>Foto</th>
                <th>Blokir</th>
                <th>Level</th>
                <th style={{ width: "70px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((row, index) => {
                const foto = row.foto || "blank.png"; // Default to 'blank.png' if no photo
                return (
                  <tr key={row.username}>
                    <td>{index + 1}</td>
                    <td>{row.username}</td>
                    <td>{row.nama_lengkap}</td>
                    <td>{row.email}</td>
                    <td>
                      <img
                        style={{ border: "1px solid #cecece" }}
                        width="40px"
                        className="img-circle"
                        src={`/asset/foto_user/${foto}`}
                        alt="User"
                      />
                    </td>
                    <td>{row.blokir}</td>
                    <td>{row.level}</td>
                    <td>
                      <center>
                        <Link
                          className="btn btn-success btn-xs"
                          title="Edit Data"
                          to={`/administrator/edit_manajemenuser/${row.username}`}
                        >
                          <span className="glyphicon glyphicon-edit"></span>
                        </Link>
                        <button
                          className="btn btn-danger btn-xs"
                          title="Delete Data"
                          onClick={() => handleDelete(row.username)}
                        >
                          <span className="glyphicon glyphicon-remove"></span>
                        </button>
                      </center>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManajemenUsers;
