import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MenuWebsite = () => {
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the menu data
    axios
      .get("/api/menu-website") // Replace with your API endpoint
      .then((response) => {
        setMenuData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Apa anda yakin untuk hapus Data ini?")) {
      axios
        .delete(`/api/delete-menu-website/${id}`) // Replace with your API endpoint
        .then(() => {
          setMenuData(menuData.filter((item) => item.id_menu !== id));
        })
        .catch((error) => {
          console.error("Error deleting menu item:", error);
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
          <h3 className="box-title">Menu Website (Multilevel)</h3>
          <Link
            className="pull-right btn btn-primary btn-sm"
            to="/administrator/tambah_menuwebsite"
          >
            Tambahkan Data
          </Link>
        </div>
        <div className="box-body">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th style={{ width: "20px" }}>No</th>
                <th>Menu</th>
                <th>Level Menu</th>
                <th>Link</th>
                <th>Aktif</th>
                <th>Position</th>
                <th>Urutan</th>
                <th style={{ width: "70px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {menuData.map((row, index) => {
                const cmenu = menuData.find(
                  (item) => item.id_menu === row.id_parent
                ) || { nama_menu: "Menu Utama" };
                return (
                  <tr key={row.id_menu}>
                    <td>{index + 1}</td>
                    <td>{row.nama_menu}</td>
                    <td>{cmenu.nama_menu}</td>
                    <td>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`${window.location.origin}/${row.link}`}
                      >
                        {row.link}
                      </a>
                    </td>
                    <td>{row.aktif ? "Aktif" : "Tidak Aktif"}</td>
                    <td>{row.position}</td>
                    <td>{row.urutan}</td>
                    <td>
                      <center>
                        <Link
                          className="btn btn-success btn-xs"
                          title="Edit Data"
                          to={`/administrator/edit_menuwebsite/${row.id_menu}`}
                        >
                          <span className="glyphicon glyphicon-edit"></span>
                        </Link>
                        <button
                          className="btn btn-danger btn-xs"
                          title="Delete Data"
                          onClick={() => handleDelete(row.id_menu)}
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

export default MenuWebsite;
