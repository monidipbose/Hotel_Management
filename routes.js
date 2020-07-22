const express = require("express");
const AWS = require("aws-sdk");
var mysql = require("mysql");

const router = express.Router();

const ID = "";
const SECRET = "";
const BUCKET_NAME = "";

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
});

const uploadFile = async (fileName) => {
  // Setting up S3 upload parameters
  const params = {
    Bucket: BUCKET_NAME,
    Key: Date.now() + fileName.name, // File name you want to save as in S3
    Body: fileName.data,
    ACL: "public-read",
  };
  // Uploading files to the bucket
  return await s3.upload(params).promise();
};

const getData = async (req, res, next) => {
  try {
    let { date, checkinApprove } = req.params;
    let sql =
      "SELECT regDate,name,email,code,phonenumber,age,gender,nationality,checkinApprove FROM register";
    if (date === "all" && checkinApprove != "all") {
      sql = sql + " where checkinApprove = '" + checkinApprove + "'";
    }
    if (date != "all" && checkinApprove === "all") {
      sql = sql + " where regDate = '" + date + "'";
    }
    if (date != "all" && checkinApprove != "all") {
      sql =
        sql +
        " where regDate = '" +
        date +
        "' AND checkinApprove = '" +
        checkinApprove +
        "'";
    }
    sql = sql + " ORDER BY regDate DESC";
    const con = mysql.createConnection({
      host: "mashal.c1qllfwqoquo.us-east-2.rds.amazonaws.com",
      user: "mashal_admin",
      password: "mashal2020",
      database: "Mashal",
    });

    con.connect(function () {
      con.query(sql, function (err, result) {
        if (err) {
          con.end();
          throw err;
        }
        res.json({ result: result });
      });
      con.end();
    });
  } catch (e) {
    next(e);
  }
};

const getUserByEmail = async (req, res, next) => {
  try {
    let { email } = req.params;
    let sql = "SELECT * FROM register where email = '" + email + "'";

    const con = mysql.createConnection({
      host: "mashal.c1qllfwqoquo.us-east-2.rds.amazonaws.com",
      user: "mashal_admin",
      password: "mashal2020",
      database: "Mashal",
    });

    con.connect(function () {
      con.query(sql, function (err, result) {
        if (err) {
          con.end();
          throw err;
        }
        res.json({ result: result });
      });
      con.end();
    });
  } catch (e) {
    next(e);
  }
};

const approveUser = async (req, res, next) => {
  try {
    let { email } = req.params;
    let sql =
      "UPDATE register SET checkinApprove = 'yes' WHERE email = '" +
      email +
      "'";

    const con = mysql.createConnection({
      host: "mashal.c1qllfwqoquo.us-east-2.rds.amazonaws.com",
      user: "mashal_admin",
      password: "mashal2020",
      database: "Mashal",
    });

    con.connect(function () {
      con.query(sql, function (err, result) {
        if (err) {
          con.end();
          throw err;
        }
        res.json({ result: result });
      });
      con.end();
    });
  } catch (e) {
    next(e);
  }
};

const editUser = async (req, res, next) => {
  try {
    let data = req.body;
    let { emailId } = req.params;
    let {
      email,
      name,
      code,
      phonenumber,
      gender,
      age,
      address,
      purpose,
      companyname,
      sourceofbooking,
      reservationnumber,
      dob,
      doa,
      nationality,
      passportnumber,
      passportdateissued,
      passportplace,
      visanumber,
      visadateissued,
      visaplace,
      covidcontacted,
      symptoms,
      arrivingfrom,
      nextdestination,
      visitedplaces,
      photoUrl,
      photoIdFrontUrl,
      photoIdBackUrl,
      photoVisaUrl,
      photoPassPortFrontUrl,
      photoPassPortBackUrl,
    } = data;

    let sql =
      "UPDATE register SET email = '" +
      email +
      "',name = '" +
      name +
      "',code=" +
      code +
      ",phonenumber=" +
      phonenumber +
      ",gender='" +
      gender +
      "',age=" +
      age +
      ",address='" +
      address +
      "',purpose='" +
      purpose +
      "',companyname='" +
      companyname +
      "',sourceofbooking='" +
      sourceofbooking +
      "',reservationnumber='" +
      reservationnumber +
      "',dob='" +
      dob +
      "',doa='" +
      doa +
      "',nationality='" +
      nationality +
      "',passportnumber='" +
      passportnumber +
      "',passportdateissued='" +
      passportdateissued +
      "',passportplace='" +
      passportplace +
      "',visanumber='" +
      visanumber +
      "',visadateissued='" +
      visadateissued +
      "',visaplace='" +
      visaplace +
      "',covidcontacted='" +
      covidcontacted +
      "',symptoms='" +
      symptoms +
      "',arrivingfrom='" +
      arrivingfrom +
      "',nextdestination='" +
      nextdestination +
      "',visitedplaces='" +
      visitedplaces +
      "',photoUrl='" +
      photoUrl +
      "',photoIdFrontUrl='" +
      photoIdFrontUrl +
      "',photoIdBackUrl='" +
      photoIdBackUrl +
      "',photoVisaUrl='" +
      photoVisaUrl +
      "',photoPassPortFrontUrl='" +
      photoPassPortFrontUrl +
      "',photoPassPortBackUrl='" +
      photoPassPortBackUrl +
      "' WHERE email = '" +
      emailId +
      "'";
    const con = mysql.createConnection({
      host: "mashal.c1qllfwqoquo.us-east-2.rds.amazonaws.com",
      user: "mashal_admin",
      password: "mashal2020",
      database: "Mashal",
    });

    con.connect(function () {
      con.query(sql, function (err, result) {
        if (err) {
          con.end();
          throw err;
        }
        res.json({ result: result });
      });
      con.end();
    });
  } catch (e) {
    next(e);
  }
};
const register = async (req, res, next) => {
  try {
    let data = req.body;

    let {
      email,
      name,
      code,
      phonenumber,
      gender,
      age,
      address,
      purpose,
      companyname,
      sourceofbooking,
      reservationnumber,
      dob,
      doa,
      nationality,
      passportnumber,
      passportdateissued,
      passportplace,
      visanumber,
      visadateissued,
      visaplace,
      covidcontacted,
      symptoms,
      arrivingfrom,
      nextdestination,
      visitedplaces,
      photoUrl,
      photoIdFrontUrl,
      photoIdBackUrl,
      photoVisaUrl,
      photoPassPortFrontUrl,
      photoPassPortBackUrl,
      regDate,
      checkinApprove,
    } = data;

    let sql =
      "INSERT INTO register (email,name,code,phonenumber,gender,age,address,purpose,companyname,sourceofbooking,reservationnumber,dob,doa,nationality,passportnumber,passportdateissued,passportplace,visanumber,visadateissued,visaplace,covidcontacted,symptoms,arrivingfrom,nextdestination,visitedplaces,photoUrl,photoIdFrontUrl,photoIdBackUrl,photoVisaUrl,photoPassPortFrontUrl,photoPassPortBackUrl,regDate,checkinApprove) VALUES ('" +
      email +
      "','" +
      name +
      "'" +
      "," +
      code +
      "," +
      phonenumber +
      ",'" +
      gender +
      "'" +
      "," +
      age +
      ",'" +
      address +
      "'" +
      ",'" +
      purpose +
      "'" +
      ",'" +
      companyname +
      "'" +
      ",'" +
      sourceofbooking +
      "'" +
      ",'" +
      reservationnumber +
      "'" +
      ",'" +
      dob +
      "'" +
      ",'" +
      doa +
      "'" +
      ",'" +
      nationality +
      "'" +
      ",'" +
      passportnumber +
      "'" +
      ",'" +
      passportdateissued +
      "'" +
      ",'" +
      passportplace +
      "'" +
      ",'" +
      visanumber +
      "'" +
      ",'" +
      visadateissued +
      "'" +
      ",'" +
      visaplace +
      "'" +
      ",'" +
      covidcontacted +
      "'" +
      ",'" +
      symptoms +
      "'" +
      ",'" +
      arrivingfrom +
      "'" +
      ",'" +
      nextdestination +
      "'" +
      ",'" +
      visitedplaces +
      "'" +
      ",'" +
      photoUrl +
      "'" +
      ",'" +
      photoIdFrontUrl +
      "'" +
      ",'" +
      photoIdBackUrl +
      "'" +
      ",'" +
      photoVisaUrl +
      "'" +
      ",'" +
      photoPassPortFrontUrl +
      "'" +
      ",'" +
      photoPassPortBackUrl +
      "'" +
      ",'" +
      regDate +
      "'" +
      ",'" +
      checkinApprove +
      "'" +
      ")";

    const con = mysql.createConnection({
      host: "mashal.c1qllfwqoquo.us-east-2.rds.amazonaws.com",
      user: "mashal_admin",
      password: "mashal2020",
      database: "Mashal",
    });

    con.connect(function () {
      con.query(sql, function (err, result) {
        if (err) {
          con.end();
          throw err;
        }
        res.json({ result: result });
      });
      con.end();
    });
  } catch (e) {
    next(e);
  }
};

router.route("/api/getUser/:date/:checkinApprove").get(getData);

router.route("/api/get/:email").get(getUserByEmail);

router.route("/api/approve/:email").put(approveUser);

router.route("/api/edit/:emailId").put(editUser);

router.route("/api/upload").post(async (req, res) => {
  try {
    const file = req.files.photo;
    const { Location } = await uploadFile(file);
    res.json({ url: Location });
  } catch (error) {
    console.log(error);
  }
});

router.route("/api/register").post(register);

module.exports = router;
