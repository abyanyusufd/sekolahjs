import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const [userPermissions, setUserPermissions] = useState({});

  useEffect(() => {
    // Fetch user details
    axios.get("/api/user/details").then((response) => {
      setUser(response.data);
    });

    // Fetch user permissions
    axios.get("/api/user/permissions").then((response) => {
      setUserPermissions(response.data);
    });
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const hasPermission = (permission) => {
    return userPermissions[permission] || user.level === "admin";
  };

  return (
    <section className="sidebar">
      {/* Sidebar user panel */}
      <div className="user-panel">
        <div className="pull-left image">
          <img
            src={
              user.photo
                ? `/asset/foto_user/${user.photo}`
                : "/asset/foto_user/blank.png"
            }
            className="img-circle"
            alt="User Image"
          />
        </div>
        <div className="pull-left info">
          <p>{user.fullName}</p>
          <a href="#">
            <i className="fa fa-circle text-success"></i> Online
          </a>
        </div>
      </div>

      {/* Sidebar menu */}
      <ul className="sidebar-menu">
        <li
          className="header"
          style={{
            color: "#fff",
            textTransform: "uppercase",
            borderBottom: "2px solid #00c0ef",
          }}
        >
          MENU <span className="uppercase">{user.level}</span>
        </li>
        <li>
          <Link to="/administrator/home">
            <i className="fa fa-dashboard"></i> <span>Dashboard</span>
          </Link>
        </li>

        {hasPermission("identitaswebsite") && (
          <li className="treeview">
            <a href="#">
              <i className="glyphicon glyphicon-th-list"></i>{" "}
              <span>Menu Utama</span>
              <i className="fa fa-angle-left pull-right"></i>
            </a>
            <ul className="treeview-menu">
              <li>
                <Link to="/administrator/identitaswebsite">
                  <i className="fa fa-circle-o"></i> Identitas Website
                </Link>
              </li>
              <li>
                <Link to="/administrator/menuwebsite">
                  <i className="fa fa-circle-o"></i> Menu Website
                </Link>
              </li>
              <li>
                <Link to="/administrator/halamanbaru">
                  <i className="fa fa-circle-o"></i> Halaman Baru
                </Link>
              </li>
            </ul>
          </li>
        )}

        {hasPermission("listberita") && (
          <li className="treeview">
            <a href="#">
              <i className="glyphicon glyphicon-pencil"></i>{" "}
              <span>Modul Berita</span>
              <i className="fa fa-angle-left pull-right"></i>
            </a>
            <ul className="treeview-menu">
              <li>
                <Link to="/administrator/listberita">
                  <i className="fa fa-circle-o"></i> Berita
                </Link>
              </li>
              <li>
                <Link to="/administrator/kategoriberita">
                  <i className="fa fa-circle-o"></i> Kategori Berita
                </Link>
              </li>
              <li>
                <Link to="/administrator/tagberita">
                  <i className="fa fa-circle-o"></i> Tag Berita
                </Link>
              </li>
              <li>
                <Link to="/administrator/komentarberita">
                  <i className="fa fa-circle-o"></i> Komentar Berita
                </Link>
              </li>
              <li>
                <Link to="/administrator/sensorkomentar">
                  <i className="fa fa-circle-o"></i> Sensor Komentar
                </Link>
              </li>
              <li>
                <Link to="/administrator/album">
                  <i className="fa fa-circle-o"></i> Berita Foto
                </Link>
              </li>
              <li>
                <Link to="/administrator/gallery">
                  <i className="fa fa-circle-o"></i> Gallery Berita Foto
                </Link>
              </li>
            </ul>
          </li>
        )}

        {hasPermission("playlist") && (
          <li className="treeview">
            <a href="#">
              <i className="glyphicon glyphicon-play"></i>{" "}
              <span>Modul Video</span>
              <i className="fa fa-angle-left pull-right"></i>
            </a>
            <ul className="treeview-menu">
              <li>
                <Link to="/administrator/playlist">
                  <i className="fa fa-circle-o"></i> Playlist Video
                </Link>
              </li>
              <li>
                <Link to="/administrator/video">
                  <i className="fa fa-circle-o"></i> Video
                </Link>
              </li>
              <li>
                <Link to="/administrator/tagvideo">
                  <i className="fa fa-circle-o"></i> Tag Video
                </Link>
              </li>
              <li>
                <Link to="/administrator/komentarvideo">
                  <i className="fa fa-circle-o"></i> Komentar Video
                </Link>
              </li>
            </ul>
          </li>
        )}

        {hasPermission("iklanatas") && (
          <li className="treeview">
            <a href="#">
              <i className="glyphicon glyphicon-blackboard"></i>{" "}
              <span>Modul Iklan</span>
              <i className="fa fa-angle-left pull-right"></i>
            </a>
            <ul className="treeview-menu">
              <li>
                <Link to="/administrator/iklanatas">
                  <i className="fa fa-circle-o"></i> Iklan Atas
                </Link>
              </li>
              <li>
                <Link to="/administrator/iklanhome">
                  <i className="fa fa-circle-o"></i> Iklan Home
                </Link>
              </li>
              <li>
                <Link to="/administrator/iklansidebar">
                  <i className="fa fa-circle-o"></i> Iklan Sidebar
                </Link>
              </li>
              <li>
                <Link to="/administrator/banner">
                  <i className="fa fa-circle-o"></i> Iklan Link
                </Link>
              </li>
            </ul>
          </li>
        )}

        {hasPermission("logowebsite") && (
          <li className="treeview">
            <a href="#">
              <i className="glyphicon glyphicon-object-align-left"></i>{" "}
              <span>Modul Web</span>
              <i className="fa fa-angle-left pull-right"></i>
            </a>
            <ul className="treeview-menu">
              <li>
                <Link to="/administrator/logowebsite">
                  <i className="fa fa-circle-o"></i> Logo Website
                </Link>
              </li>
              <li>
                <Link to="/administrator/templatewebsite">
                  <i className="fa fa-circle-o"></i> Template Website
                </Link>
              </li>
              <li>
                <Link to="/administrator/background">
                  <i className="fa fa-circle-o"></i> Background Website
                </Link>
              </li>
            </ul>
          </li>
        )}

        {hasPermission("agenda") && (
          <li className="treeview">
            <a href="#">
              <i className="glyphicon glyphicon-blackboard"></i>{" "}
              <span>Modul Interaksi</span>
              <i className="fa fa-angle-left pull-right"></i>
            </a>
            <ul className="treeview-menu">
              <li>
                <Link to="/administrator/agenda">
                  <i className="fa fa-circle-o"></i> Agenda
                </Link>
              </li>
              <li>
                <Link to="/administrator/sekilasinfo">
                  <i className="fa fa-circle-o"></i> Sekilas Info
                </Link>
              </li>
              <li>
                <Link to="/administrator/jajakpendapat">
                  <i className="fa fa-circle-o"></i> Jajak Pendapat
                </Link>
              </li>
              <li>
                <Link to="/administrator/ym">
                  <i className="fa fa-circle-o"></i> Yahoo Messanger
                </Link>
              </li>
              <li>
                <Link to="/administrator/download">
                  <i className="fa fa-circle-o"></i> Download Area
                </Link>
              </li>
              <li>
                <Link to="/administrator/alamat">
                  <i className="fa fa-circle-o"></i> Alamat Kontak
                </Link>
              </li>
              <li>
                <Link to="/administrator/pesanmasuk">
                  <i className="fa fa-circle-o"></i> Pesan Masuk
                </Link>
              </li>
            </ul>
          </li>
        )}

        {hasPermission("manajemenuser") && (
          <li className="treeview">
            <a href="#">
              <i className="fa fa-users"></i> <span>Modul Users</span>
              <i className="fa fa-angle-left pull-right"></i>
            </a>
            <ul className="treeview-menu">
              <li>
                <Link to="/administrator/manajemenuser">
                  <i className="fa fa-circle-o"></i> Manajemen User
                </Link>
              </li>
              <li>
                <Link to="/administrator/manajemenmodul">
                  <i className="fa fa-circle-o"></i> Manajemen Modul
                </Link>
              </li>
            </ul>
          </li>
        )}

        {hasPermission("pengumuman") && (
          <li className="treeview">
            <a href="#">
              <i className="fa fa-institution"></i> <span>Modul Sekolah</span>
              <i className="fa fa-angle-left pull-right"></i>
            </a>
            <ul className="treeview-menu">
              <li>
                <Link to="/administrator/pengumuman">
                  <i className="fa fa-circle-o"></i> Pengumuman
                </Link>
              </li>
              <li>
                <Link to="/administrator/link_terkait">
                  <i className="fa fa-circle-o"></i> Link Terkait
                </Link>
              </li>
              <li>
                <Link to="/administrator/alumni">
                  <i className="fa fa-circle-o"></i> Data Alumni
                </Link>
              </li>
            </ul>
          </li>
        )}

        <li>
          <Link to={`/administrator/edit_manajemenuser/${user.username}`}>
            <i className="fa fa-edit"></i> <span>Edit Profile</span>
          </Link>
        </li>
        <li>
          <Link to="/administrator/logout">
            <i className="fa fa-power-off"></i> <span>Logout</span>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;
