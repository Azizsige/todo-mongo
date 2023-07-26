# Todo List App

Aplikasi Todo List adalah sebuah aplikasi sederhana yang memungkinkan pengguna untuk membuat daftar tugas, mengelola tugas-tugas tersebut, dan melacak kemajuan yang telah dicapai. Aplikasi ini dibangun menggunakan Vue.js 3 sebagai frontend dan menggunakan MongoDB sebagai database backend.

## Teknologi yang Digunakan

- Vue.js 3
- Tailwind CSS

## Library yang Digunakan

- [axios](https://axios-http.com/docs/intro)
- [vue-router](https://router.vuejs.org/)
- [pinia](https://pinia.vuejs.org/)
- [pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/)
- [vue-toastification](https://vue-toastification.maronato.dev/)
- [vue-sweetalert2](https://sweetalert2.github.io/)
- [@vueuse/motion](https://motion.vueuse.org/)
- [flowbite](https://flowbite.com/)
- [preline](https://preline.co/)

## Todo

<!-- buatkan checkbox -->

- [x] Autentikasi dan Middleware
  - [x] Login
  - [x] Register
  - [x] Logout
  - [x] Reset Password
- [x] CRUD Todo ( Create, Read, Update, Delete )
  - [x] Create Todo
  - [x] Read Todo
  - [x] Update Todo
  - [x] Delete Todo
  - [x] Refresh Token (JWT)
  - [ ] Filter Todo
  - [ ] Sorting Todo
  - [ ] Label Todo
  - [ ] Notifikasi Todo
  - [ ] Drag and Drop Todo
- [ ] User Setting ( Update and Delete User )
  - [ ] Update User
  - [ ] Delete User
  - [ ] Refresh Token (JWT)
- [x] Integrasi dengan MongoDB
- [x] Deploy ke Vercel

## Tampilan Aplikasi

<!-- image -->

### Home

![Tampilan Aplikasi](https://github.com/Azizsige/todo-mongo/blob/master/public/img/home.png?raw=true)

### Login

![Tampilan Aplikasi](https://github.com/Azizsige/todo-mongo/blob/master/public/img/login.png?raw=true)

### Register

![Tampilan Aplikasi](https://github.com/Azizsige/todo-mongo/blob/master/public/img/register.png?raw=true)

<!-- link live preview -->

[Live Preview](https://todo-mongo.vercel.app/)

## Fitur

Aplikasi Todo List memiliki fitur-fitur berikut:

1. CRUD Todo

   - Pengguna dapat membuat, membaca, memperbarui, dan menghapus tugas-tugas dalam daftar.
   - Setiap tugas memiliki judul, deskripsi, status (selesai/belum selesai), dan tanggal deadline (opsional).
   - Pengguna dapat menandai tugas sebagai selesai atau membatalkan tanda selesai.

2. Login dan Register

   - Pengguna dapat membuat akun baru dengan mengisi formulir pendaftaran.
   - Pengguna dapat melakukan login menggunakan akun yang sudah terdaftar.
   - Autentikasi dilakukan menggunakan JSON Web Token (JWT) untuk menjaga keamanan.

3. Integrasi dengan MongoDB Backend
   - Aplikasi terhubung dengan MongoDB sebagai database backend untuk menyimpan dan mengelola data tugas pengguna.
   - Setiap tugas yang dibuat oleh pengguna akan disimpan dalam database MongoDB.
   - Data tugas dapat diambil, diperbarui, atau dihapus dari database sesuai dengan permintaan pengguna.

## Penggunaan

Berikut adalah langkah-langkah untuk menjalankan aplikasi Todo List:

1. Pastikan Anda memiliki Node.js dan NPM terinstal di komputer Anda.

2. Clone repositori ini ke komputer lokal:

   ```bash
   git clone <URL_REPOSITORI>
   ```

3. Masuk ke direktori client:

   ```bash
   cd client
   ```

4. Install semua dependensi yang dibutuhkan:

   ```bash
    npm install
   ```

5. Jalankan aplikasi:

   ```bash
    npm run dev
   ```

6. Buka aplikasi di browser dengan membuka alamat berikut: http://localhost:1234/

## Kontribusi

Jika Anda ingin berkontribusi pada pengembangan aplikasi Todo List, silakan ikuti langkah-langkah berikut:

1. Fork repositori ini.
2. Buat branch baru untuk fitur atau perbaikan yang akan Anda tambahkan:
   ```bash
   git checkout -b <nama-branch>
   ```
3. Lakukan perubahan yang diperlukan dan lakukan commit:
   ```bash
   git commit -m "<pesan-commit>"
   ```
4. Push ke branch yang baru dibuat:
   ```bash
   git push origin <nama-branch>
   ```
5. Buat pull request ke branch `master` pada repositori ini.

Terima kasih atas kontribusi Anda!

## Lisensi

Aplikasi ini dilisensikan di bawah [MIT License](). Silahkan baca [LICENSE]() untuk informasi lebih lanjut.

Terima kasih!
