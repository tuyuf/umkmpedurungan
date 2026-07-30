import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const categories = [
  { name: "Makanan & Minuman", slug: "makanan-minuman", order: 1 },
  { name: "Fashion & Tekstil", slug: "fashion-tekstil", order: 2 },
  { name: "Kecantikan & Kesehatan", slug: "kecantikan-kesehatan", order: 3 },
  { name: "Otomotif", slug: "otomotif", order: 4 },
  { name: "Elektronik", slug: "elektronik", order: 5 },
  { name: "Pertanian & Perkebunan", slug: "pertanian-perkebunan", order: 6 },
  { name: "Kerajinan & Seni", slug: "kerajinan-seni", order: 7 },
  { name: "Jasa", slug: "jasa", order: 8 },
  { name: "Pendidikan", slug: "pendidikan", order: 9 },
  { name: "Perdagangan", slug: "perdagangan", order: 10 },
];

const platforms = ["instagram", "facebook", "tiktok", "shopee", "tokopedia", "youtube"];

const umkmData: Array<{
  namaUsaha: string;
  deskripsi: string;
  alamat: string;
  namaPemilik: string;
  whatsapp: string;
  tanggalMulai: Date;
  showPhotoAlert: boolean;
  categorySlug: string;
  socialLinksCount: number;
  hasImages: boolean;
}> = [
  {
    namaUsaha: "Warung Bu Sari",
    deskripsi: "Warung makan rumahan dengan menu masakan Jawa yang lezat dan terjangkau. Tersedia nasi pecel, gudeg, dan aneka lauk pauk.",
    alamat: "Jl. Pedurungan Tengah No. 12, Semarang",
    namaPemilik: "Sari Dewi",
    whatsapp: "081234567890",
    tanggalMulai: new Date("2021-03-15"),
    showPhotoAlert: false,
    categorySlug: "makanan-minuman",
    socialLinksCount: 2,
    hasImages: false,
  },
  {
    namaUsaha: "Bengkel Motor Mas Joko",
    deskripsi: "Bengkel motor lengkap dengan servis ringan hingga overhaul. Melayani semua jenis motor dan tersedia sparepart original.",
    alamat: "Jl. Raya Pedurungan No. 45, Semarang",
    namaPemilik: "Joko Prasetyo",
    whatsapp: "081345678901",
    tanggalMulai: new Date("2019-07-20"),
    showPhotoAlert: false,
    categorySlug: "otomotif",
    socialLinksCount: 1,
    hasImages: false,
  },
  {
    namaUsaha: "Salon Cantik Rina",
    deskripsi: "Salon kecantikan modern dengan layanan potong rambut, facial, spa, dan perawatan tubuh. Harga mahasiswa tapi kualitas bintang lima.",
    alamat: "Jl. Setiabudi No. 8, Semarang",
    namaPemilik: "Rina Wulandari",
    whatsapp: "082134567890",
    tanggalMulai: new Date("2022-01-10"),
    showPhotoAlert: true,
    categorySlug: "kecantikan-kesehatan",
    socialLinksCount: 3,
    hasImages: false,
  },
  {
    namaUsaha: "Toko Bangunan Harapan",
    deskripsi: "Toko bangunan lengkap dengan material berkualitas. Melayani pengiriman ke seluruh Semarang dan sekitarnya.",
    alamat: "Jl. Gajah Mada No. 23, Semarang",
    namaPemilik: "Bambang Hartono",
    whatsapp: "085678901234",
    tanggalMulai: new Date("2018-05-01"),
    showPhotoAlert: false,
    categorySlug: "perdagangan",
    socialLinksCount: 1,
    hasImages: false,
  },
  {
    namaUsaha: "Konveksi Barokah Jaya",
    deskripsi: "Konveksi baju seragam, kaos, dan jaket dengan kualitas jahitan rapi. Melayani pesanan partai besar dan kecil.",
    alamat: "Jl. Kedungmundu No. 67, Semarang",
    namaPemilik: "Ahmad Fauzi",
    whatsapp: "087890123456",
    tanggalMulai: new Date("2020-09-05"),
    showPhotoAlert: false,
    categorySlug: "fashion-tekstil",
    socialLinksCount: 2,
    hasImages: false,
  },
  {
    namaUsaha: "Laundry Kilat Bersih",
    deskripsi: "Laundry express dengan layanan antar jemput. Cuci kering 3 jam selesai, cuci setrika harga mahasiswa.",
    alamat: "Jl. Petompon No. 34, Semarang",
    namaPemilik: "Dewi Kartika",
    whatsapp: "081987654321",
    tanggalMulai: new Date("2023-02-14"),
    showPhotoAlert: false,
    categorySlug: "jasa",
    socialLinksCount: 2,
    hasImages: false,
  },
  {
    namaUsaha: "Katering Mama Ana",
    deskripsi: "Katering harian untuk kantor dan acara. Menu bervariasi setiap hari dengan porsi melimpah dan harga bersahabat.",
    alamat: "Jl. Srondol Wetan No. 11, Semarang",
    namaPemilik: "Ana Susanti",
    whatsapp: "082345678901",
    tanggalMulai: new Date("2021-11-20"),
    showPhotoAlert: true,
    categorySlug: "makanan-minuman",
    socialLinksCount: 3,
    hasImages: false,
  },
  {
    namaUsaha: "Toko Elektronik Maju",
    deskripsi: "Toko elektronik dengan barang original garansi resmi. Tersedia TV, kulkas, AC, dan peralatan rumah tangga.",
    alamat: "Jl. Pandanaran No. 56, Semarang",
    namaPemilik: "Hendra Wijaya",
    whatsapp: "085123456789",
    tanggalMulai: new Date("2017-08-15"),
    showPhotoAlert: false,
    categorySlug: "elektronik",
    socialLinksCount: 2,
    hasImages: false,
  },
  {
    namaUsaha: "Bengkel Las Sinar Jaya",
    deskripsi: "Bengkel las profesional untuk kanopi, pagar, teralis, dan custom furniture besi. Hasil rapi dan tahan lama.",
    alamat: "Jl. Tlogosari No. 78, Semarang",
    namaPemilik: "Suryanto",
    whatsapp: "087765432109",
    tanggalMulai: new Date("2019-04-10"),
    showPhotoAlert: false,
    categorySlug: "jasa",
    socialLinksCount: 1,
    hasImages: false,
  },
  {
    namaUsaha: "Butik Hijab Nayla",
    deskripsi: "Butik hijab dan busana muslim trendy dengan koleksi terbaru setiap minggu. Ready stok dan pre-order available.",
    alamat: "Jl. Sisingamangaraja No. 29, Semarang",
    namaPemilik: "Nayla Putri",
    whatsapp: "081287654321",
    tanggalMulai: new Date("2022-06-01"),
    showPhotoAlert: true,
    categorySlug: "fashion-tekstil",
    socialLinksCount: 4,
    hasImages: false,
  },
  {
    namaUsaha: "Pertanian Organik Lestari",
    deskripsi: "Menyediakan sayuran dan buah-buahan organik segar langsung dari petani. Bebas pestisida dan kimia berbahaya.",
    alamat: "Jl.爪哇 No. 42, Semarang",
    namaPemilik: "Rudi Hartono",
    whatsapp: "085678901235",
    tanggalMulai: new Date("2020-03-20"),
    showPhotoAlert: false,
    categorySlug: "pertanian-perkebunan",
    socialLinksCount: 2,
    hasImages: false,
  },
  {
    namaUsaha: "Kursus Komputer Cepat",
    deskripsi: "Kursus komputer untuk semua usia. Mulai dari dasar hingga program Microsoft Office, desain grafis, dan pemrograman.",
    alamat: "Jl. Diponegoro No. 15, Semarang",
    namaPemilik: "Dr. Eko Prasetyo",
    whatsapp: "082345678902",
    tanggalMulai: new Date("2018-01-05"),
    showPhotoAlert: false,
    categorySlug: "pendidikan",
    socialLinksCount: 2,
    hasImages: false,
  },
  {
    namaUsaha: "Tukang Ledeng Terpercaya",
    deskripsi: "Jasa perbaikan pipa bocor, instalasi air, dan renovasi kamar mandi. Fast response dan garansi pekerjaan.",
    alamat: "Jl. Bulustalan No. 33, Semarang",
    namaPemilik: "Gunawan",
    whatsapp: "081987654322",
    tanggalMulai: new Date("2021-07-15"),
    showPhotoAlert: false,
    categorySlug: "jasa",
    socialLinksCount: 1,
    hasImages: false,
  },
  {
    namaUsaha: "Fotocopy Mas Budi",
    deskripsi: "Fotocopy, print, scan, dan jilid. Buka 24 jam melayani mahasiswa dan karyawan. Harga paling murah se- Semarang.",
    alamat: "Jl. Universitas Diponegoro No. 8, Semarang",
    namaPemilik: "Budi Santoso",
    whatsapp: "085789012345",
    tanggalMulai: new Date("2019-12-01"),
    showPhotoAlert: false,
    categorySlug: "jasa",
    socialLinksCount: 1,
    hasImages: false,
  },
  {
    namaUsaha: "Warung Kopi Aceh",
    deskripsi: "Warung kopi dengan biji kopi pilihan dari Gayo, Aceh. Tersedia kopi tubruk, espresso, dan aneka kue tradisional.",
    alamat: "Jl. Pemuda No. 62, Semarang",
    namaPemilik: "M. Rizki Pratama",
    whatsapp: "087890123457",
    tanggalMulai: new Date("2023-05-10"),
    showPhotoAlert: true,
    categorySlug: "makanan-minuman",
    socialLinksCount: 3,
    hasImages: false,
  },
  {
    namaUsaha: "Rental Mobil Amalia",
    deskripsi: "Rental mobil harian dan bulanan dengan armada terawat. Tersedia Avanza, Xenia, dan Elf pariwisata.",
    alamat: "Jl. Imam Bonjol No. 19, Semarang",
    namaPemilik: "Amalia Rahmawati",
    whatsapp: "081234567891",
    tanggalMulai: new Date("2020-08-25"),
    showPhotoAlert: false,
    categorySlug: "jasa",
    socialLinksCount: 2,
    hasImages: false,
  },
  {
    namaUsaha: "Batik Tulis Mbak Rina",
    deskripsi: "Batik tulis handmade dengan motif khas Semarang. Setiap karya unik dan tidak ada duanya. Menerima pesanan custom.",
    alamat: "Jl. Brumbungan No. 41, Semarang",
    namaPemilik: "Rina Suryani",
    whatsapp: "082134567891",
    tanggalMulai: new Date("2018-11-15"),
    showPhotoAlert: true,
    categorySlug: "kerajinan-seni",
    socialLinksCount: 3,
    hasImages: false,
  },
  {
    namaUsaha: "Toko Kue Basah Enak",
    deskripsi: "Toko kue basah tradisional dengan rasa seperti buatan rumah. Tersedia kue lapis, bolu, dan aneka jajan pasar.",
    alamat: "Jl. MT Haryono No. 27, Semarang",
    namaPemilik: "Lestari",
    whatsapp: "085678901236",
    tanggalMulai: new Date("2022-04-01"),
    showPhotoAlert: false,
    categorySlug: "makanan-minuman",
    socialLinksCount: 2,
    hasImages: false,
  },
  {
    namaUsaha: "Service AC Cepat",
    deskripsi: "Service AC panggilan untuk rumah dan kantor. Tersedia AC semua merek. Free cek kerusakan, bergaransi 30 hari.",
    alamat: "Jl. Gajahmada No. 53, Semarang",
    namaPemilik: "Agus Setiawan",
    whatsapp: "087765432108",
    tanggalMulai: new Date("2021-01-20"),
    showPhotoAlert: false,
    categorySlug: "jasa",
    socialLinksCount: 1,
    hasImages: false,
  },
  {
    namaUsaha: "Gallery Seni Rupa",
    deskripsi: "Gallery seni yang menjual lukisan, patung, dan karya seni lokal. Cocok untuk dekorasi rumah dan kantor.",
    alamat: "Jl. Singosari No. 16, Semarang",
    namaPemilik: "Aditya Nugroho",
    whatsapp: "081287654322",
    tanggalMulai: new Date("2019-06-10"),
    showPhotoAlert: true,
    categorySlug: "kerajinan-seni",
    socialLinksCount: 2,
    hasImages: false,
  },
  {
    namaUsaha: "Percetakan Digital Offset",
    deskripsi: "Percetakan digital untuk brosur, kartu nama, undangan, dan banner. Kualitas cetak tinggi dengan harga kompetitif.",
    alamat: "Jl. Karang Anyar No. 38, Semarang",
    namaPemilik: "Dian Permata",
    whatsapp: "082345678903",
    tanggalMulai: new Date("2020-02-14"),
    showPhotoAlert: false,
    categorySlug: "jasa",
    socialLinksCount: 2,
    hasImages: false,
  },
  {
    namaUsaha: "Otomotif Spare Part",
    deskripsi: "Toko spare part mobil dan motor lengkap. Tersedia filter, oli, rem, dan aksesoris kendaraan.",
    alamat: "Jl. Kanor No. 21, Semarang",
    namaPemilik: "Hendro Kusuma",
    whatsapp: "085678901237",
    tanggalMulai: new Date("2018-09-01"),
    showPhotoAlert: false,
    categorySlug: "otomotif",
    socialLinksCount: 1,
    hasImages: false,
  },
  {
    namaUsaha: "Minimarket Sejahtera",
    deskripsi: "Minimarket 24 jam dengan harga bersaing. Tersedia kebutuhan sehari-hari, snack, dan minuman.",
    alamat: "Jl. Pandanaran Raya No. 71, Semarang",
    namaPemilik: "Ratna Sari",
    whatsapp: "087890123458",
    tanggalMulai: new Date("2022-08-20"),
    showPhotoAlert: false,
    categorySlug: "perdagangan",
    socialLinksCount: 1,
    hasImages: false,
  },
  {
    namaUsaha: "Garmen Sejahtera",
    deskripsi: "Garmen pembuatan kemeja, celana, dan seragam kerja. Bisa custom ukuran dan desain. Menerima pesanan partai.",
    alamat: "Jl. Kalimantan No. 44, Semarang",
    namaPemilik: "Slamet Riyadi",
    whatsapp: "081987654323",
    tanggalMulai: new Date("2017-12-15"),
    showPhotoAlert: false,
    categorySlug: "fashion-tekstil",
    socialLinksCount: 2,
    hasImages: false,
  },
  {
    namaUsaha: "Warung Sate Kambing Pak Djo",
    deskripsi: "Warung sate kambing legendaris dengan bumbu kacang rahasia. Sudah berdiri sejak tahun 90-an.",
    alamat: "Jl. Wonodri No. 9, Semarang",
    namaPemilik: "Pak Djo",
    whatsapp: "081234567892",
    tanggalMulai: new Date("2019-10-05"),
    showPhotoAlert: true,
    categorySlug: "makanan-minuman",
    socialLinksCount: 2,
    hasImages: false,
  },
  {
    namaUsaha: "Studio Foto Moment",
    deskripsi: "Studio foto profesional untuk foto keluarga, wisuda, prewedding, dan produk. Tersedia background dan properti lengkap.",
    alamat: "Jl. Cendana No. 12, Semarang",
    namaPemilik: "Rizky Amelia",
    whatsapp: "082134567892",
    tanggalMulai: new Date("2021-05-01"),
    showPhotoAlert: true,
    categorySlug: "jasa",
    socialLinksCount: 3,
    hasImages: false,
  },
  {
    namaUsaha: "Toko Roti Manis",
    deskripsi: "Toko roti dengan oven sendiri. Roti tawar, roti manis, donat, dan kue kering. Fresh dari oven setiap hari.",
    alamat: "Jl. Sultan Agung No. 35, Semarang",
    namaPemilik: "Wati Susilowati",
    whatsapp: "085678901238",
    tanggalMulai: new Date("2020-07-10"),
    showPhotoAlert: false,
    categorySlug: "makanan-minuman",
    socialLinksCount: 2,
    hasImages: false,
  },
  {
    namaUsaha: "Bengkel Cat Mobil",
    deskripsi: "Spesialis cat ulang dan perbaikan cat mobil. Warna cat lengkap dari cat biasa hingga cat pearlescent.",
    alamat: "Jl. Majapahit No. 58, Semarang",
    namaPemilik: "Dwi Cahyono",
    whatsapp: "087765432107",
    tanggalMulai: new Date("2019-02-20"),
    showPhotoAlert: false,
    categorySlug: "otomotif",
    socialLinksCount: 1,
    hasImages: false,
  },
  {
    namaUsaha: "Toko Parfum Asli",
    deskripsi: "Toko parfum original dengan ribuan varian. Tersedia parfum lokal dan import, minyak wangi, dan body mist.",
    alamat: "Jl. Ahmad Yani No. 42, Semarang",
    namaPemilik: "Maya Anggraeni",
    whatsapp: "081287654323",
    tanggalMulai: new Date("2022-11-01"),
    showPhotoAlert: true,
    categorySlug: "kecantikan-kesehatan",
    socialLinksCount: 3,
    hasImages: false,
  },
  {
    namaUsaha: "Service Laptop Cepat",
    deskripsi: "Service laptop semua merek. Install ulang, ganti spare part, recovery data. Bergaransi dan free konsultasi.",
    alamat: "Jl. Taman Siswa No. 17, Semarang",
    namaPemilik: "Andi Kurniawan",
    whatsapp: "082345678904",
    tanggalMulai: new Date("2021-09-15"),
    showPhotoAlert: false,
    categorySlug: "jasa",
    socialLinksCount: 2,
    hasImages: false,
  },
  {
    namaUsaha: "Tani Sejahtera Organik",
    deskripsi: "Produsen pupuk organik dan obat tanaman alami. Melayani pengiriman ke seluruh Jawa Tengah.",
    alamat: "Jl.爪哇 No. 8, Semarang",
    namaPemilik: "H. Slamet",
    whatsapp: "085678901239",
    tanggalMulai: new Date("2018-04-01"),
    showPhotoAlert: false,
    categorySlug: "pertanian-perkebunan",
    socialLinksCount: 1,
    hasImages: false,
  },
  {
    namaUsaha: "Kursus Bahasa Inggris",
    deskripsi: "Kursus bahasa Inggris untuk anak-anak dan dewasa. Metode fun learning dengan tutor bersertifikat internasional.",
    alamat: "Jl. Diponegoro No. 28, Semarang",
    namaPemilik: "Sarah Mitchell",
    whatsapp: "087890123459",
    tanggalMulai: new Date("2020-01-15"),
    showPhotoAlert: false,
    categorySlug: "pendidikan",
    socialLinksCount: 2,
    hasImages: false,
  },
  {
    namaUsaha: "Toko Handmade Craft",
    deskripsi: "Toko kerajinan tangan handmade. Tas rajut, gelang, aksesoris, dan home decor. Semua buatan lokal.",
    alamat: "Jl.爪哇 No. 19, Semarang",
    namaPemilik: "Putri Rahayu",
    whatsapp: "081987654324",
    tanggalMulai: new Date("2023-03-20"),
    showPhotoAlert: true,
    categorySlug: "kerajinan-seni",
    socialLinksCount: 3,
    hasImages: false,
  },
  {
    namaUsaha: "Cuci Sepatu Premium",
    deskripsi: "Cuci sepatu profesional dengan teknologi ultrasonic. Cocok untuk sneaker, sepatu kulit, dan boots.",
    alamat: "Jl.爪哇 No. 46, Semarang",
    namaPemilik: "Fajar Nugroho",
    whatsapp: "081234567893",
    tanggalMulai: new Date("2023-08-10"),
    showPhotoAlert: true,
    categorySlug: "jasa",
    socialLinksCount: 3,
    hasImages: false,
  },
  {
    namaUsaha: "Toko Kain Tradisional",
    deskripsi: "Toko kain batik, songket, dan tenun dari seluruh Indonesia. Cocok untuk baju adat dan dekorasi.",
    alamat: "Jl.爪哇 No. 31, Semarang",
    namaPemilik: "Ratna Sari",
    whatsapp: "082134567893",
    tanggalMulai: new Date("2019-08-05"),
    showPhotoAlert: false,
    categorySlug: "fashion-tekstil",
    socialLinksCount: 2,
    hasImages: false,
  },
  {
    namaUsaha: "Ayam Geprek Viral",
    deskripsi: "Ayam geprek pedas levels dengan sambal matah dan sambal ijo. Viral di sosmed, wajib coba!",
    alamat: "Jl.爪哇 No. 54, Semarang",
    namaPemilik: "Reza Pratama",
    whatsapp: "085678901240",
    tanggalMulai: new Date("2023-01-01"),
    showPhotoAlert: true,
    categorySlug: "makanan-minuman",
    socialLinksCount: 4,
    hasImages: false,
  },
  {
    namaUsaha: "Bengkel Sepeda Motor Listrik",
    deskripsi: "Bengkel spesialis motor listrik. Servis, baterai, dan spare part original. Gratis cek kondisi motor.",
    alamat: "Jl.爪哇 No. 63, Semarang",
    namaPemilik: "Dimas Saputra",
    whatsapp: "087765432106",
    tanggalMulai: new Date("2024-01-15"),
    showPhotoAlert: false,
    categorySlug: "otomotif",
    socialLinksCount: 2,
    hasImages: false,
  },
  {
    namaUsaha: "Toko Herbal Alami",
    deskripsi: "Toko herbal dan obat tradisional. Jahe merah, madu, habbatussauda, dan herbal lainnya. 100% alami.",
    alamat: "Jl.爪哇 No. 72, Semarang",
    namaPemilik: "Ibu Nurul",
    whatsapp: "081287654324",
    tanggalMulai: new Date("2020-11-10"),
    showPhotoAlert: false,
    categorySlug: "kecantikan-kesehatan",
    socialLinksCount: 2,
    hasImages: false,
  },
  {
    namaUsaha: "Desain Grafis Profesional",
    deskripsi: "Jasa desain grafis untuk logo, brosur, poster, dan branding. Kreatif dan sesuai kebutuhan klien.",
    alamat: "Jl.爪哇 No. 81, Semarang",
    namaPemilik: "Arya Wicaksono",
    whatsapp: "082345678905",
    tanggalMulai: new Date("2021-04-20"),
    showPhotoAlert: true,
    categorySlug: "jasa",
    socialLinksCount: 3,
    hasImages: false,
  },
  {
    namaUsaha: "Toko Oleh-oleh Khas Semarang",
    deskripsi: "Toko oleh-oleh khas Semarang: wingko babat, lumpia, bandeng presto, dan tahu bakso.",
    alamat: "Jl.爪哇 No. 89, Semarang",
    namaPemilik: "Hendra Wijaya",
    whatsapp: "085678901241",
    tanggalMulai: new Date("2019-05-15"),
    showPhotoAlert: false,
    categorySlug: "makanan-minuman",
    socialLinksCount: 3,
    hasImages: false,
  },
  {
    namaUsaha: "Laundry Sepatu Express",
    deskripsi: "Laundry sepatu kilat 1 jam selesai. Teknologi ultrasonic dan steam anti bakteri. Garansi bersih sempurna.",
    alamat: "Jl.爪哇 No. 97, Semarang",
    namaPemilik: "Citra Dewi",
    whatsapp: "087890123460",
    tanggalMulai: new Date("2023-06-01"),
    showPhotoAlert: true,
    categorySlug: "jasa",
    socialLinksCount: 2,
    hasImages: false,
  },
  {
    namaUsaha: "Toko Perlengkapan Bayi",
    deskripsi: "Toko lengkap untuk kebutuhan bayi dan ibu menyusui. Popok, susu, makanan bayi, dan perlengkapan mandi.",
    alamat: "Jl.爪哇 No. 104, Semarang",
    namaPemilik: "Dian Permata",
    whatsapp: "081987654325",
    tanggalMulai: new Date("2022-02-14"),
    showPhotoAlert: false,
    categorySlug: "perdagangan",
    socialLinksCount: 2,
    hasImages: false,
  },
  {
    namaUsaha: "Service Genset Panggilan",
    deskripsi: "Service genset semua merek dan kapasitas. Panggilan 24 jam untuk darurat. Bergaransi spare part.",
    alamat: "Jl.爪哇 No. 112, Semarang",
    namaPemilik: "Hari Kusumo",
    whatsapp: "081234567894",
    tanggalMulai: new Date("2018-07-20"),
    showPhotoAlert: false,
    categorySlug: "jasa",
    socialLinksCount: 1,
    hasImages: false,
  },
  {
    namaUsaha: "Kedai Jus Sehat",
    deskripsi: "Kedai jus buah segar dan smoothie bowl. Tersedia menu diet dan detox. Bahan 100% buah asli.",
    alamat: "Jl.爪哇 No. 119, Semarang",
    namaPemilik: "Lestari",
    whatsapp: "082134567894",
    tanggalMulai: new Date("2023-09-01"),
    showPhotoAlert: true,
    categorySlug: "makanan-minuman",
    socialLinksCount: 3,
    hasImages: false,
  },
  {
    namaUsaha: "Toko ATK Lengkap",
    deskripsi: "Toko alat tulis kantor dan sekolah lengkap. Buku, pulpen, map, dan kebutuhan kantor lainnya.",
    alamat: "Jl.爪哇 No. 126, Semarang",
    namaPemilik: "Ratna Sari",
    whatsapp: "085678901242",
    tanggalMulai: new Date("2017-03-10"),
    showPhotoAlert: false,
    categorySlug: "perdagangan",
    socialLinksCount: 1,
    hasImages: false,
  },
  {
    namaUsaha: "Catering Pernikahan",
    deskripsi: "Catering untuk acara pernikahan, khitanan, dan syukuran. Menu prasmanan dan kotak dengan pilihan lengkap.",
    alamat: "Jl.爪哇 No. 133, Semarang",
    namaPemilik: "Siti Nurhaliza",
    whatsapp: "087765432105",
    tanggalMulai: new Date("2019-01-01"),
    showPhotoAlert: false,
    categorySlug: "makanan-minuman",
    socialLinksCount: 2,
    hasImages: false,
  },
  {
    namaUsaha: "Toko Parfume Refill",
    deskripsi: "Parfum refill original dari brand ternama. Isi ulang parfum favoritmu dengan harga terjangkau.",
    alamat: "Jl.爪哇 No. 140, Semarang",
    namaPemilik: "Maya Anggraeni",
    whatsapp: "081287654325",
    tanggalMulai: new Date("2022-05-15"),
    showPhotoAlert: true,
    categorySlug: "kecantikan-kesehatan",
    socialLinksCount: 3,
    hasImages: false,
  },
  {
    namaUsaha: "Paw Pet Shop",
    deskripsi: "Pet shop lengkap untuk hewan peliharaan. Makanan, aksesoris, grooming, dan konsultasi dokter hewan.",
    alamat: "Jl.爪哇 No. 147, Semarang",
    namaPemilik: "Drh. Anna",
    whatsapp: "082345678906",
    tanggalMulai: new Date("2021-08-10"),
    showPhotoAlert: false,
    categorySlug: "perdagangan",
    socialLinksCount: 2,
    hasImages: false,
  },
  {
    namaUsaha: "Tukang Cat Profesional",
    deskripsi: "Jasa cat rumah dan kantor. Pengecatan interior dan eksterior. Konsultasi warna gratis, bergaransi.",
    alamat: "Jl.爪哇 No. 154, Semarang",
    namaPemilik: "Budi Cahyono",
    whatsapp: "085678901243",
    tanggalMulai: new Date("2020-06-20"),
    showPhotoAlert: false,
    categorySlug: "jasa",
    socialLinksCount: 1,
    hasImages: false,
  },
  {
    namaUsaha: "Toko Manisan Tradisional",
    deskripsi: "Manisan buah khas Semarang. Mangga, pepaya, dan rambutan manis dengan racunan rempah pilihan.",
    alamat: "Jl.爪哇 No. 161, Semarang",
    namaPemilik: "Ibu Sari",
    whatsapp: "087890123461",
    tanggalMulai: new Date("2018-12-01"),
    showPhotoAlert: true,
    categorySlug: "makanan-minuman",
    socialLinksCount: 2,
    hasImages: false,
  },
];

const socialLinkTemplates: Record<string, string[]> = {
  instagram: ["https://instagram.com/", "https://www.instagram.com/"],
  facebook: ["https://facebook.com/", "https://www.facebook.com/"],
  tiktok: ["https://tiktok.com/@"],
  shopee: ["https://shopee.co.id/"],
  tokopedia: ["https://tokopedia.com/"],
  youtube: ["https://youtube.com/c/"],
};

function generateSocialLinks(count: number): Array<{ platform: string; url: string }> {
  const selectedPlatforms = [...platforms].sort(() => Math.random() - 0.5).slice(0, count);
  return selectedPlatforms.map((platform) => {
    const templates = socialLinkTemplates[platform];
    const base = templates[Math.floor(Math.random() * templates.length)];
    const slug = Math.random().toString(36).substring(2, 10);
    return { platform, url: base + slug };
  });
}

const testimonialData = [
  {
    quote: "Platform ini benar-benar membantu usaha kecil kami lebih dikenal masyarakat. Sejak bergabung, pelanggan kami meningkat pesat!",
    author: "Siti Rahmawati",
    role: "Pemilik Warung Bu Sari",
  },
  {
    quote: "Sangat mudah digunakan dan tampilannya menarik. Pelanggan baru sering datang dari rekomendasi di platform ini.",
    author: "Budi Hartono",
    role: "Pemilik Bengkel Motor Mas Joko",
  },
  {
    quote: "Sebagai UMKM baru, saya merasa terbantu sekali. Promosi jadi lebih mudah dan biayanya sangat terjangkau.",
    author: "Rina Wulandari",
    role: "Pemilik Salon Cantik Rina",
  },
  {
    quote: "Kami bisa menampilkan produk-produk terbaik kami dan langsung terhubung dengan pelanggan lewat WhatsApp. Luar biasa!",
    author: "Ahmad Fauzi",
    role: "Pemilik Konveksi Barokah Jaya",
  },
  {
    quote: "Platform ini membantu kami menjangkau pasar yang lebih luas. Terima kasih sudah mendukung UMKM lokal!",
    author: "Dewi Kartika",
    role: "Pemilik Laundry Kilat Bersih",
  },
  {
    quote: "Fitur pencarian dan kategori sangat membantu pelanggan menemukan produk kami. Omzet naik 30% sejak bergabung!",
    author: "Nayla Putri",
    role: "Pemilik Butik Hijab Nayla",
  },
];

const bannerData = [
  {
    title: "Dukung UMKM Pedurungan Tengah",
    subtitle: "Temukan produk dan layanan terbaik dari pelaku usaha mikro, kecil, dan menengah di sekitar Anda.",
    link: null,
    image: "https://picsum.photos/seed/banner-dukung-umkm/1920/1080",
    mobileImage: "https://picsum.photos/seed/banner-dukung-umkm-mobile/768/1024",
    active: true,
    order: 0,
  },
  {
    title: "Belanja Lokal, Bangun Negeri",
    subtitle: "Setiap pembelian Anda adalah kontribusi nyata bagi perekonomian lokal.",
    link: "/",
    image: "https://picsum.photos/seed/banner-belanja-lokal/1920/1080",
    mobileImage: "https://picsum.photos/seed/banner-belanja-lokal-mobile/768/1024",
    active: true,
    order: 1,
  },
  {
    title: "Galeri UMKM Unggulan",
    subtitle: "Jelajahi berbagai usaha lokal unggulan yang siap melayani Anda.",
    link: "/",
    image: "https://picsum.photos/seed/banner-umkm-unggulan/1920/1080",
    mobileImage: null,
    active: true,
    order: 2,
  },
];

const umkmImageLinks: Array<{
  namaUsaha: string;
  images: Array<{ publicId: string; url: string; urutan: number }>;
}> = [
  {
    namaUsaha: "Warung Bu Sari",
    images: [
      { publicId: "umkm/warung-bu-sari-1", url: "https://picsum.photos/seed/umkm-warung-bu-sari-1/800/600", urutan: 0 },
      { publicId: "umkm/warung-bu-sari-2", url: "https://picsum.photos/seed/umkm-warung-bu-sari-2/800/600", urutan: 1 },
    ],
  },
  {
    namaUsaha: "Bengkel Motor Mas Joko",
    images: [
      { publicId: "umkm/bengkel-motor-joko-1", url: "https://picsum.photos/seed/umkm-bengkel-motor-joko-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Salon Cantik Rina",
    images: [
      { publicId: "umkm/salon-rina-1", url: "https://picsum.photos/seed/umkm-salon-rina-1/800/600", urutan: 0 },
      { publicId: "umkm/salon-rina-2", url: "https://picsum.photos/seed/umkm-salon-rina-2/800/600", urutan: 1 },
    ],
  },
  {
    namaUsaha: "Toko Bangunan Harapan",
    images: [
      { publicId: "umkm/toko-bangunan-harapan-1", url: "https://picsum.photos/seed/umkm-toko-bangunan-harapan-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Konveksi Barokah Jaya",
    images: [
      { publicId: "umkm/konveksi-barokah-1", url: "https://picsum.photos/seed/umkm-konveksi-barokah-1/800/600", urutan: 0 },
      { publicId: "umkm/konveksi-barokah-2", url: "https://picsum.photos/seed/umkm-konveksi-barokah-2/800/600", urutan: 1 },
    ],
  },
  {
    namaUsaha: "Laundry Kilat Bersih",
    images: [
      { publicId: "umkm/laundry-kilat-bersih-1", url: "https://picsum.photos/seed/umkm-laundry-kilat-bersih-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Katering Mama Ana",
    images: [
      { publicId: "umkm/katering-mama-ana-1", url: "https://picsum.photos/seed/umkm-katering-mama-ana-1/800/600", urutan: 0 },
      { publicId: "umkm/katering-mama-ana-2", url: "https://picsum.photos/seed/umkm-katering-mama-ana-2/800/600", urutan: 1 },
    ],
  },
  {
    namaUsaha: "Toko Elektronik Maju",
    images: [
      { publicId: "umkm/toko-elektronik-1", url: "https://picsum.photos/seed/umkm-toko-elektronik-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Bengkel Las Sinar Jaya",
    images: [
      { publicId: "umkm/bengkel-las-sinar-jaya-1", url: "https://picsum.photos/seed/umkm-bengkel-las-sinar-jaya-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Butik Hijab Nayla",
    images: [
      { publicId: "umkm/butik-hijab-nayla-1", url: "https://picsum.photos/seed/umkm-butik-hijab-nayla-1/800/600", urutan: 0 },
      { publicId: "umkm/butik-hijab-nayla-2", url: "https://picsum.photos/seed/umkm-butik-hijab-nayla-2/800/600", urutan: 1 },
    ],
  },
  {
    namaUsaha: "Pertanian Organik Lestari",
    images: [
      { publicId: "umkm/pertanian-organik-lestari-1", url: "https://picsum.photos/seed/umkm-pertanian-organik-lestari-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Kursus Komputer Cepat",
    images: [
      { publicId: "umkm/kursus-komputer-cepat-1", url: "https://picsum.photos/seed/umkm-kursus-komputer-cepat-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Tukang Ledeng Terpercaya",
    images: [
      { publicId: "umkm/tukang-ledeng-1", url: "https://picsum.photos/seed/umkm-tukang-ledeng-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Fotocopy Mas Budi",
    images: [
      { publicId: "umkm/fotocopy-mas-budi-1", url: "https://picsum.photos/seed/umkm-fotocopy-mas-budi-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Warung Kopi Aceh",
    images: [
      { publicId: "umkm/warung-kopi-aceh-1", url: "https://picsum.photos/seed/umkm-warung-kopi-aceh-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Rental Mobil Amalia",
    images: [
      { publicId: "umkm/rental-mobil-amalia-1", url: "https://picsum.photos/seed/umkm-rental-mobil-amalia-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Batik Tulis Mbak Rina",
    images: [
      { publicId: "umkm/batik-mbak-rina-1", url: "https://picsum.photos/seed/umkm-batik-mbak-rina-1/800/600", urutan: 0 },
      { publicId: "umkm/batik-mbak-rina-2", url: "https://picsum.photos/seed/umkm-batik-mbak-rina-2/800/600", urutan: 1 },
    ],
  },
  {
    namaUsaha: "Toko Kue Basah Enak",
    images: [
      { publicId: "umkm/toko-kue-basah-enak-1", url: "https://picsum.photos/seed/umkm-toko-kue-basah-enak-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Service AC Cepat",
    images: [
      { publicId: "umkm/service-ac-cepat-1", url: "https://picsum.photos/seed/umkm-service-ac-cepat-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Gallery Seni Rupa",
    images: [
      { publicId: "umkm/gallery-seni-rupa-1", url: "https://picsum.photos/seed/umkm-gallery-seni-rupa-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Percetakan Digital Offset",
    images: [
      { publicId: "umkm/percetakan-digital-offset-1", url: "https://picsum.photos/seed/umkm-percetakan-digital-offset-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Otomotif Spare Part",
    images: [
      { publicId: "umkm/otomotif-sparepart-1", url: "https://picsum.photos/seed/umkm-otomotif-sparepart-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Minimarket Sejahtera",
    images: [
      { publicId: "umkm/minimarket-sejahtera-1", url: "https://picsum.photos/seed/umkm-minimarket-sejahtera-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Garmen Sejahtera",
    images: [
      { publicId: "umkm/garmen-sejahtera-1", url: "https://picsum.photos/seed/umkm-garmen-sejahtera-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Warung Sate Kambing Pak Djo",
    images: [
      { publicId: "umkm/warung-sate-pakdjo-1", url: "https://picsum.photos/seed/umkm-warung-sate-pakdjo-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Studio Foto Moment",
    images: [
      { publicId: "umkm/studio-foto-moment-1", url: "https://picsum.photos/seed/umkm-studio-foto-moment-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Toko Roti Manis",
    images: [
      { publicId: "umkm/toko-roti-manis-1", url: "https://picsum.photos/seed/umkm-toko-roti-manis-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Bengkel Cat Mobil",
    images: [
      { publicId: "umkm/bengkel-cat-mobil-1", url: "https://picsum.photos/seed/umkm-bengkel-cat-mobil-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Toko Parfum Asli",
    images: [
      { publicId: "umkm/toko-parfum-asli-1", url: "https://picsum.photos/seed/umkm-toko-parfum-asli-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Service Laptop Cepat",
    images: [
      { publicId: "umkm/service-laptop-cepat-1", url: "https://picsum.photos/seed/umkm-service-laptop-cepat-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Tani Sejahtera Organik",
    images: [
      { publicId: "umkm/tani-sejahtera-organik-1", url: "https://picsum.photos/seed/umkm-tani-sejahtera-organik-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Kursus Bahasa Inggris",
    images: [
      { publicId: "umkm/kursus-bahasa-inggris-1", url: "https://picsum.photos/seed/umkm-kursus-bahasa-inggris-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Toko Handmade Craft",
    images: [
      { publicId: "umkm/toko-handmade-craft-1", url: "https://picsum.photos/seed/umkm-toko-handmade-craft-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Cuci Sepatu Premium",
    images: [
      { publicId: "umkm/cuci-sepatu-premium-1", url: "https://picsum.photos/seed/umkm-cuci-sepatu-premium-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Toko Kain Tradisional",
    images: [
      { publicId: "umkm/toko-kain-tradisional-1", url: "https://picsum.photos/seed/umkm-toko-kain-tradisional-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Ayam Geprek Viral",
    images: [
      { publicId: "umkm/ayam-geprek-viral-1", url: "https://picsum.photos/seed/umkm-ayam-geprek-viral-1/800/600", urutan: 0 },
      { publicId: "umkm/ayam-geprek-viral-2", url: "https://picsum.photos/seed/umkm-ayam-geprek-viral-2/800/600", urutan: 1 },
    ],
  },
  {
    namaUsaha: "Bengkel Sepeda Motor Listrik",
    images: [
      { publicId: "umkm/bengkel-motor-listrik-1", url: "https://picsum.photos/seed/umkm-bengkel-motor-listrik-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Toko Herbal Alami",
    images: [
      { publicId: "umkm/toko-herbal-alami-1", url: "https://picsum.photos/seed/umkm-toko-herbal-alami-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Desain Grafis Profesional",
    images: [
      { publicId: "umkm/desain-grafis-1", url: "https://picsum.photos/seed/umkm-desain-grafis-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Toko Oleh-oleh Khas Semarang",
    images: [
      { publicId: "umkm/toko-oleh-oleh-semarang-1", url: "https://picsum.photos/seed/umkm-toko-oleh-oleh-semarang-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Laundry Sepatu Express",
    images: [
      { publicId: "umkm/laundry-sepatu-express-1", url: "https://picsum.photos/seed/umkm-laundry-sepatu-express-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Toko Perlengkapan Bayi",
    images: [
      { publicId: "umkm/toko-perlengkapan-bayi-1", url: "https://picsum.photos/seed/umkm-toko-perlengkapan-bayi-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Service Genset Panggilan",
    images: [
      { publicId: "umkm/service-genset-1", url: "https://picsum.photos/seed/umkm-service-genset-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Kedai Jus Sehat",
    images: [
      { publicId: "umkm/kedai-jus-sehat-1", url: "https://picsum.photos/seed/umkm-kedai-jus-sehat-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Toko ATK Lengkap",
    images: [
      { publicId: "umkm/toko-atk-lengkap-1", url: "https://picsum.photos/seed/umkm-toko-atk-lengkap-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Catering Pernikahan",
    images: [
      { publicId: "umkm/catering-pernikahan-1", url: "https://picsum.photos/seed/umkm-catering-pernikahan-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Toko Parfume Refill",
    images: [
      { publicId: "umkm/toko-parfume-refill-1", url: "https://picsum.photos/seed/umkm-toko-parfume-refill-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Paw Pet Shop",
    images: [
      { publicId: "umkm/paw-pet-shop-1", url: "https://picsum.photos/seed/umkm-paw-pet-shop-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Tukang Cat Profesional",
    images: [
      { publicId: "umkm/tukang-cat-profesional-1", url: "https://picsum.photos/seed/umkm-tukang-cat-profesional-1/800/600", urutan: 0 },
    ],
  },
  {
    namaUsaha: "Toko Manisan Tradisional",
    images: [
      { publicId: "umkm/toko-manisan-1", url: "https://picsum.photos/seed/umkm-toko-manisan-1/800/600", urutan: 0 },
    ],
  },
];

async function main() {
  console.log("Seeding database...\n");

  // Upsert categories
  const categoryMap: Record<string, string> = {};
  for (const cat of categories) {
    const existing = await prisma.category.findUnique({ where: { slug: cat.slug } });
    if (existing) {
      categoryMap[cat.slug] = existing.id;
      console.log(`  Category "${cat.name}" already exists (id: ${existing.id})`);
    } else {
      const created = await prisma.category.create({ data: cat });
      categoryMap[cat.slug] = created.id;
      console.log(`  Created category "${cat.name}" (id: ${created.id})`);
    }
  }

  console.log("\nCreating 50 UMKM...\n");

  let createdCount = 0;
  for (const data of umkmData) {
    // Check if UMKM already exists by name
    const existing = await prisma.umkm.findFirst({ where: { namaUsaha: data.namaUsaha } });
    if (existing) {
      console.log(`  Skipping "${data.namaUsaha}" (already exists)`);
      createdCount++;
      continue;
    }

    const socialLinks = generateSocialLinks(data.socialLinksCount);

    await prisma.umkm.create({
      data: {
        namaUsaha: data.namaUsaha,
        deskripsi: data.deskripsi,
        alamat: data.alamat,
        alamatPribadi: data.alamat,
        namaPemilik: data.namaPemilik,
        whatsapp: data.whatsapp,
        tanggalMulai: data.tanggalMulai,
        showPhotoAlert: data.showPhotoAlert,
        thumbnailIndex: 0,
        categoryId: categoryMap[data.categorySlug] || null,
        socialLinks: {
          create: socialLinks,
        },
      },
    });
    createdCount++;
    console.log(`  [${createdCount}/50] Created "${data.namaUsaha}"`);
  }

  console.log(`\nDone! Created ${createdCount} UMKM entries.`);

  // Seed testimonials
  console.log("\nSeeding testimonials...\n");
  let testimonialCount = 0;
  for (const data of testimonialData) {
    const existing = await prisma.testimonial.findFirst({ where: { author: data.author } });
    if (existing) {
      console.log(`  Skipping testimonial by "${data.author}" (already exists)`);
      continue;
    }
    await prisma.testimonial.create({ data });
    testimonialCount++;
    console.log(`  Created testimonial by "${data.author}"`);
  }
  console.log(`Done! Created ${testimonialCount} testimonials.`);

  // Seed hero banners
  console.log("\nSeeding hero banners...\n");
  let bannerCount = 0;
  for (const data of bannerData) {
    const existing = await prisma.heroBanner.findFirst({ where: { title: data.title } });
    if (existing) {
      await prisma.heroBanner.update({
        where: { id: existing.id },
        data,
      });
      console.log(`  Updated banner "${data.title}"`);
    } else {
      await prisma.heroBanner.create({ data });
      console.log(`  Created banner "${data.title}"`);
    }
    bannerCount++;
  }
  console.log(`Done! Created ${bannerCount} hero banners.`);

  // Seed about content
  console.log("\nSeeding about content...\n");
  const existingAbout = await prisma.aboutContent.findFirst();
  if (existingAbout) {
    console.log("  About content already exists, skipping.");
  } else {
    await prisma.aboutContent.create({
      data: {
        title: "Mendukung UMKM Pedurungan Tengah Indonesia",
        paragraph1:
          "Platform ini hadir untuk memudahkan masyarakat menemukan dan mendukung usaha kecil menengah di sekitar mereka. Kami percaya setiap UMKM layak mendapatkan ruang untuk tumbuh dan terhubung dengan pelanggan baru.",
        paragraph2:
          "Mulai dari kuliner lokal, kerajinan tangan, hingga jasa profesional. Semuanya tersedia di satu tempat.",
        ctaText: "Jelajahi UMKM",
        ctaLink: "#umkm",
        active: true,
      },
    });
    console.log("  Created about content.");
  }

  // Seed metrics content
  console.log("\nSeeding metrics content...\n");
  const existingMetrics = await prisma.metricsContent.findFirst();
  if (existingMetrics) {
    console.log("  Metrics content already exists, skipping.");
  } else {
    await prisma.metricsContent.create({
      data: {
        sectionTitle: "Komunitas yang Terus Bertumbuh",
        label1: "UMKM Terdaftar",
        label2: "UMKM Aktif",
        label3: "Kategori",
        label4: "Testimoni",
        active: true,
      },
    });
    console.log("  Created metrics content.");
  }

  // Seed UMKM images
  console.log("\nSeeding UMKM images...\n");
  let imageCount = 0;
  for (const entry of umkmImageLinks) {
    const umkm = await prisma.umkm.findFirst({ where: { namaUsaha: entry.namaUsaha } });
    if (!umkm) {
      console.log(`  Skipping images for "${entry.namaUsaha}" (UMKM not found)`);
      continue;
    }
    for (const img of entry.images) {
      const existing = await prisma.umkmImage.findFirst({
        where: { umkmId: umkm.id, publicId: img.publicId },
      });
      if (existing) {
        await prisma.umkmImage.update({
          where: { id: existing.id },
          data: { url: img.url, urutan: img.urutan },
        });
        console.log(`  Updated image "${img.publicId}"`);
      } else {
        await prisma.umkmImage.create({
          data: {
            umkmId: umkm.id,
            publicId: img.publicId,
            url: img.url,
            urutan: img.urutan,
          },
        });
        console.log(`  Created image "${img.publicId}"`);
      }
      imageCount++;
    }
    console.log(`  Processed ${entry.images.length} image(s) for "${entry.namaUsaha}"`);
  }
  console.log(`Done! Created ${imageCount} UMKM images.`);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
