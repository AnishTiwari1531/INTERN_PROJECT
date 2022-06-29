const mongoose = require("mongoose")
const internModel = require("../models/internModel")
const collegeModel = require("../models/collegeModel")

//------------------------Regex----------------------------//
let mobileRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/
let emailRegex = /^[a-z]{1}[a-z0-9._]{1,100}[@]{1}[a-z]{2,15}[.]{1}[a-z]{2,10}$/
//--------------------------------------------------------//

module.exports.createIntern = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length === 0)
            return res.status(400).send({ Status: false, message: "Please provide all the required data ⚠️" })

        let { name, mobile, email, collegeId } = data

        if (!name || name == "")
            return res.status(400).send({ Status: false, message: "Please provide name ⚠️" })
        else
            data.name = data.name.trim()

        if (!emailRegex.test(email)) {
            return res.status(400).send({ Status: false, message: "Please enter valid email 🛑" })
        }
        if (email) {
            let checkemail = await internModel.findOne({ email: email })

            if (checkemail) {
                return res.status(400).send({ Status: false, message: "Please provide another email, this email has been used 🛑" })
            }
        }
        if (!mobile || mobile == "") {
            return res.status(400).send({ Status: false, message: "Please provide mobile number ⚠️" })
        }
        if (!mobileRegex.test(mobile)) {
            return res.status(400).send({ Status: false, message: "Please enter valid mobile number ⚠️" })
        }
        if (mobile) {
            let checkmobile = await internModel.findOne({ mobile: mobile })

            if (checkmobile) {
                return res.status(400).send({ Status: false, message: "Please provide another number, this number has been used 🛑" })
            }
        }
        else { data.mobile = data.mobile.trim() }

        if (!collegeId || collegeId == "") { return res.status(400).send({ Status: false, message: "Please provide collegeId ⚠️" }) }
        else { data.collegeId = data.collegeId.trim() }

        let savedData = await internModel.create(data)
        res.status(201).send({ status: true, msg: savedData })
    }
    catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
}

//-------------------------------------------------------------------------//
