/**
 * Halaman legal dan institusional dalam Bahasa Indonesia
 * Matriks Takdir
 */

export interface LegalPageContent {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  badge: string;
  lastUpdated: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
}

export const idLegalPages: Record<string, LegalPageContent> = {
  about: {
    slug: "about",
    title: "Tentang Matriks Takdir",
    metaTitle: "Tentang Kami — Matriks Takdir & Metodologi",
    metaDescription:
      "Pelajari Matriks Takdir: Platform edukasi independen yang mengeksplorasi sistem 22 Arkana dengan ketelitian algoritma dan keterbukaan etis.",
    badge: "Publikasi Edukatif",
    lastUpdated: "Oktober 2026",
    sections: [
      {
        heading: "Misi dan Tujuan Kami",
        paragraphs: [
          "Matriks Takdir adalah platform digital independen untuk analisis arketipe dan refleksi diri. Tujuan kami adalah menyajikan metode 22 Arkana dengan kejelasan matematika, transparansi algoritma, dan kedalaman filosofis, tanpa sensasionalisme mistis.",
          "Kami percaya bahwa sarana refleksi diri yang mendalam harus dapat diakses oleh semua orang. Oleh karena itu, kami menyediakan perhitungan lengkap tanpa dinding pembayaran tersembunyi dan tanpa penyimpanan data pribadi yang tidak transparan.",
        ],
      },
      {
        heading: "Metodologi dan Asal-Usul",
        paragraphs: [
          "Kami mengacu pada standar kanonik yang disusun pada tahun 2006 oleh Natalia Ladini di Eropa Timur. Sistem ini memadukan numerologi reduksi 22, 22 Arkana Mayor, dan pemetaan tujuh pusat energi (cakra) pada bintang segi delapan (oktagram).",
          "Berbeda dari alat lain yang memotong angka secara sepihak, mesin kalkulasi kami menghitung jumlah penuh empat digit tahun kelahiran matahari dan mematuhi rumus asli metode ini.",
        ],
      },
      {
        heading: "Batasan Jujur dan Standar Etika",
        paragraphs: [
          "Kami menegaskan secara terbuka bahwa Matriks Takdir bukanlah sains empiris, tidak memiliki validasi laboratorium klinis, dan tidak menggantikan nasihat medis, psikologis, hukum, maupun keuangan profesional.",
          "Metode ini adalah cermin simbolis untuk introspeksi diri, memupuk tanggung jawab pribadi, dan membangun dialog batin yang jujur dengan diri sendiri.",
        ],
      },
    ],
  },

  contact: {
    slug: "contact",
    title: "Kontak dan Dukungan",
    metaTitle: "Kontak — Matriks Takdir",
    metaDescription:
      "Hubungi tim Matriks Takdir untuk pertanyaan teknis, saran editorial, privasi data, atau kerja sama.",
    badge: "Layanan Pengguna",
    lastUpdated: "Oktober 2026",
    sections: [
      {
        heading: "Cara Menghubungi Kami",
        paragraphs: [
          "Apakah Anda memiliki pertanyaan seputar perhitungan, menemukan kendala tampilan, atau ingin memberikan masukan editorial? Tim kami siap membantu Anda.",
          "Kami berusaha merespons setiap pesan dalam waktu 24 hingga 48 jam pada hari kerja.",
        ],
        bullets: [
          "Pertanyaan Umum: support@thematrixofdestiny.com",
          "Koreksi Editorial: editorial@thematrixofdestiny.com",
          "Privasi & Data: privacy@thematrixofdestiny.com",
        ],
      },
      {
        heading: "Sebelum Menghubungi Kami",
        paragraphs: [
          "Kami menyarankan Anda memeriksa panduan dan artikel blog kami terlebih dahulu. Banyak pertanyaan umum mengenai perbedaan angka atau langkah perhitungan telah dibahas secara lengkap di sana.",
        ],
      },
    ],
  },

  "editorial-policy": {
    slug: "editorial-policy",
    title: "Kebijakan Editorial",
    metaTitle: "Kebijakan Editorial — Matriks Takdir",
    metaDescription:
      "Standar kualitas dan etika penulisan konten Matriks Takdir: Bebas klaim berlebihan, transparan, dan diperbarui secara berkala.",
    badge: "Standar Mutu",
    lastUpdated: "Oktober 2026",
    sections: [
      {
        heading: "Prinsip Penulisan Konten",
        paragraphs: [
          "Seluruh panduan dan artikel di platform kami disusun dengan kejujuran intelektual. Kami menolak janji muluk-muluk (seperti 'jaminan kekayaan instan') dan berfokus pada potensi pertumbuhan nyata serta jebakan bayangan yang perlu diwaspadai.",
          "Setiap konten ditulis secara mandiri berdasarkan telaah arketipe dan psikologi reflektif modern.",
        ],
      },
      {
        heading: "Menolak Klaim Palsu dan Pseudosains",
        paragraphs: [
          "Kami tidak pernah mengklaim bahwa Matriks Takdir terbukti secara sains empiris. Kami tidak membuat testimoni rekaan atau memalsukan data statistik.",
          "Setiap artikel menyajikan definisi yang jelas di awal, perbandingan berimbang, serta jawaban jujur mengenai batasan metode ini.",
        ],
      },
      {
        heading: "Koreksi dan Pembaruan Kontinyu",
        paragraphs: [
          "Apabila ditemukan kekeliruan perhitungan matematis atau ketidakjelasan dalam teks, kami segera melakukan perbaikan dan mencantumkan tanggal pembaruan terkini.",
        ],
      },
    ],
  },

  disclaimer: {
    slug: "disclaimer",
    title: "Penafian & Batasan Tanggung Jawab",
    metaTitle: "Penafian Hukum — Matriks Takdir",
    metaDescription:
      "Penafian hukum resmi penggunaan Matriks Takdir: Bukan ramalan masa depan, bukan nasihat medis, hukum, atau keuangan.",
    badge: "Pemberitahuan Hukum",
    lastUpdated: "Oktober 2026",
    sections: [
      {
        heading: "Tujuan Edukasi dan Refleksi Semata",
        paragraphs: [
          "Informasi, bagan, dan penafsiran pada situs web ini disediakan hanya untuk tujuan edukasi, hiburan sehat, dan refleksi diri pribadi.",
          "Tidak ada pernyataan di platform ini yang merupakan ramalan nasib mutlak. Masa depan Anda senantiasa ditentukan oleh pilihan sadar dan tindakan nyata Anda sendiri.",
        ],
      },
      {
        heading: "Bukan Pengganti Layanan Profesional",
        paragraphs: [
          "Konten kami sama sekali tidak menggantikan diagnosis medis profesional, terapi kesehatan mental, konsultasi hukum, atau nasihat investasi berlisensi.",
          "Jika Anda mengalami krisis emosional atau masalah kesehatan darurat, segeralah mencari bantuan dari tenaga medis atau konselor profesional.",
        ],
      },
      {
        heading: "Batasan Tanggung Jawab Pengelola",
        paragraphs: [
          "Penggunaan kalkulator dan materi bacaan dilakukan atas kesadaran dan tanggung jawab pribadi pengguna. Pengelola situs tidak bertanggung jawab atas keputusan hidup yang diambil berdasarkan tafsir simbolis ini.",
        ],
      },
    ],
  },

  privacy: {
    slug: "privacy",
    title: "Kebijakan Privasi",
    metaTitle: "Kebijakan Privasi — Matriks Takdir",
    metaDescription:
      "Perlindungan data pribadi Anda: Tanggal lahir tidak disimpan permanen tanpa izin, pemrosesan aman sesuai standar privasi modern.",
    badge: "Keamanan Data",
    lastUpdated: "Oktober 2026",
    sections: [
      {
        heading: "Pemrosesan Tanggal Lahir Anda",
        paragraphs: [
          "Saat Anda memasukkan tanggal lahir ke kalkulator kami, perhitungan dilakukan di peramban Anda atau diproses sementara untuk membuat bagan SVG/PDF. Kami tidak menyimpan tanggal lahir Anda di pangkalan data secara permanen, kecuali Anda mendaftar akun pengguna secara sukarela.",
          "Kami tidak pernah menjual data pribadi pengguna kepada pihak ketiga mana pun.",
        ],
      },
      {
        heading: "Cookie dan Mitra Periklanan",
        paragraphs: [
          "Untuk membiayai operasional layanan gratis ini, kami bermitra dengan penyedia iklan digital terpercaya (Google AdSense). Mitra kami dapat menggunakan cookie untuk menyajikan iklan yang relevan dan tidak mengganggu.",
          "Anda memiliki kendali penuh untuk menerima atau menolak cookie non-esensial melalui spanduk preferensi cookie kami.",
        ],
      },
      {
        heading: "Hak Pengguna atas Data",
        paragraphs: [
          "Anda berhak meminta informasi mengenai data apa pun yang diproses serta meminta penghapusannya sewaktu-waktu dengan menghubungi kami di privacy@thematrixofdestiny.com.",
        ],
      },
    ],
  },

  terms: {
    slug: "terms",
    title: "Syarat dan Ketentuan Penggunaan",
    metaTitle: "Syarat dan Ketentuan — Matriks Takdir",
    metaDescription:
      "Ketentuan penggunaan situs Matriks Takdir: Penggunaan wajar, hak cipta intelektual, dan batasan operasional.",
    badge: "Ketentuan Layanan",
    lastUpdated: "Oktober 2026",
    sections: [
      {
        heading: "Penerimaan Ketentuan",
        paragraphs: [
          "Dengan mengakses situs web ini dan menggunakan kalkulator Matriks Takdir, Anda menyetujui seluruh syarat dan ketentuan ini. Jika Anda tidak menyetujuinya, mohon untuk tidak melanjutkan penggunaan layanan kami.",
        ],
      },
      {
        heading: "Hak Cipta dan Kekayaan Intelektual",
        paragraphs: [
          "Seluruh teks editorial, diagram visual, rancangan algoritma, kode sumber, dan elemen grafis dilindungi oleh undang-undang hak cipta. Anda diperbolehkan menggunakan dan membagikan laporan PDF pribadi Anda untuk keperluan non-komersial.",
          "Dilarang keras menyalin, mengikis data secara otomatis (scraping), atau memperjualbelikan materi situs ini tanpa izin tertulis dari pengelola.",
        ],
      },
      {
        heading: "Ketersediaan Layanan",
        paragraphs: [
          "Kami berupaya menjaga agar situs web ini senantiasa dapat diakses dengan lancar, namun kami tidak menjamin layanan akan selalu bebas dari gangguan teknis atau pemeliharaan berkala.",
        ],
      },
    ],
  },
};
