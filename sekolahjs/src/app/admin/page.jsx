// pages/admin-dashboard.js
import Head from "next/head";
import { useEffect } from "react";
import Link from "next/link";

const InfoBox = ({ href, icon, bgColor, title, count }) => (
  <Link href={href}>
    <a style={{ color: "#000" }}>
      <div className="col-md-3 col-sm-6 col-xs-12">
        <div className="info-box">
          <span className={`info-box-icon ${bgColor}`}>
            <i className={`fa ${icon}`}></i>
          </span>
          <div className="info-box-content">
            <span className="info-box-text">{title}</span>
            <span className="info-box-number">{count}</span>
          </div>
        </div>
      </div>
    </a>
  </Link>
);

const Home = () => {
  // Data simulasi, bisa digantikan dengan data dari API
  const counts = {
    berita: 10,
    halaman: 5,
    agenda: 8,
    users: 15,
    messages: 5,
    newsComments: 3,
    videoComments: 7,
  };

  useEffect(() => {
    // Logika untuk plugin atau script tambahan, jika diperlukan
  }, []);

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
        <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"
        />
        <link
          rel="stylesheet"
          href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
        />
        <link rel="stylesheet" href="/dist/css/AdminLTE.min.css" />
        <link rel="stylesheet" href="/plugins/iCheck/square/blue.css" />
      </Head>

      <div className="hold-transition login-page">
        <div className="container">
          <div className="row">
            <InfoBox
              href="/administrator/listberita"
              icon="fa-book"
              bgColor="bg-aqua"
              title="Berita"
              count={counts.berita}
            />
            <InfoBox
              href="/administrator/halamanbaru"
              icon="fa-file"
              bgColor="bg-green"
              title="Halaman"
              count={counts.halaman}
            />
            <InfoBox
              href="/administrator/agenda"
              icon="fa-files-o"
              bgColor="bg-yellow"
              title="Agenda"
              count={counts.agenda}
            />
            <InfoBox
              href="/administrator/manajemenuser"
              icon="fa-users"
              bgColor="bg-red"
              title="Users"
              count={counts.users}
            />
          </div>

          <div className="row">
            <div className="box col-lg-12">
              <div className="box-header">
                <h3 className="box-title">Application Buttons</h3>
              </div>
              <div className="box-body">
                <p>
                  Silahkan klik menu pilihan yang berada di sebelah kiri untuk
                  mengelola konten website Anda atau pilih ikon-ikon pada
                  Control Panel di bawah ini:
                </p>
                <div className="btn-group">
                  <a
                    href="/administrator/identitaswebsite"
                    className="btn btn-app"
                  >
                    <i className="fa fa-th"></i> Identitas
                  </a>
                  <a href="/administrator/menuwebsite" className="btn btn-app">
                    <i className="fa fa-th-large"></i> Menu
                  </a>
                  <a href="/administrator/halamanbaru" className="btn btn-app">
                    <i className="fa fa-file-text"></i> Halaman
                  </a>
                  <a href="/administrator/listberita" className="btn btn-app">
                    <i className="fa fa-television"></i> Berita
                  </a>
                  <a
                    href="/administrator/kategoriberita"
                    className="btn btn-app"
                  >
                    <i className="fa fa-bars"></i> Kategori
                  </a>
                  <a href="/administrator/tagberita" className="btn btn-app">
                    <i className="fa fa-tag"></i> Tag Berita
                  </a>
                  <a
                    href="/administrator/komentarberita"
                    className="btn btn-app"
                  >
                    <span className="badge bg-green">
                      {counts.newsComments}
                    </span>
                    <i className="fa fa-comments"></i> Komen. Berita
                  </a>
                  <a
                    href="/administrator/sensorkomentar"
                    className="btn btn-app"
                  >
                    <i className="fa fa-bell-slash"></i> Sensor
                  </a>
                  <a href="/administrator/album" className="btn btn-app">
                    <i className="fa fa-camera-retro"></i> Album
                  </a>
                  <a href="/administrator/gallery" className="btn btn-app">
                    <i className="fa fa-camera"></i> Gallery
                  </a>
                  <a href="/administrator/playlist" className="btn btn-app">
                    <i className="fa fa-caret-square-o-right"></i> Playlist
                  </a>
                  <a href="/administrator/video" className="btn btn-app">
                    <i className="fa fa-play"></i> Video
                  </a>
                  <a href="/administrator/tagvideo" className="btn btn-app">
                    <i className="fa fa-tags"></i> Tag Video
                  </a>
                  <a
                    href="/administrator/komentarvideo"
                    className="btn btn-app"
                  >
                    <span className="badge bg-blue">
                      {counts.videoComments}
                    </span>
                    <i className="fa fa-comments-o"></i> Komen. Video
                  </a>
                  <a href="/administrator/iklanatas" className="btn btn-app">
                    <i className="fa fa-file-image-o"></i> Ads Atas
                  </a>
                  <a href="/administrator/iklansidebar" className="btn btn-app">
                    <i className="fa fa-file-image-o"></i> Ads Sidebar
                  </a>
                  <a href="/administrator/iklanhome" className="btn btn-app">
                    <i className="fa fa-file-image-o"></i> Ads Tengah
                  </a>
                  <a href="/administrator/logowebsite" className="btn btn-app">
                    <i className="fa fa-circle-thin"></i> Logo
                  </a>
                  <a
                    href="/administrator/templatewebsite"
                    className="btn btn-app"
                  >
                    <i className="fa fa-file"></i> Template
                  </a>
                  <a href="/administrator/background" className="btn btn-app">
                    <i className="fa fa-circle"></i> Background
                  </a>
                  <a href="/administrator/agenda" className="btn btn-app">
                    <i className="fa fa-calendar-minus-o"></i> Agenda
                  </a>
                  <a href="/administrator/agenda" className="btn btn-app">
                    <i className="fa fa-calendar-minus-o"></i> Sekilas Info
                  </a>
                  <a
                    href="/administrator/jajakpendapat"
                    className="btn btn-app"
                  >
                    <i className="fa fa-bar-chart-o"></i> Polling
                  </a>
                  <a href="/administrator/ym" className="btn btn-app">
                    <i className="fa fa-yahoo"></i> YM
                  </a>
                  <a href="/administrator/download" className="btn btn-app">
                    <i className="fa fa-download"></i> Download
                  </a>
                  <a href="/administrator/alamat" className="btn btn-app">
                    <i className="fa fa-bed"></i> Alamat
                  </a>
                  <a href="/administrator/pesanmasuk" className="btn btn-app">
                    <span className="badge bg-yellow">{counts.messages}</span>
                    <i className="fa fa-envelope"></i> Pesan
                  </a>
                  <a
                    href="/administrator/manajemenuser"
                    className="btn btn-app"
                  >
                    <i className="fa fa-users"></i> Users
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <section className="col-lg-5 connectedSortable">
              {/* Tempat untuk grafik atau konten lainnya */}
              <div>Grafik placeholder</div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
