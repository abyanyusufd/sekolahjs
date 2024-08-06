import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [dataCounts, setDataCounts] = useState({
    berita: 0,
    halaman: 0,
    agenda: 0,
    users: 0,
    pesan: 0,
    komentarBerita: 0,
    komentarVideo: 0,
  });

  useEffect(() => {
    // Fetch data counts from the API
    const fetchDataCounts = async () => {
      try {
        const [
          berita,
          halaman,
          agenda,
          users,
          pesan,
          komentarBerita,
          komentarVideo,
        ] = await Promise.all([
          axios.get("/api/count/berita"),
          axios.get("/api/count/halaman"),
          axios.get("/api/count/agenda"),
          axios.get("/api/count/users"),
          axios.get("/api/count/pesan"),
          axios.get("/api/count/komentarBerita"),
          axios.get("/api/count/komentarVideo"),
        ]);
        setDataCounts({
          berita: berita.data.count,
          halaman: halaman.data.count,
          agenda: agenda.data.count,
          users: users.data.count,
          pesan: pesan.data.count,
          komentarBerita: komentarBerita.data.count,
          komentarVideo: komentarVideo.data.count,
        });
      } catch (error) {
        console.error("Error fetching data counts:", error);
      }
    };

    fetchDataCounts();
  }, []);

  return (
    <>
      <div className="row">
        <Link style={{ color: "#000" }} to="/administrator/listberita">
          <div className="col-md-3 col-sm-6 col-xs-12">
            <div className="info-box">
              <span className="info-box-icon bg-aqua">
                <i className="fa fa-book"></i>
              </span>
              <div className="info-box-content">
                <span className="info-box-text">Berita</span>
                <span className="info-box-number">{dataCounts.berita}</span>
              </div>
            </div>
          </div>
        </Link>

        <Link style={{ color: "#000" }} to="/administrator/halamanbaru">
          <div className="col-md-3 col-sm-6 col-xs-12">
            <div className="info-box">
              <span className="info-box-icon bg-green">
                <i className="fa fa-file"></i>
              </span>
              <div className="info-box-content">
                <span className="info-box-text">Halaman</span>
                <span className="info-box-number">{dataCounts.halaman}</span>
              </div>
            </div>
          </div>
        </Link>

        <Link style={{ color: "#000" }} to="/administrator/agenda">
          <div className="col-md-3 col-sm-6 col-xs-12">
            <div className="info-box">
              <span className="info-box-icon bg-yellow">
                <i className="fa fa-files-o"></i>
              </span>
              <div className="info-box-content">
                <span className="info-box-text">Agenda</span>
                <span className="info-box-number">{dataCounts.agenda}</span>
              </div>
            </div>
          </div>
        </Link>

        <Link style={{ color: "#000" }} to="/administrator/manajemenuser">
          <div className="col-md-3 col-sm-6 col-xs-12">
            <div className="info-box">
              <span className="info-box-icon bg-red">
                <i className="fa fa-users"></i>
              </span>
              <div className="info-box-content">
                <span className="info-box-text">Users</span>
                <span className="info-box-number">{dataCounts.users}</span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <section className="col-lg-7 connectedSortable">
        <div className="box">
          <div className="box-header">
            <h3 className="box-title">Application Buttons</h3>
          </div>
          <div className="box-body">
            <p>
              Silahkan klik menu pilihan yang berada di sebelah kiri untuk
              mengelola konten website anda atau pilih ikon-ikon pada Control
              Panel di bawah ini:
            </p>
            <Link to="/administrator/identitaswebsite" className="btn btn-app">
              <i className="fa fa-th"></i> Identitas
            </Link>
            <Link to="/administrator/menuwebsite" className="btn btn-app">
              <i className="fa fa-th-large"></i> Menu
            </Link>
            <Link to="/administrator/halamanbaru" className="btn btn-app">
              <i className="fa fa-file-text"></i> Halaman
            </Link>
            <Link to="/administrator/listberita" className="btn btn-app">
              <i className="fa fa-television"></i> Berita
            </Link>
            <Link to="/administrator/kategoriberita" className="btn btn-app">
              <i className="fa fa-bars"></i> Kategori
            </Link>
            <Link to="/administrator/tagberita" className="btn btn-app">
              <i className="fa fa-tag"></i> Tag Berita
            </Link>
            <Link to="/administrator/komentarberita" className="btn btn-app">
              <span className="badge bg-green">
                {dataCounts.komentarBerita}
              </span>
              <i className="fa fa-comments"></i> Komen. Berita
            </Link>
            <Link to="/administrator/sensorkomentar" className="btn btn-app">
              <i className="fa fa-bell-slash"></i> Sensor
            </Link>
            <Link to="/administrator/album" className="btn btn-app">
              <i className="fa fa-camera-retro"></i> Album
            </Link>
            <Link to="/administrator/gallery" className="btn btn-app">
              <i className="fa fa-camera"></i> Gallery
            </Link>
            <Link to="/administrator/playlist" className="btn btn-app">
              <i className="fa fa-caret-square-o-right"></i> Playlist
            </Link>
            <Link to="/administrator/video" className="btn btn-app">
              <i className="fa fa-play"></i> Video
            </Link>
            <Link to="/administrator/tagvideo" className="btn btn-app">
              <i className="fa fa-tags"></i> Tag Video
            </Link>
            <Link to="/administrator/komentarvideo" className="btn btn-app">
              <span className="badge bg-blue">{dataCounts.komentarVideo}</span>
              <i className="fa fa-comments-o"></i> Komen. Video
            </Link>
            <Link to="/administrator/iklanatas" className="btn btn-app">
              <i className="fa fa-file-image-o"></i> Ads Atas
            </Link>
            <Link to="/administrator/iklansidebar" className="btn btn-app">
              <i className="fa fa-file-image-o"></i> Ads Sidebar
            </Link>
            <Link to="/administrator/iklanhome" className="btn btn-app">
              <i className="fa fa-file-image-o"></i> Ads Tengah
            </Link>
            <Link to="/administrator/logowebsite" className="btn btn-app">
              <i className="fa fa-circle-thin"></i> Logo
            </Link>
            <Link to="/administrator/templatewebsite" className="btn btn-app">
              <i className="fa fa-file"></i> Template
            </Link>
            <Link to="/administrator/background" className="btn btn-app">
              <i className="fa fa-circle"></i> Background
            </Link>
            <Link to="/administrator/agenda" className="btn btn-app">
              <i className="fa fa-calendar-minus-o"></i> Agenda
            </Link>
            <Link to="/administrator/agenda" className="btn btn-app">
              <i className="fa fa-calendar-minus-o"></i> Sekilas Info
            </Link>
            <Link to="/administrator/jajakpendapat" className="btn btn-app">
              <i className="fa fa-bar-chart-o"></i> Polling
            </Link>
            <Link to="/administrator/ym" className="btn btn-app">
              <i className="fa fa-yahoo"></i> YM
            </Link>
            <Link to="/administrator/download" className="btn btn-app">
              <i className="fa fa-download"></i> Download
            </Link>
            <Link to="/administrator/alamat" className="btn btn-app">
              <i className="fa fa-bed"></i> Alamat
            </Link>
            <Link to="/administrator/pesanmasuk" className="btn btn-app">
              <span className="badge bg-yellow">{dataCounts.pesan}</span>
              <i className="fa fa-envelope"></i> Pesan
            </Link>
            <Link to="/administrator/manajemenuser" className="btn btn-app">
              <i className="fa fa-users"></i> Users
            </Link>
          </div>
        </div>
      </section>

      <section className="col-lg-5 connectedSortable">
        {/* Assuming you have a `Grafik` component */}
        <Grafik />
      </section>
    </>
  );
};

// Placeholder for Grafik component. Replace with actual implementation.
const Grafik = () => (
  <div>
    {/* Your grafik component content here */}
    <p>Grafik Component</p>
  </div>
);

export default Dashboard;
