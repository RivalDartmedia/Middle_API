const axios = require('axios');
require('dotenv').config();

class GetService {
    async getApi(id, filter) {
        const apiUrl1 = process.env.APIURL1;
        const apiUrl2 = process.env.APIURL2;
        const apiUrl3 = process.env.APIURL3;
        const apiUrl = apiUrl1 + filter + apiUrl2 + id + apiUrl3;
        const apiKey = process.env.APIKEY;

        const config = {
            headers: {
              'API-Key': `${apiKey}`,
              'Content-Type': 'application/json' // Contoh header tambahan, sesuaikan jika diperlukan
            }
        };

        const result = await axios.get(apiUrl, config)
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

                return lastReport;
            })
            .catch(error => {
                console.error('Gagal melakukan permintaan ke API:', error);
            });
        return result;
    }
}

module.exports = GetService;