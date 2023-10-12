import asyncHandler from 'express-async-handler'
import Emails from '../models/emailModel.js'
import nodemailer from 'nodemailer'

// @desc    Sign user up for notifications
// route    /api/register
// @access  Public
const signupUser = asyncHandler(async (req, res) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: 'gmail',
        port: 25,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
        from: process.env.EMAIL_USER
    })

    // Get email from the body
    const { email } = req.body


    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thank You for Joining HelpfulDev: Connecting Engineers with Causes',
        html: `
        <h1>Welcome to HelpfulDev,</h1>
        <p>where code meets compassion! We are overjoyed to have you on board as a valued member of our community.</p>
        <p>Your decision to join us is a testament to your commitment to making a positive impact. By linking volunteer software engineers with non-profits, we're on a mission to change lives through technology. Together, we'll create a world where every line of code serves a greater purpose.</p>
        <p>As we gear up for the launch, expect exclusive previews, insightful content, and updates on how we're shaping the future of tech-for-good. Your input will be invaluable in refining our platform to meet the unique needs of both engineers and non-profits.</p>
        <p>Should you ever have questions, ideas, or just want to chat, don't hesitate to get in touch. We're here to listen and learn from you.
        </p>
        <p>Thank you once again for embarking on this journey with us. Together, we'll build a brighter future!</p>

        <p>Warm regards,</p>

        <p>Darion</p>
        <p>Founder</p>
        `
    }

    // Find the email
    const emailExists = await Emails.findOne({ email })

    // Check if the email already exists
    if(emailExists){
        res.status(400)
        throw new Error('Email already signed up')
    }

    // Add email to db
    const newEmail = Emails.create({
        email
    })

    // Check if email created properly
    if(newEmail){
        // Send email thanking them for signing up
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error.message)
            }else{
                console.log('Email sent: ' + info.response)
            }
        })
        // Respond with the email
        res.status(201).json({
            email
        })
    }else{
        // Send 400 status and error
        res.status(400)
        throw new Error('Invalid user data')
    }
})

export {
    signupUser
}