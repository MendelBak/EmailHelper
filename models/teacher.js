const mongoose = require('mongoose');
const { Schema } = mongoose;

const teacherSchema = new Schema({
    age: Number,
    name: String,
});

mongoose.model('teachers', teacherSchema);
