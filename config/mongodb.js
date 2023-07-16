const { MongoClient } = require ('mongodb');

// user dbs: eduwork
// password: wina123
const url = 'mongodb://eduwork:wina123@127.0.0.1:27017?authSource=admin';
const client = new MongoClient(url);

(async () => {
    try {
        await client.connect();
        console.log('Koneksi ke MongoDB berhasil');
    } catch (e) {
        console.log(e);
    }
})();

const db = client.db('eduwork-native');

module.exports = db;