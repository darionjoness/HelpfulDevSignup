import mongoose from 'mongoose'

const emailSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
},{
    timestamps: true
})

const Emails = mongoose.model('Emails', emailSchema)

export default Emails