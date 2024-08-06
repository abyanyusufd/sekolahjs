import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Polling = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // Fetch the polling data
    axios
      .get("/api/polling") // Replace with your API endpoint
      .then((response) => {
        setRecords(response.data);
      })
      .catch((error) => {
        console.error("Error fetching polling data:", error);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Apa anda yakin untuk hapus Data ini?")) {
      axios
        .delete(`/api/delete-polling/${id}`) // Replace with your API endpoint
        .then(() => {
          setRecords(records.filter((record) => record.id_poling !== id));
        })
        .catch((error) => {
          console.error("Error deleting polling data:", error);
        });
    }
  };

  return (
    <div className="col-xs-12">
      <div className="box">
        <div className="box-header">
          <h3 className="box-title">Polling / Jajak Pendapat</h3>
          <Link
            className="pull-right btn btn-primary btn-sm"
            to="/administrator/tambah_jajakpendapat"
          >
            Tambahkan Data
          </Link>
        </div>
        <div className="box-body">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th style={{ width: "20px" }}>No</th>
                <th>Pilihan</th>
                <th>Status</th>
                <th>Rating</th>
                <th>Aktif</th>
                <th style={{ width: "70px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((row, index) => (
                <tr key={row.id_poling}>
                  <td>{index + 1}</td>
                  <td>{row.pilihan}</td>
                  <td>{row.status}</td>
                  <td>{row.rating}</td>
                  <td>{row.aktif}</td>
                  <td>
                    <center>
                      <Link
                        className="btn btn-success btn-xs"
                        title="Edit Data"
                        to={`/administrator/edit_jajakpendapat/${row.id_poling}`}
                      >
                        <span className="glyphicon glyphicon-edit"></span>
                      </Link>
                      <button
                        className="btn btn-danger btn-xs"
                        title="Delete Data"
                        onClick={() => handleDelete(row.id_poling)}
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

export default Polling;
