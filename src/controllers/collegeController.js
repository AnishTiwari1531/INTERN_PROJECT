const mongoose = require("mongoose")
const collegeModel = require("../models/collegeModel")


//------------------------regex---------------------------//

let nameRegex = /^[#.a-zA-Z\s,-]+$/

//---------------------------------------------------------------//



module.exports.createCollege = async function (req, res){
  try {
      let data = req.body
      let { name, fullName, logoLink, isDeleted } = data

      if (Object.keys(data).length === 0) {
          return res.status(400).send({ Status: false, message: "Please provide all the details ⚠️" })
      }

      if (!name || name == "") {
          return res.status(400).send({ Status: false, message: "Please provide name ⚠️" })
      }
      name=data.name=name.trim()
      if (!nameRegex.test(name)) {
          return res.status(400).send({ Status: false, message: "Please enter valid name ⚠️" })
      }

      if (name) {
          let checkname = await collegeModel.findOne({name :name})
          if (checkname) {
              return res.status(400).send({ Status: false, message: "Please provide another college name, this college name has been already used ⚠️" })
          }
      }

      if (!fullName || fullName == "") {
          return res.status(400).send({ Status: false, message: "Please provide fullName ⚠️" })
      }

      fullName=data.fullName=fullName.trim()
      if (!nameRegex.test(fullName)) {
          return res.status(400).send({ Status: false, message: "Please enter valid fullName ⚠️" })
      }

      if (!logoLink || logoLink == "") {
          return res.status(400).send({ Status: false, message: "Please provide logoLink ⚠️" })
      }

      if (isDeleted == true) {
          res.status(400).send({ status: false, msg: "Cannot input isDeleted as true while registering ⚠️" });
          return;
      }
      let savedData = await collegeModel.create(data)
      return res.status(201).send({ status : true, msg: savedData })
  }
  catch (error) {
      res.status(500).send({ status: false, error: error.message })
    }
  }

//---------------------------------------------------------------//