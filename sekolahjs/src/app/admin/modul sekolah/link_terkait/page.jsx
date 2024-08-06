import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LinkTerkait = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // Fetch the link terkait data
    axios
      .get("/api/link-terkait") // Replace with your API endpoint
      .then((response) => {
        setRecords(response.data);
      })
      .catch((error) => {
        console.error("Error fetching link terkait data:", error);
      });
  }, []);

  const handleDelete = (idLink) => {
    if (window.confirm("Apa anda yakin untuk hapus Data ini?")) {
      axios
        .delete(`/api/delete-link-terkait/${idLink}`) // Replace with your API endpoint
        .then(() => {
          setRecords(records.filter((record) => record.id_link !== idLink));
        })
        .catch((error) => {
          console.error("Error deleting link terkait:", error);
        });
    }
  };

  return (
    <div className="col-xs-12">
      <div className="box">
        <div className="box-header">
          <h3 className="box-title">Link Terkait</h3>
          <Link
            className="pull-right btn btn-primary btn-sm"
            to="/administrator/tambah_link_terkait"
          >
            Tambahkan Data
          </Link>
        </div>
        <div className="box-body">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th style={{ width: "20px" }}>No</th>
                <th>Judul</th>
                <th>Singkatan</th>
                <th>URL</th>
                <th style={{ width: "70px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((row, index) => (
                <tr key={row.id_link}>
                  <td>{index + 1}</td>
                  <td>{row.judul}</td>
                  <td>{row.singkatan}</td>
                  <td>
                    <a target="_blank" rel="noopener noreferrer" href={row.url}>
                      {row.url}
                    </a>
                  </td>
                  <td>
                    <center>
                      <Link
                        className="btn btn-success btn-xs"
                        title="Edit Data"
                        to={`/administrator/edit_link_terkait/${row.id_link}`}
                      >
                        <span className="glyphicon glyphicon-edit"></span>
                      </Link>
                      <button
                        className="btn btn-danger btn-xs"
                        title="Delete Data"
                        onClick={() => handleDelete(row.id_link)}
                      >
                        <span className="glyphicon glyphicon-remove"></span>
                      </button>
                    </center>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LinkTerkait;
