const mongoose = require("mongoose")
const internModel = require("../models/internModel")
const collegeModel = require("../models/collegeModel")

//------------------------Regex----------------------------//

let mobileRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/

let emailRegex = /^[a-z]{1}[a-z0-9._]{1,100}[@]{1}[a-z]{2,15}[.]{1}[a-z]{2,10}$/

//--------------------------------------------------------//

const createIntern = async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin','*')
    try {
        let data = req.body
        let { name, mobile, email, collegeName } = data

        if (Object.keys(data).length === 0)
            return res.status(400).send({ Status: false, message: "Please provide all the required data ⚠️⚠️" })

        if (!name || name == "")
            return res.status(400).send({ Status: false, message: "Please provide name ⚠️⚠️" })
        else
            data.name = data.name.trim()

        if (!email || email == "")
            return res.status(400).send({ Status: false, message: "Please provide email ⚠️⚠️" })
        else
            data.email = data.email.trim()

        if (!emailRegex.test(email)) {
            return res.status(400).send({ Status: false, message: "Please enter valid email ⚠️⚠️" })
        }

        if (email) {
            let checkemail = await internModel.findOne({ email: email })

            if (checkemail) {
                return res.status(400).send({ Status: false, message: "Please provide another email, this email has been used ⚠️⚠️" })
            }
        }

        if (!mobile || mobile == "") {
            return res.status(400).send({ Status: false, message: "Please provide mobile number ⚠️⚠️" })
        }
        if (!mobileRegex.test(mobile)) {
            return res.status(400).send({ Status: false, message: "Please enter valid Indian mobile number ⚠️⚠️" })
        }
        if (mobile) {
            let checkmobile = await internModel.findOne({ mobile: mobile })

            if (checkmobile) {
                return res.status(400).send({ Status: false, message: "Please provide another number, this number has been used ⚠️⚠️" })
            }
        }
        else { data.mobile = data.mobile.trim() }

        if (!collegeName || collegeName == "") {
            return res.status(400).send({ Status: false, message: "Please provide collegeName ⚠️⚠️" })
        }
        else { data.collegeName = data.collegeName.trim() }

        let college = await collegeModel.findOne({ name: collegeName })
        if(!college){
            return res.status(400).send({status: false, msg : "Please enter valid collegeName ⚠️⚠️"})
        }
        else data.collegeId = college["_id"]

        let newIntern = await internModel.create(data)
        let savedData = await internModel.findOne(newIntern).select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0 })
        res.status(201).send({ status: true, msg: "Intern Registered Successfully ✅✅", data: savedData })
    }
    catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
}


//-------------------------------------------------------------------------//
module.exports.createIntern = createIntern
//-------------------------------------------------------------------------//
