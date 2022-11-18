import QRCode from "qrcode";
import hash from "object-hash";
import sharp from "sharp";

const url = "http://idol-final-2022.s3-website-us-east-1.amazonaws.com/vote";

for (let id = 1; id <= 250; ++id) {
  const auth = hash(`${id}kwcssaidols`, { algorithm: "md5" });

  QRCode.toFile(`./qr_codes/${id}.png`, [
    { data: `${url}?id=${id}&auth=${auth}` },
  ]).catch((err) => {
    console.error(err);
  });
}
