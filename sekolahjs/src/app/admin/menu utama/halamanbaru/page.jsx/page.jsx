import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HalamanBaru = () => {
  const [record, setRecord] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the halaman baru data
    axios
      .get("/api/halaman-baru") // Replace with your API endpoint
      .then((response) => {
        setRecord(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching halaman baru data:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Apa anda yakin untuk hapus Data ini?")) {
      axios
        .delete(`/api/delete-halaman-baru/${id}`) // Replace with your API endpoint
        .then(() => {
          setRecord(record.filter((item) => item.id_halaman !== id));
        })
        .catch((error) => {
          console.error("Error deleting halaman baru:", error);
        });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    // Implement your date formatting function if needed
    return new Date(dateString).toLocaleDateString("id-ID"); // Example format
  };

  const getKelompok = (kelompok) => {
    switch (kelompok) {
      case "0":
        return "Sambutan Kepsek";
      case "1":
        return "Profile Sekolah";
      case "2":
        return "Sarana dan Prasarana";
      default:
        return "Lainnya";
    }
  };

  return (
    <div className="col-xs-12">
      <div className="box">
        <div className="box-header">
          <h3 className="box-title">Halaman Baru</h3>
          <Link
            className="pull-right btn btn-primary btn-sm"
            to="/administrator/tambah_halamanbaru"
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
                <th>Kelompok</th>
                <th>Urutan</th>
                <th>Tgl Posting</th>
                <th style={{ width: "70px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {record.map((row, index) => (
                <tr key={row.id_halaman}>
                  <td>{index + 1}</td>
                  <td>{row.judul}</td>
                  <td>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`/halaman/detail/${row.judul_seo}`}
                    >
                      halaman/detail/{row.judul_seo}
                    </a>
                  </td>
                  <td>{getKelompok(row.kelompok)}</td>
                  <td>{row.urutan}</td>
                  <td>{formatDate(row.tgl_posting)}</td>
                  <td>
                    <center>
                      <Link
                        className="btn btn-success btn-xs"
                        title="Edit Data"
                        to={`/administrator/edit_halamanbaru/${row.id_halaman}`}
                      >
                        <span className="glyphicon glyphicon-edit"></span>
                      </Link>
                      <button
                        className="btn btn-danger btn-xs"
                        title="Delete Data"
                        onClick={() => handleDelete(row.id_halaman)}
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

export default HalamanBaru;
