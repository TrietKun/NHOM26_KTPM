const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const subjectOfUser = new Schema({
   idSubject : {
       type : String,
   },
   nameSubject : {
       type : String,
   },
   class : {
       type : String,
   },
   //giảng viên
    teacher : {
         type : String,
    },
    //số tín chỉ
    numberCredits : {
        type : Number,
    },
    //sỉ số tối đa
    maxStudent : {
        type : Number,
    },
    //sỉ số hiện tại
    currentStudent : {
        type : Number,
    },
    //trạng thái đăng ký
    status : {
        type : String,
    },
    fee : {
        type : Number,
    },
    //ngày bat đầu
    startDate : {
        type : Date,
    },
    //ngày kết thúc
    endDate : {
        type : Date,
    },
    //id học kì
    idSemester : {
        type : String,
    },
    //hạn nộp học phí
    deadline : {
        type : Date,
    },
});

const users = new Schema({
    mssv : {
        type : String,
        unique : true
    },
    name : {
        type : String,
    },
    status : {
        type : String,
    },
    numberSubjectFail : {
        type : Number,
    },
    dshocPhan : {
        type : Array,
    },
    listSubject : [subjectOfUser],
});

//tạo 1 user mới
users.statics.createUser = async function(mssv, name, status, numberSubjectFail) {
    const newUser = new User({ mssv: mssv, name: name, status: status, numberSubjectFail: numberSubjectFail });
    await newUser.save();
    return newUser;
};
//tìm user theo mssv
users.statics.findUser = function(mssv) {
    return this.findOne({ mssv });
}

const User = mongoose.model('User', users);

module.exports = User;
