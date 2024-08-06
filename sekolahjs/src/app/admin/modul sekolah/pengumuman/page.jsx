import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DataPengumuman = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // Fetch the data pengumuman
    axios
      .get("/api/data-pengumuman") // Replace with your API endpoint
      .then((response) => {
        setRecords(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data pengumuman:", error);
      });
  }, []);

  const handleDelete = (idPengumuman) => {
    if (window.confirm("Apa anda yakin untuk hapus Data ini?")) {
      axios
        .delete(`/api/delete-pengumuman/${idPengumuman}`) // Replace with your API endpoint
        .then(() => {
          setRecords(
            records.filter((record) => record.id_pengumuman !== idPengumuman)
          );
        })
        .catch((error) => {
          console.error("Error deleting pengumuman:", error);
        });
    }
  };

  return (
    <div className="col-xs-12">
      <div className="box">
        <div className="box-header">
          <h3 className="box-title">Data Pengumuman</h3>
          <Link
            className="pull-right btn btn-primary btn-sm"
            to="/administrator/tambah_pengumuman"
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
                <th>File</th>
                <th>Tanggal</th>
                <th style={{ width: "70px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((row, index) => {
                const [tanggal, time] = row.tanggal.split(" ");
                const tglPosting = tgl_indo(tanggal); // Adjust this function as needed
                const downloadText = row.file_download ? (
                  "Download File"
                ) : (
                  <span style={{ color: "red" }}>Tidak ada File</span>
                );

                return (
                  <tr key={row.id_pengumuman}>
                    <td>{index + 1}</td>
                    <td>{row.judul}</td>
                    <td>
                      <a
                        title={row.file_download}
                        href={`/download/file_pengumuman/${row.file_download}`}
                      >
                        {downloadText}
                      </a>
                    </td>
                    <td>{`${tglPosting} ${time}`}</td>
                    <td>
                      <center>
                        <Link
                          className="btn btn-success btn-xs"
                          title="Edit Data"
                          to={`/administrator/edit_pengumuman/${row.id_pengumuman}`}
                        >
                          <span className="glyphicon glyphicon-edit"></span>
                        </Link>
                        <button
                          className="btn btn-danger btn-xs"
                          title="Delete Data"
                          onClick={() => handleDelete(row.id_pengumuman)}
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

const tgl_indo = (tanggal) => {
  // Replace this with your date formatting function if needed
  return tanggal;
};

export default DataPengumuman;
