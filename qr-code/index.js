import QRCode from 'qrcode';
import hash from 'object-hash';

// ifconfig | grep 'inet 192.168'
const url = 'http://192.168.1.65:3000/vote';

for (let id = 0; id <= 999; ++id) {
    const auth = hash(`${id}kwcssaidols`, { algorithm: 'md5' });

    QRCode.toFile(
        `./mock_qr_code/${id}.png`,
        [{ data: `${url}?id=${id}&auth=${auth}` }]
    ).catch(err => {
        console.error(err);
    })
}

