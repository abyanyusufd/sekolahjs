import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PesanMasuk = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // Fetch the incoming messages data
    axios
      .get("/api/pesan-masuk") // Replace with your API endpoint
      .then((response) => {
        setRecords(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pesan masuk data:", error);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Apa anda yakin untuk hapus Data ini?")) {
      axios
        .delete(`/api/delete-pesan-masuk/${id}`) // Replace with your API endpoint
        .then(() => {
          setRecords(records.filter((record) => record.id_hubungi !== id));
        })
        .catch((error) => {
          console.error("Error deleting pesan masuk data:", error);
        });
    }
  };

  return (
    <div className="col-xs-12">
      <div className="box">
        <div className="box-header">
          <h3 className="box-title">Pesan Masuk</h3>
        </div>
        <div className="box-body">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th style={{ width: "20px" }}>No</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Subjek</th>
                <th>Tanggal</th>
                <th style={{ width: "70px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((row, index) => {
                const date = new Date(row.tanggal).toLocaleDateString(); // Format date
                const fontWeight = row.dibaca === "N" ? "bold" : "normal";
                return (
                  <tr key={row.id_hubungi} style={{ fontWeight }}>
                    <td>{index + 1}</td>
                    <td>{row.nama}</td>
                    <td>{row.email}</td>
                    <td>{row.subjek}</td>
                    <td>{date}</td>
                    <td>
                      <center>
                        <Link
                          className="btn btn-success btn-xs"
                          title="Detail Data"
                          to={`/administrator/detail_pesanmasuk/${row.id_hubungi}`}
                        >
                          <span className="glyphicon glyphicon-send"></span>
                        </Link>
                        <button
                          className="btn btn-danger btn-xs"
                          title="Delete Data"
                          onClick={() => handleDelete(row.id_hubungi)}
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

export default PesanMasuk;
