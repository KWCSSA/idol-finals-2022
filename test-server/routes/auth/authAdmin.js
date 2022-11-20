const authAdmin = (req, res, next) => {
  const ADMIN_ID = "it-kwcssa-2022";
  const ADMIN_TOKEN = "b53c0dd8cba768c0140858250c36a9e1";
  const adminID = req.body.adminID;
  const adminToken = req.body.adminToken;
  if (adminID === ADMIN_ID && adminToken === ADMIN_TOKEN) {
    next();
  } else {
    res.status(403).send({ message: "ADMIN_AUTH_ERROR" });
  }
};

module.exports = authAdmin;
