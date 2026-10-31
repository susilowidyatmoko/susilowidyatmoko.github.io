---
title: "Kenapa saya (masih) memilih analisis linear"
lang: id
summary: Catatan jujur dari seseorang yang mempelajari teori FEM nonlinear, tetapi belum berani memakainya dalam pekerjaan.
---

Riset S3 saya menyentuh elemen hingga nonlinear. Kesan pertama saya pada bidang ini: rumit, butuh pemahaman yang dalam, dan menuntut usaha besar. Kesan itu terbentuk sejak membaca buku Crisfield, *Non-linear Finite Element Analysis of Solids and Structures*, yang sulit sekali dicerna. Yang mengejutkan saya, dalam teori justru **nonlinearitas geometri** yang dipelajari lebih dulu: perpindahan besar, ukuran regangan yang tepat, dan keseimbangan pada konfigurasi yang terus berubah. Plastisitas material datang belakangan.

## Dua dunia yang berbeda

Di dunia praktik, kesannya sangat berbeda. Software seperti ANSYS, Abaqus, atau SolidWorks menjadi pintu masuk untuk memodelkan elemen solid, bahkan dengan material nonlinear. Alurnya terasa sederhana: buat geometri, beri beban, ubah material menjadi plastis, pasang tumpuan, lalu jalankan. Muncullah kontur tegangan von Mises berwarna-warni, dan analisis dianggap selesai. Saya pun dulu memandangnya seperti itu. Tidak jarang pula analisis nonlinear seolah menjadi langkah wajib ketika desain linear tidak masuk kapasitas.

Pengalaman di dua dunia itu membuat saya cenderung berhati-hati, bahkan defensif, setiap kali analisis nonlinear dipakai untuk "meloloskan" desain. Saya harus jujur: sebagian sikap itu datang dari pemahaman saya sendiri yang belum lengkap. Buku Crisfield mengajarkan saya betapa dalamnya bidang ini. Semakin saya mempelajarinya, semakin saya sadar banyak hal yang belum saya kuasai. Di lingkungan praktik yang saya kenal pun, pemahaman nonlinear belum matang. Karena itu saya belum berani memakainya sebagai alat dalam pekerjaan.

## Kenapa linear

Untuk saat ini, analisis linear tetap pilihan terbaik saya. Alasannya bukan semata karena lebih mudah:

- **Superposisi.** Kombinasi beban, envelope, dan tahapan konstruksi jembatan bertumpu pada prinsip superposisi. Pada analisis nonlinear, setiap kombinasi harus dijalankan terpisah.
- **Dapat diperiksa.** Hasil linear bisa diverifikasi dengan hitungan tangan, setidaknya untuk orde besarnya.
- **Kerangka desain.** Sebagian besar desain berbasis standar dibangun di atas analisis linear yang dipadukan dengan kapasitas penampang.

## Pertanyaan yang sedang saya pelajari

Analisis nonlinear tetap sah, dan standar desain pun mengizinkannya dengan batasan yang jelas. Suatu hari saya ingin memakainya dengan percaya diri. Sebelum hari itu tiba, inilah pertanyaan yang sedang saya pelajari untuk dijawab setiap kali melihat hasil analisis nonlinear:

- **Apa yang sebenarnya nonlinear?** Material saja, atau geometri juga? Apakah tekuk lokal dan imperfeksi sudah diperhitungkan?
- **Model materialnya seperti apa?** Kriteria leleh dan hardening seperti apa, dan dari data mana?
- **Apakah tegangan puncaknya nyata?** Konsentrasi di sudut tajam atau tumpuan titik bisa terus membesar saat mesh diperhalus. Itu singularitas, bukan kapasitas.
- **Bagaimana konvergensinya?** Bagaimana langkah beban dan iterasinya? Apakah solusinya benar-benar konvergen, atau hanya "selesai"?
- **Apa kriteria lolosnya?** Regangan plastis maksimum? Faktor beban batas? Kontur von Mises yang "masih di bawah f<sub>y</sub>" bukan kriteria dalam analisis plastis.
- **Apakah ada pembanding?** Hitungan tangan, model linear, atau hasil uji, untuk memastikan orde besarnya masuk akal.

Tulisan ini lebih merupakan catatan untuk diri sendiri daripada nasihat bagi orang lain.
