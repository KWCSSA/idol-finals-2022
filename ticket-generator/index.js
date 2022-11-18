import QRCode from 'qrcode';
import hash from 'object-hash';
import sharp from 'sharp';

const url = 'https://main.d1d3xqqym8g55o.amplifyapp.com/vote';

for (let id = 1; id <= 250; ++id) {
    const auth = hash(`${id}kwcssaidols`, { algorithm: 'md5' });

    QRCode.toFile(
        `./qr_codes/${id}.png`,
        [{ data: `${url}?id=${id}&auth=${auth}` }]
    ).catch(err => {
        console.error(err);
    });
}
