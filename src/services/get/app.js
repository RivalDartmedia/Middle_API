const axios = require('axios');

// URL API yang ingin diambil datanya
const apiUrl = 'http://172.104.36.61:30007/api/allreports?filters=cardId%3A%3A21F50890&logic=AND';

// API key yang diperlukan untuk mengakses API
const apiKey = '5AF6225DC1CBCE981CF3F41EEE68D';

// Konfigurasi untuk header yang diperlukan
const config = {
  headers: {
    'API-Key': `${apiKey}`,
    'Content-Type': 'application/json' // Contoh header tambahan, sesuaikan jika diperlukan
  }
};

// Lakukan permintaan GET ke API dengan header yang diperlukan
axios.get(apiUrl, config)
  .then(response => {
    // Parsing data JSON yang diterima
    const responseData = response.data;

    // Mendapatkan kunci dari objek data
    const keys = Object.keys(responseData);

    // Mendapatkan nilai dari kunci pertama
    const reports = responseData[keys[0]];

    // Mendapatkan data terakhir dari array
    const lastReport = reports[(reports.length)-1];

    // Mengambil data
    // const namaKaryawan = lastReport.data.nama_karyawan;

    // Menampilkan hasil
    console.log(lastReport);
    // console.log("Nama Karyawan:", namaKaryawan);

    // Lakukan operasi apapun dengan data yang didapat
    // console.log('Data yang didapat:', responseData);
  })
  .catch(error => {
    console.error('Gagal melakukan permintaan ke API:', error);
  });
