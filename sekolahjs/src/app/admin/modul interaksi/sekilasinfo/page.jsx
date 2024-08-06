import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SekilasInfo = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // Fetch the sekilas info data
    axios
      .get("/api/sekilas-info") // Replace with your API endpoint
      .then((response) => {
        setRecords(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sekilas info data:", error);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Apa anda yakin untuk hapus Data ini?")) {
      axios
        .delete(`/api/delete-sekilas-info/${id}`) // Replace with your API endpoint
        .then(() => {
          setRecords(records.filter((record) => record.id_sekilas !== id));
        })
        .catch((error) => {
          console.error("Error deleting sekilas info data:", error);
        });
    }
  };

  return (
    <div className="col-xs-12">
      <div className="box">
        <div className="box-header">
          <h3 className="box-title">Sekilas Info</h3>
          <a
            className="pull-right btn btn-primary btn-sm"
            href="/administrator/tambah_sekilasinfo"
          >
            Tambahkan Data
          </a>
        </div>
        <div className="box-body">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th style={{ width: "20px" }}>No</th>
                <th>Foto</th>
                <th>Info</th>
                <th>Aktif</th>
                <th>Tanggal Posting</th>
                <th style={{ width: "70px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((row, index) => {
                const date = new Date(row.tgl_posting).toLocaleDateString(); // Format date
                return (
                  <tr key={row.id_sekilas}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={`/asset/foto_info/${row.gambar}`}
                        width="50"
                        alt="Sekilas Info"
                      />
                    </td>
                    <td>{row.info}</td>
                    <td>{row.aktif}</td>
                    <td>{date}</td>
                    <td>
                      <center>
                        <Link
                          className="btn btn-success btn-xs"
                          title="Edit Data"
                          to={`/administrator/edit_sekilasinfo/${row.id_sekilas}`}
                        >
                          <span className="glyphicon glyphicon-edit"></span>
                        </Link>
                        <button
                          className="btn btn-danger btn-xs"
                          title="Delete Data"
                          onClick={() => handleDelete(row.id_sekilas)}
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

export default SekilasInfo;
