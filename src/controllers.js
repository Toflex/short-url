const { Sequelize, DatabaseError } = require("sequelize");
const { RouteTable } = require("./db/config");
const crypto = require("crypto");
const { HOST } = require("./configuration");

const Home = (req, res) => {
  res.render("index", { url: null, message: null });
};

const GenerateUrl = async (req, res) => {
  const url = req.body.url;
  if (!url) {
  }

  let id = crypto.randomBytes(4).toString("hex");

  RouteTable.findOrCreate({
    where: { long_url: url },
    defaults: {
      long_url: url,
      short_url: id,
    },
  })
    .then((shortUrl, _) => {
      console.log(shortUrl[0].short_url);
      return res.render("index", {
        url: `${HOST}/${shortUrl[0].short_url}`,
        message: null,
      });
    })
    .catch((error) => {
      console.error(`An error occured. ${error}`);
      return res.render("index", {
        url: null,
        message: "Short URL could not be generated. Please try again!",
      });
    });
};

const VistLink = async (req, res) => {
    const urlCode = req.params.code
  const url = await RouteTable.findOne({ where: { short_url: urlCode } });
  if (url === null) {
    return res.render('404');
  } else {
    return res.redirect(url.long_url)
  }
};

module.exports = { Home, GenerateUrl, VistLink };
