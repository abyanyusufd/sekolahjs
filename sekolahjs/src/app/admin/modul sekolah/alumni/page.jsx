import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SemuaDataAlumni = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // Fetch the alumni data
    axios
      .get("/api/alumni") // Replace with your API endpoint
      .then((response) => {
        setRecords(response.data);
      })
      .catch((error) => {
        console.error("Error fetching alumni data:", error);
      });
  }, []);

  const handleDelete = (idGrafik) => {
    if (window.confirm("Apa anda yakin untuk hapus Data ini?")) {
      axios
        .delete(`/api/delete-alumni/${idGrafik}`) // Replace with your API endpoint
        .then(() => {
          setRecords(records.filter((record) => record.id_grafik !== idGrafik));
        })
        .catch((error) => {
          console.error("Error deleting alumni:", error);
        });
    }
  };

  return (
    <div className="col-xs-12">
      <div className="box">
        <div className="box-header">
          <h3 className="box-title">Semua Data Alumni</h3>
          <Link
            className="pull-right btn btn-primary btn-sm"
            to="/administrator/tambah_alumni"
          >
            Tambahkan Data
          </Link>
        </div>
        <div className="box-body">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th style={{ width: "20px" }}>No</th>
                <th>Nama Kampus</th>
                <th>Jumlah Sebaran</th>
                <th>Tahun</th>
                <th style={{ width: "70px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((row, index) => (
                <tr key={row.id_grafik}>
                  <td>{index + 1}</td>
                  <td>{row.judul}</td>
                  <td>{row.jumlah}</td>
                  <td>{row.tahun}</td>
                  <td>
                    <center>
                      <Link
                        className="btn btn-success btn-xs"
                        title="Edit Data"
                        to={`/administrator/edit_alumni/${row.id_grafik}`}
                      >
                        <span className="glyphicon glyphicon-edit"></span>
                      </Link>
                      <button
                        className="btn btn-danger btn-xs"
                        title="Delete Data"
                        onClick={() => handleDelete(row.id_grafik)}
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

export default SemuaDataAlumni;
