import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ManajemenModul = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // Fetch the manajemen modul data
    axios
      .get("/api/manajemen-modul") // Replace with your API endpoint
      .then((response) => {
        setRecords(response.data);
      })
      .catch((error) => {
        console.error("Error fetching manajemen modul data:", error);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Apa anda yakin untuk hapus Data ini?")) {
      axios
        .delete(`/api/delete-manajemen-modul/${id}`) // Replace with your API endpoint
        .then(() => {
          setRecords(records.filter((record) => record.id_modul !== id));
        })
        .catch((error) => {
          console.error("Error deleting manajemen modul data:", error);
        });
    }
  };

  return (
    <div className="col-xs-12">
      <div className="box">
        <div className="box-header">
          <h3 className="box-title">Manajemen Modul</h3>
          <a
            className="pull-right btn btn-primary btn-sm"
            href="/administrator/tambah_manajemenmodul"
          >
            Tambahkan Data
          </a>
        </div>
        <div className="box-body">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th style={{ width: "20px" }}>No</th>
                <th>Nama Modul</th>
                <th>Link</th>
                <th>Publish</th>
                <th>Aktif</th>
                <th>Status</th>
                <th style={{ width: "70px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((row, index) => (
                <tr key={row.id_modul}>
                  <td>{index + 1}</td>
                  <td>{row.nama_modul}</td>
                  <td>
                    <a
                      href={`/administrator/${row.link}`}
                    >{`/administrator/${row.link}`}</a>
                  </td>
                  <td>{row.publish}</td>
                  <td>{row.aktif}</td>
                  <td>{row.status}</td>
                  <td>
                    <center>
                      <Link
                        className="btn btn-success btn-xs"
                        title="Edit Data"
                        to={`/administrator/edit_manajemenmodul/${row.id_modul}`}
                      >
                        <span className="glyphicon glyphicon-edit"></span>
                      </Link>
                      <button
                        className="btn btn-danger btn-xs"
                        title="Delete Data"
                        onClick={() => handleDelete(row.id_modul)}
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

export default ManajemenModul;
