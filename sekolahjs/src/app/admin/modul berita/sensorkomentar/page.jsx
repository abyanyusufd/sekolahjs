import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SensorKomentar = () => {
  const [record, setRecord] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch sensor komentar data
    axios
      .get("/api/sensor-komentar") // Replace with your API endpoint
      .then((response) => {
        setRecord(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching sensor komentar data:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Apa anda yakin untuk hapus Data ini?")) {
      axios
        .delete(`/api/delete-sensorkomentar/${id}`) // Replace with your API endpoint
        .then(() => {
          setRecord(record.filter((item) => item.id_jelek !== id));
        })
        .catch((error) => {
          console.error("Error deleting sensor komentar:", error);
        });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="col-xs-12">
      <div className="box">
        <div className="box-header">
          <h3 className="box-title">Sensor Komentar Berita</h3>
          <Link
            className="pull-right btn btn-primary btn-sm"
            to="/administrator/tambah_sensorkomentar"
          >
            Tambahkan Data
          </Link>
        </div>
        <div className="box-body">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th style={{ width: "20px" }}>No</th>
                <th>Kata Jelek</th>
                <th>Ganti Menjadi</th>
                <th style={{ width: "70px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {record.map((row, index) => (
                <tr key={row.id_jelek}>
                  <td>{index + 1}</td>
                  <td>{row.kata}</td>
                  <td>{row.ganti}</td>
                  <td>
                    <center>
                      <Link
                        className="btn btn-success btn-xs"
                        title="Edit Data"
                        to={`/administrator/edit_sensorkomentar/${row.id_jelek}`}
                      >
                        <span className="glyphicon glyphicon-edit"></span>
                      </Link>
                      <button
                        className="btn btn-danger btn-xs"
                        title="Delete Data"
                        onClick={() => handleDelete(row.id_jelek)}
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

export default SensorKomentar;
