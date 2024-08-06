import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SemuaBerita = () => {
  const [record, setRecord] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch berita data
    axios
      .get("/api/semua-berita") // Replace with your API endpoint
      .then((response) => {
        setRecord(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching berita data:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Apa anda yakin untuk hapus Data ini?")) {
      axios
        .delete(`/api/delete-listberita/${id}`) // Replace with your API endpoint
        .then(() => {
          setRecord(record.filter((item) => item.id_berita !== id));
        })
        .catch((error) => {
          console.error("Error deleting berita:", error);
        });
    }
  };

  const formatDate = (dateString) => {
    // Implement your date formatting function if needed
    return new Date(dateString).toLocaleDateString("id-ID"); // Example format
  };

  const getStatusLabel = (status) => {
    return status === "Y" ? (
      <span style={{ color: "green" }}>Published</span>
    ) : (
      <span style={{ color: "red" }}>Unpublished</span>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="col-xs-12">
      <div className="box">
        <div className="box-header">
          <h3 className="box-title">Semua Berita</h3>
          <Link
            className="pull-right btn btn-primary btn-sm"
            to="/administrator/tambah_listberita"
          >
            Tambahkan Data
          </Link>
        </div>
        <div className="box-body">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th style={{ width: "20px" }}>No</th>
                <th>Judul Berita</th>
                <th>Tanggal</th>
                <th>Status</th>
                <th style={{ width: "75px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {record.map((row, index) => (
                <tr key={row.id_berita}>
                  <td>{index + 1}</td>
                  <td>{row.judul}</td>
                  <td>{formatDate(row.tanggal)}</td>
                  <td>{getStatusLabel(row.status)}</td>
                  <td>
                    <center>
                      <Link
                        className="btn btn-primary btn-xs"
                        title="Publish/Unpublish Data"
                        to={`/administrator/publish_listberita/${row.id_berita}/${row.status}`}
                      >
                        <span className="glyphicon glyphicon-ok"></span>
                      </Link>
                      <Link
                        className="btn btn-success btn-xs"
                        title="Edit Data"
                        to={`/administrator/edit_listberita/${row.id_berita}`}
                      >
                        <span className="glyphicon glyphicon-edit"></span>
                      </Link>
                      <button
                        className="btn btn-danger btn-xs"
                        title="Delete Data"
                        onClick={() => handleDelete(row.id_berita)}
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

export default SemuaBerita;
