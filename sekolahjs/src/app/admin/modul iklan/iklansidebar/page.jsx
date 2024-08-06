import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const IklanHome = () => {
  const [record, setRecord] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch iklan home data
    axios
      .get("/api/iklanhome") // Replace with your API endpoint
      .then((response) => {
        setRecord(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching iklan home data:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Apa anda yakin untuk hapus Data ini?")) {
      axios
        .delete(`/api/delete-iklanhome/${id}`) // Replace with your API endpoint
        .then(() => {
          setRecord(record.filter((item) => item.id_iklantengah !== id));
        })
        .catch((error) => {
          console.error("Error deleting iklan home:", error);
        });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID"); // Format the date according to your locale
  };

  return (
    <div className="col-xs-12">
      <div className="box">
        <div className="box-header">
          <h3 className="box-title">Iklan Home</h3>
          <Link
            className="pull-right btn btn-primary btn-sm"
            to="/administrator/tambah_iklanhome"
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
                <th>Link</th>
                <th>Tgl Posting</th>
                <th style={{ width: "70px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {record.map((row, index) => (
                <tr key={row.id_iklantengah}>
                  <td>{index + 1}</td>
                  <td>{row.judul}</td>
                  <td>
                    <a target="_BLANK" rel="noopener noreferrer" href={row.url}>
                      {row.url}
                    </a>
                  </td>
                  <td>{formatDate(row.tgl_posting)}</td>
                  <td>
                    <center>
                      <Link
                        className="btn btn-success btn-xs"
                        title="Edit Data"
                        to={`/administrator/edit_iklanhome/${row.id_iklantengah}`}
                      >
                        <span className="glyphicon glyphicon-edit"></span>
                      </Link>
                      <button
                        className="btn btn-danger btn-xs"
                        title="Delete Data"
                        onClick={() => handleDelete(row.id_iklantengah)}
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

export default IklanHome;
