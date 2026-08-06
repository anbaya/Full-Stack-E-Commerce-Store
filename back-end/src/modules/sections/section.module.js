const mongoose = require('mongoose');
const { token } = require('morgan');
// const { use } = require('react');

const sectionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true },
    ValidityState: { type: Boolean, default: true },
});

const Section = mongoose.model('Section', sectionSchema);

module.exports = Section;