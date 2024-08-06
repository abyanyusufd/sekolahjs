import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const KategoriBerita = () => {
  const [record, setRecord] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch kategori berita data
    axios
      .get("/api/kategori-berita") // Replace with your API endpoint
      .then((response) => {
        setRecord(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching kategori berita data:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Apa anda yakin untuk hapus Data ini?")) {
      axios
        .delete(`/api/delete-kategoriberita/${id}`) // Replace with your API endpoint
        .then(() => {
          setRecord(record.filter((item) => item.id_kategori !== id));
        })
        .catch((error) => {
          console.error("Error deleting kategori berita:", error);
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
          <h3 className="box-title">Kategori Berita</h3>
          <Link
            className="pull-right btn btn-primary btn-sm"
            to="/administrator/tambah_kategoriberita"
          >
            Tambahkan Data
          </Link>
        </div>
        <div className="box-body">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th style={{ width: "20px" }}>No</th>
                <th>Nama Kategori</th>
                <th>Link</th>
                <th>Posisi</th>
                <th>Aktif</th>
                <th style={{ width: "70px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {record.map((row, index) => (
                <tr key={row.id_kategori}>
                  <td>{index + 1}</td>
                  <td>{row.nama_kategori}</td>
                  <td>
                    <a
                      target="_BLANK"
                      rel="noopener noreferrer"
                      href={`/berita/kategori/${row.kategori_seo}`}
                    >
                      berita/kategori/{row.kategori_seo}
                    </a>
                  </td>
                  <td>{row.sidebar}</td>
                  <td>{row.aktif}</td>
                  <td>
                    <center>
                      <Link
                        className="btn btn-success btn-xs"
                        title="Edit Data"
                        to={`/administrator/edit_kategoriberita/${row.id_kategori}`}
                      >
                        <span className="glyphicon glyphicon-edit"></span>
                      </Link>
                      <button
                        className="btn btn-danger btn-xs"
                        title="Delete Data"
                        onClick={() => handleDelete(row.id_kategori)}
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

export default KategoriBerita;
