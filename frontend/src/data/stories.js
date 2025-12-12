export const HAYES_STORY = {
  start: {
    title: "Babak 1: Dilema Gaji dan Janji",
    text: "Mr. Hayes bekerja pada kejaksaan agung negara Estambor. Gajinya tergerus habis oleh cicilan dan gaya hidup. Biasanya ada 'uang lelah', tapi kini meja kerjanya sepi. Ia butuh uang untuk hutang dan menjaga citra.",
    choices: [
      {
        text: "Membuka kasus elit untuk uang tutup mulut",
        effect: { money: 50000, trust: -35, risk: 10 },
        nextId: "babak2_pathA",
      },
      {
        text: "Restrukturisasi & peningkatan anggaran kerja resmi",
        effect: { money: 20000, trust: 30, risk: -10 },
        nextId: "babak2_pathB",
      },
    ],
  },
  babak2_pathA: {
    title: "Babak 2: Ambisi Legislatif (Jalur Uang Panas)",
    text: "Mr. Hayes mendapatkan uang dari perusahaan elit, namun dihantui rasa takut skandal. Untuk mengamankan posisi, ia ingin mengajukan diri sebagai anggota legislatif.",
    choices: [
      {
        text: "Mundur & bangun jaringan hukum, kampanye integritas",
        effect: { money: -15000, trust: 20, risk: 5 },
        nextId: "babak3_pathA",
      },
      {
        text: "Cari sponsor politik kuat, dana hitam & intimidasi",
        effect: { money: -5000, trust: 10, risk: 45 },
        nextId: "babak3_pathB",
      },
    ],
  },
  babak2_pathB: {
    title: "Babak 2: Ambisi Legislatif (Jalur Reputasi)",
    text: "Setelah menyelesaikan kasus besar dan reputasi naik, Mr. Hayes merasa uangnya masih kurang. Ia berpikir untuk menjabat anggota legislatif demi gaji lebih besar.",
    choices: [
      {
        text: "Mundur & bangun jaringan hukum, kampanye integritas",
        effect: { money: -15000, trust: 20, risk: 5 },
        nextId: "babak3_pathA",
      },
      {
        text: "Cari sponsor politik kuat, dana hitam & intimidasi",
        effect: { money: -5000, trust: 10, risk: 45 },
        nextId: "babak3_pathB",
      },
    ],
  },
  babak3_pathA: {
    title: "Babak 3: Konflik Dewan (Jalur Pengaruh)",
    text: "Mr. Hayes terpilih. Dalam rapat penting, ia berdiskusi masalah yang bisa mendatangkan uang. Namun, banyak anggota dewan kontra.",
    choices: [
      {
        text: "Gunakan pengaruh dan kompromi politik",
        effect: { money: 40000, trust: 35, risk: 20 },
        nextId: "babak4_pathA",
      },
      {
        text: "Manipulasi dan intimidasi lawan",
        effect: { money: 30000, trust: 35, risk: 35 },
        nextId: "babak4_pathB",
      },
    ],
  },
  babak3_pathB: {
    title: "Babak 3: Konflik Dewan (Jalur Keras)",
    text: "Terpilih dengan sponsor politik membuat Mr. Hayes ditekan partai. Dalam rapat besar, ia dihadang argumen keras oposisi.",
    choices: [
      {
        text: "Gunakan pengaruh dan kompromi politik",
        effect: { money: 40000, trust: 35, risk: 20 },
        nextId: "babak4_pathA",
      },
      {
        text: "Manipulasi dan intimidasi lawan",
        effect: { money: 30000, trust: 35, risk: 35 },
        nextId: "babak4_pathB",
      },
    ],
  },
  babak4_pathA: {
    title: "Babak 4: Dilema Kesetiaan (Pasca Kompromi)",
    text: "Kasus dimenangkan. Namun, teman dekat Mr. Hayes terjerat kasus pemerasan. Mr. Hayes ingin membantu.",
    choices: [
      {
        text: "Dorong transparansi & bentuk tim hukum",
        effect: { money: -15000, trust: 20, risk: 5 },
        nextId: "babak5_pathA",
      },
      {
        text: "Intervensi politik, suap, & kambing hitamkan korban",
        effect: { money: -20000, trust: -20, risk: 15 },
        nextId: "babak5_pathB",
      },
    ],
  },
  babak4_pathB: {
    title: "Babak 4: Dilema Kesetiaan (Pasca Manipulasi)",
    text: "Manipulasi berhasil. Namun, teman dekat Mr. Hayes terjerat pemerasan. Jika ia jatuh, jaringan gelap Mr. Hayes bisa terbongkar.",
    choices: [
      {
        text: "Dorong transparansi & bentuk tim hukum",
        effect: { money: -15000, trust: 20, risk: 5 },
        nextId: "babak5_pathA",
      },
      {
        text: "Intervensi politik, suap, & kambing hitamkan korban",
        effect: { money: -20000, trust: -20, risk: 15 },
        nextId: "babak5_pathB",
      },
    ],
  },
  babak5_pathA: {
    title: "Babak 5: Godaan Proyek Jembatan (Pasca Transparansi)",
    text: "Dana menipis. Ada peluang emas: Proyek Jembatan Nasional. Ada potensi untung pribadi 2% jika dimanipulasi.",
    choices: [
      {
        text: "Jaga integritas proyek & reputasi",
        effect: { money: 10000, trust: 40, risk: -15 },
        nextId: "babak6_pathA",
      },
      {
        text: "Potong 2%, pakai bahan murah & manipulasi laporan",
        effect: { money: 30000, trust: 25, risk: 40 },
        nextId: "babak6_pathB",
      },
    ],
  },
  babak5_pathB: {
    title: "Babak 5: Godaan Proyek Jembatan (Pasca Suap)",
    text: "Teman selamat lewat jalur gelap, tapi reputasi hancur. Proyek Jembatan Nasional muncul sebagai cara membeli kembali kepercayaan publik.",
    choices: [
      {
        text: "Jaga integritas proyek & reputasi",
        effect: { money: 10000, trust: 40, risk: -15 },
        nextId: "babak6_pathA",
      },
      {
        text: "Potong 2%, pakai bahan murah & manipulasi laporan",
        effect: { money: 30000, trust: 25, risk: 40 },
        nextId: "babak6_pathB",
      },
    ],
  },
  babak6_pathA: {
    title: "Babak 6: Ambisi Jenderal (Jalur Bersih)",
    text: "Reputasi stabil. Mr. Hayes kini mengincar posisi 'Jenderal Keamanan' yang bergengsi.",
    choices: [
      {
        text: "Bangun koalisi politik & reformasi keamanan",
        effect: { money: -10000, trust: 30, risk: 15 },
        nextId: "babak7_pathA",
      },
      {
        text: "Sewa pasukan bayaran & kolusi militer pensiunan",
        effect: { money: -20000, trust: 40, risk: 30 },
        nextId: "babak7_pathB",
      },
    ],
  },
  babak6_pathB: {
    title: "Babak 6: Ambisi Jenderal (Jalur Korupsi)",
    text: "Kaya raya dari korupsi jembatan, tapi gelisah. Jabatan Jenderal Keamanan menawarkan kekebalan hukum.",
    choices: [
      {
        text: "Bangun koalisi politik & reformasi keamanan",
        effect: { money: -10000, trust: 30, risk: 15 },
        nextId: "babak7_pathA",
      },
      {
        text: "Sewa pasukan bayaran & kolusi militer pensiunan",
        effect: { money: -20000, trust: 40, risk: 30 },
        nextId: "babak7_pathB",
      },
    ],
  },
  babak7_pathA: {
    title: "Babak 7: Mengamankan Posisi (Pasca Reformasi)",
    text: "PM ingin membubarkan jabatan Jenderal. Lawan politik menginginkan kekuasaan.",
    choices: [
      {
        text: "Koersi & beli dukungan komite",
        effect: { money: -10000, trust: 10, risk: 35 },
        nextId: "babak8_pathA",
      },
      {
        text: "Buktikan nilai dengan aksi nyata operasi cepat",
        effect: { money: -10000, trust: 35, risk: -10 },
        nextId: "babak8_pathB",
      },
    ],
  },
  babak7_pathB: {
    title: "Babak 7: Mengamankan Posisi (Pasca Pasukan Bayaran)",
    text: "Langkah pasukan bayaran dianggap kudeta oleh PM. Jabatan terancam.",
    choices: [
      {
        text: "Koersi & beli dukungan komite",
        effect: { money: -10000, trust: 10, risk: 35 },
        nextId: "babak8_pathA",
      },
      {
        text: "Buktikan nilai dengan aksi nyata operasi cepat",
        effect: { money: -10000, trust: 35, risk: -10 },
        nextId: "babak8_pathB",
      },
    ],
  },
  babak8_pathA: {
    title: "Babak 8: Anggaran Keamanan (Pasca Beli Dukungan)",
    text: "Jabatan aman tapi dana habis. Hayes mengajukan anggaran alat perang fantastis. Ada peluang mark-up.",
    choices: [
      {
        text: "Mark-up 5% & kompromi loyalitas",
        effect: { money: 50000, trust: -5, risk: 25 },
        nextId: "babak9_pathA",
      },
      {
        text: "Pengadaan 100% & reward profesional",
        effect: { money: -5000, trust: 25, risk: -5 },
        nextId: "babak9_pathB",
      },
    ],
  },
  babak8_pathB: {
    title: "Babak 8: Anggaran Keamanan (Pasca Aksi Nyata)",
    text: "Jabatan aman karena prestasi. Anggaran disetujui. Ada godaan mark-up 5% sebagai 'hadiah'.",
    choices: [
      {
        text: "Mark-up 5% & kompromi loyalitas",
        effect: { money: 50000, trust: -5, risk: 25 },
        nextId: "babak9_pathA",
      },
      {
        text: "Pengadaan 100% & reward profesional",
        effect: { money: -5000, trust: 25, risk: -5 },
        nextId: "babak9_pathB",
      },
    ],
  },
  babak9_pathA: {
    title: "Babak 9: Menuju PM (Pasca Korupsi)",
    text: "Kaya raya, Hayes ingin jadi Perdana Menteri. Rakyat mendesak PM lama turun.",
    choices: [
      {
        text: "Bangun koalisi & kampanye data",
        effect: { money: -1000, trust: 30, risk: 10 },
        nextId: "babak10_pathA",
      },
      {
        text: "Kolusi dengan penegak hukum & disinformasi",
        effect: { money: -1500, trust: -20, risk: 10 },
        nextId: "babak10_pathB",
      },
    ],
  },
  babak9_pathB: {
    title: "Babak 9: Menuju PM (Pasca Bersih)",
    text: "Reputasi bersih membuat Hayes populer. Ia ingin jadi PM untuk kebebasan berpendapat.",
    choices: [
      {
        text: "Bangun koalisi & kampanye data",
        effect: { money: -1000, trust: 30, risk: 10 },
        nextId: "babak10_pathA",
      },
      {
        text: "Kolusi dengan penegak hukum & disinformasi",
        effect: { money: -1500, trust: -20, risk: 10 },
        nextId: "babak10_pathB",
      },
    ],
  },
  babak10_pathA: {
    title: "Babak 10: Ujian Kursi PM (Pasca Koalisi)",
    text: "Hayes jadi PM! Tapi koalisi rentan. Muncul isu demonstrasi besar.",
    choices: [
      {
        text: "Dialog, reformasi, transparansi total",
        effect: { money: -15000, trust: 40, risk: 20 },
        nextId: "victory_good",
      },
      {
        text: "Konfrontasi & beli suara parlemen/media",
        effect: { money: -20000, trust: 20, risk: 15 },
        nextId: "victory_bad",
      },
    ],
  },
  babak10_pathB: {
    title: "Babak 10: Ujian Kursi PM (Pasca Kolusi)",
    text: "Hayes jadi PM lewat jalur gelap. Pihak yang membantunya menuntut balas budi.",
    choices: [
      {
        text: "Dialog, reformasi, transparansi total",
        effect: { money: -15000, trust: 40, risk: 20 },
        nextId: "victory_good",
      },
      {
        text: "Konfrontasi & beli suara parlemen/media",
        effect: { money: -20000, trust: 20, risk: 15 },
        nextId: "victory_bad",
      },
    ],
  },
  victory_good: {
    title: "Akhir Cerita: Legenda Estambor",
    text: "Mr. Hayes berhasil melewati badai demonstrasi. Sejarah akan mencatatnya sebagai pemimpin yang bertahan di puncak.",
    isEnd: true,
  },
  victory_bad: {
    title: "Akhir Cerita: Tirani Besi",
    text: "Dengan uang dan kekuasaan, suara rakyat diredam. Mr. Hayes duduk di kursi Perdana Menteri, kesepian di puncak kekuasaan.",
    isEnd: true,
  },
};
