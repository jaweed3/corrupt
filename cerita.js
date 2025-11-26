[
    {
        id: "1_sekcam_dprd2",
    text: "Sekcam Bima ingin jadi anggota DPRD II. Dapilnya kuat money politics. Bima harus memilih: menang dengan menjual kinerja dan data administrasi, atau menggunakan dana operasional dan 'dana koordinasi' Kades.",
    choices: [
      {
        choice_id: "A",
        text: "Kampanye berbasis kinerja, menolak money politics, menggunakan data untuk program spesifik.",
        impact: {
          money: +100000000,
          trust: +20,
          risk: +10
        }
      },
      {
        choice_id: "B",
        text: "Menggunakan sisa Dana Operasional Kecamatan (DOK) untuk pra-kampanye dan memberi 'dana koordinasi' ke Kades.",
        impact: {
          money: +300000000,
          trust: -15,
          risk: +40
        }
      }
    ]
  },
  {
    id: "2_dprd2_jembatan",
    text: "Anggota DPRD Kartika mengelola proyek jembatan Rp 3 Miliar. Kebutuhan riil Rp 4 Miliar. Kontraktor menawarkan kickback Rp 300 Juta untuk mark-down kualitas material.",
    choices: [
      {
        choice_id: "A",
        text: "Menolak kickback, transparan ke publik, dan mengajukan dana tambahan Rp 1 Miliar demi kualitas dan keselamatan.",
        impact: {
          money: -5000000,
          trust: +25,
          risk: +5
        }
      },
      {
        choice_id: "B",
        text: "Menerima kickback Rp 300 Juta dan menginstruksikan mark-down kualitas material jembatan.",
        impact: {
          money: +300000000,
          trust: -25,
          risk: +55
        }
      }
    ]
  },
  {
    id: "3_warga_parkir",
    text: "Warga Bima menemukan lahan parkir ramai di tempat wisata yang tidak terjaga. Potensi pendapatan besar hilang dan rawan kehilangan/kriminalitas.",
    choices: [
      {
        choice_id: "A",
        text: "Melobi Pemerintah Desa/BUMDes untuk mengelola parkir secara resmi dan transparan dengan bagi hasil.",
        impact: {
          money: +5000000,
          trust: +15,
          risk: +0
        }
      },
      {
        choice_id: "B",
        text: "Mengambil alih lahan parkir, merekrut preman, dan melakukan pungutan liar (Pungli) tanpa karcis resmi.",
        impact: {
          money: +20000000,
          trust: -5,
          risk: +35
        }
      }
    ]
  },
  {
    id: "4_dprd1_dpr_ri",
    text: "Anggota DPRD I Haris gagal meraih kursi DPR RI. Petinggi partai menawarkan kursi kosong dengan manipulasi PAW, syaratnya suap Rp 5 Miliar dan janji konsesi kebijakan.",
    choices: [
      {
        choice_id: "A",
        text: "Menolak suap, membiarkan proses PAW berjalan, dan fokus pada jalur sengketa pemilu yang sah.",
        impact: {
          money: -50000000,
          trust: +35,
          risk: +15
        }
      },
      {
        choice_id: "B",
        text: "Menerima suap Rp 5 Miliar, menyetujui manipulasi PAW, dan berjanji mendukung kebijakan sponsor.",
        impact: {
          money: +5000000000,
          trust: -45,
          risk: +70
        }
      }
    ]
  },
  {
    id: "5_kas_negara_surplus",
    text: "Dirjen Anggaran Darman menemukan surplus APBN tak terduga sebesar Rp 12 Triliun yang belum dialokasikan oleh dewan. Ada peluang besar untuk penggelapan.",
    choices: [
      {
        choice_id: "A",
        text : "Transparan, segera mengundang DPR untuk mengalokasikan dana ke proyek strategis jangka panjang (penelitian, sanitasi).",
        impact: {
          money: +1000000000,
          trust: +40,
          risk: +5
        }
      },
      {
        choice_id: "B",
        text: "Menggelapkan Rp 600 Miliar dari surplus dengan pos pengeluaran fiktif dan transfer ke perusahaan cangkang (shell company) offshore.",
        impact: {
          money: +600000000000,
          trust: -60,
          risk: +85
        }
      }
    ]
  },
  {
    id: "6_dewan_ruu",
    text: "Anggota Dewan Risa ingin RUU Energi Hijau disahkan, tetapi menghadapi penolakan keras dari anggota senior yang didanai lobi fosil. Risa butuh persetujuan segera.",
    choices: [
      {
        choice_id: "A",
        text: "Membangun koalisi teknis, melobi dengan data, dan memobilisasi tekanan publik terhadap penolak RUU.",
        impact: {
          money: -50000000,
          trust: +30,
          risk: +10
        }
      },
      {
        choice_id: "B",
        text: "Menyuap staf/anggota kunci di Komisi Anggaran dan mengancam lawan dengan informasi rahasia atau skandal pribadi.",
        impact: {
          money: -200000000,
          trust: -20,
          risk: +45
        }
      }
    ]
  },
  {
    id: "7_jaksa_menhan_kolusi",
    text: "Jaksa Reno butuh Rp 5 M. Menhan Harimansyah butuh pengaman hukum untuk skema mark-up alutsista (Rp 500 M) agar Kemenhan tak digabung. Reno ditawari Rp 5 M untuk membuat SP3 fiktif.",
    choices: [
      {
        choice_id: "A",
        text: "Menolak suap, menggunakan informasi ini untuk membuka penyelidikan resmi terhadap korupsi Kemenhan dan menjadi Jaksa Pahlawan.",
        impact: {
          money: +50000000,
          trust: +45,
          risk: +50
        }
      },
      {
        choice_id: "B",
        text: "Menerima uang tunai Rp 5 M, membuat SP3 fiktif, dan membersihkan jejak dana Harimansyah demi keuntungan pribadi.",
        impact: {
          money: +5000000000,
          trust: -50,
          risk: +75
        }
      }
    ]
  },
   {
    id: "8_pengambilan_gaji_karyawan",
    text: "Anda adalah manajer proyek yang mengurus gaji 50 karyawan. Anda membutuhkan uang tambahan dan tahu karyawan tidak akan memeriksa rincian potongan. Anda tergoda mengambil 5% dari total gaji mereka.",
    choices: [
      {
        choice_id: "A",
        text: "Menolak mengambil gaji karyawan, mencari pekerjaan sampingan yang halal atau mengajukan insentif resmi kepada atasan.",
        impact: {
          money: +5000000,
          trust: +20,
          risk: +0
        }
      },
      {
        choice_id: "B",
        text: "Mengambil 5% dari total gaji karyawan dengan alasan 'biaya administrasi jasa' untuk keuntungan pribadi.",
        impact: {
          money: +15000000,
          trust: -15,
          risk: +30
        }
      }
    ]
  },
  {
    id: "9_pungli_parkir_gratis",
    text: "Anda bertugas mengawasi area umum di kantor pemerintahan (misal: area tunggu). Area parkir adalah fasilitas gratis, tapi Anda melihat peluang untuk Pungli harian tanpa ada pengawasan ketat.",
    choices: [
      {
        choice_id: "A",
        text: "Memasang tanda peringatan besar 'Parkir Gratis' dan menolak tawaran Pungli dari preman lokal.",
        impact: {
          money: -1000000,
          trust: +10,
          risk: +0
        }
      },
      {
        choice_id: "B",
        text: "Memasang karcis palsu dan meminta tarif parkir ilegal sebesar Rp 5.000 kepada pengunjung yang memanfaatkan fasilitas gratis.",
        impact: {
          money: +8000000,
          trust: -20,
          risk: +40
        }
      }
    ]
  },
  {
    id: "10_manipulasi_laporan_anggaran",
    text: "Anda adalah staf keuangan yang sedang mengejar deadline laporan APBN/APBD. Laporan riil masih kurang, namun Anda tergoda memasukkan data fiktif agar laporan selesai cepat dan mendapatkan bonus/gaji tepat waktu.",
    choices: [
      {
        choice_id: "A",
        text: "Bekerja lembur, mengumpulkan data riil yang valid, meskipun laporan terlambat dan bonus/gaji terancam tertunda.",
        impact: {
          money: -5000000,
          trust: +15,
          risk: +0
        }
      },
      {
        choice_id: "B",
        text: "Memasukkan data fiktif (mark-up dana taktis) untuk menutup selisih laporan, sehingga laporan selesai tepat waktu dan bonus/gaji didapatkan.",
        impact: {
          money: +10000000,
          trust: -25,
          risk: +45
        }
      }
    ]
  }
]