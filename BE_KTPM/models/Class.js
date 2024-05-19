const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const classes = new Schema({
    id : {
        type : String,
    },
    idHocPhan : {
        type : String,
    },
    tenHocPhan : {
        type : String,
    },
    lopHocPhan : {
        type : String,
    },
    giangVien : {
        type : String,
    },
    soTinChi : {
        type : Number,
    },
    siSoToiDa : {
        type : Number,
    },
    siSoDaDangKy : {
        type : Number,
    },
    trangThai : {
        type : String,
    },
    hocPhi : {
        type : Number,
    },
    ngayBatDau : {
        type : Date,
    },
    ngayKetThuc : {
        type : Date,
    },
    hanNop : {
        type : Date,
    },
    idHocKy : {
        type : String,
    }
});


const Class = mongoose.model('Class', classes);

module.exports = Class; 