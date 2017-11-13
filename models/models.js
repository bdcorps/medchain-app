var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var patientSchema = new Schema({
    name: String,
    age: String,
    gender: String,
    comments: [String],
    diseases: [String],
    drugs: [String],
});

var patientModel = mongoose.model('patient', patientSchema, 'patient');

var doctorSchema = new Schema({
    name: String,
    patients: [{ type: Schema.Types.ObjectId, ref: 'patientModel' }]
});

var doctorModel = mongoose.model('doctor', doctorSchema, 'doctor');

var pharmacistSchema = new Schema({
    name: String,
    customers: [{
        patient: { type: Schema.Types.ObjectId, ref: 'patientModel' },
        doctor: { type: Schema.Types.ObjectId, ref: 'doctorModel' }
    }]
});

var pharmacistModel = mongoose.model('pharmacist', pharmacistSchema, 'pharmacist');

module.exports = { patientModel: patientModel, doctorModel: doctorModel, pharmacistModel: pharmacistModel };