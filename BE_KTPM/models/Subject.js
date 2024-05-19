const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const subjects = new Schema({
    idSubject : {
         type : String,
         required : true
    },
    nameSubject : {
         type : String,
         required : true
    },
    class : {
         type : String,
         required : true
    },
    //giảng viên
     teacher : {
            type : String,
            required : true
     },
     //số tín chỉ
     numberCredits : {
          type : Number,
          required : true
     },
     //sỉ số tối đa
     maxStudent : {
          type : Number,
          required : true
     },
     //sỉ số hiện tại
     currentStudent : {
          type : Number,
          required : true
     },
     //trạng thái đăng ký
     status : {
          type : String,
          required : true
     },
     fee : {
          type : Number,
          required : true
     },
     //ngày bat đầu
     startDate : {
          type : Date,
          required : true
     },
     //ngày kết thúc
     endDate : {
          type : Date,
          required : true
     },
     //id học kì
     idSemester : {
          type : String,
          required : true
     }
    });


const Subject = mongoose.model('Subject', subjects);

module.exports = Subject;