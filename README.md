# PT INFORMATIKA MEDIA PRATAM (IMP) - Coding Test

Ini adalah task membuat restful api dengan fitur:

- pagination
- request validation
- middlewares
- signup
- login
- token
- route handling

## Cara Menggunakannya

1. Clone terlebih dahulu repository ini.
2. Install semua depedencies yang di perlukan dengan perintah:

```bash
npm install
```

3. Nyalakan koneksi database mysql dan buat database baru dengan nama **restful_api_user_dev**.
4. Jalankan migration dengan perintah:

```bash
npm run migrate:up
```

5. Jalankan seeder. sebelum menjalankannya ada optional yang apabila Anda perlukan yaitu mengedit bagian seeder ini:
   (Lokasi file ada di "/seeders/20230321010709-user.js")

```js
async up(queryInterface, Sequelize) {
  const users = await userGenerator(5); // passing number in this function to generate user data how much you want
  await queryInterface.bulkInsert('users', users, {});
},
```

6. Selanjutnya restful api test di postman.

## Tes Resfult Api Melalui Postman

Running app:

1. Buat sebuah file `.env`, contohnya ada di file `.env.example`
2. Jalankan aplikasi server dengan perintah:

```bash
npm run dev
```

3. Aplikasi siap di tes di postman dengan aplikasi berjalan di port yang Anda sesuaikan atau secara default berjalan di port 5000.

Ada beberapa endpoint yang sudah di sediakan dan bisa di coba:

baseurl = http://localhost:5000/api/v1

- **POST** /auth/signup
- **POST** /auth/login
- **GET** /user/userlist (optional query= page, size)

examples:

- **POST** http://localhost:5000/api/v1/auth/signup
- **POST** http://localhost:5000/api/v1/auth/login
- **GET** http://localhost:5000/api/v1/user/userlist

userlist examples:

- **GET** http://localhost:5000/api/v1/user/userlist?page=1
- **GET** http://localhost:5000/api/v1/user/userlist?size=5
- **GET** http://localhost:5000/api/v1/user/userlist?page=1&size=5;

## Kesimpulan

Itulah tadi untuk mulai menginisialisasi hingga menjalakannya. Ada beberapa note yang ingin saya sampaikan

**notes:**

1. Pada endpoint /user/userlist secara default sudah menggunakan pagination dengan page defaultnya yaitu = 1 dan sizenya yaitu 3.
2. Ada beberapa command yang saya sediakan, listnya ada di file package.json

```bash
npm start // Menjalankan aplikasi server di lingkungan production. (Pastikan NODE_ENV nya juga production)
npm run dev // Menjalankan aplikasi server di lingkungan development
npm run model:generate:user // Membuat model dan migration dengan nama user serta attribute (fullname, username, password)
npm run seed:generate:user // Membuat seeder user
npm run migrate:up // Menjalankan seluruh migrations
npm run migrate:down // Menarik seluruh migrations
npm run seed:up // Menjalankan seluruh seeders
npm run seed:down // Menarik seluruh seeders
```
