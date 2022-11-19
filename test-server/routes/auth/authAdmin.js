const authAdmin = (req, res, next) => {
  const ADMIN_ID = "it-kwcssa-2022";
  const ADMIN_TOKEN = "b53c0dd8cba768c0140858250c36a9e1";
  // console.log("req", req);
  // console.log("req.params", req.params);
  // console.log("req.query", req.query);
  // console.log("req.body", req.body);
  const adminID = req.body.adminID;
  const adminToken = req.body.adminToken;
  // console.log(ADMIN_ID, adminID, ADMIN_TOKEN, adminToken);
  // console.log(
  //   typeof ADMIN_ID,
  //   typeof adminID,
  //   typeof ADMIN_TOKEN,
  //   typeof adminToken
  // );
  if (adminID === ADMIN_ID && adminToken === ADMIN_TOKEN) {
    next();
  } else {
    res.status(403).send({ message: "ADMIN_AUTH_ERROR" });
  }
};

module.exports = authAdmin;
