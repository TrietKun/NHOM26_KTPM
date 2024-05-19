const Class = require('../models/Class');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

exports.getAllClass = async (req, res) => {
  try {
    const classes = await Class.find();
    return res.json({message: "Get all class success", data: classes});
  } catch (error) {
    console.error('Error:', error);
    return res.json({message: "Get all class failed"});
  }
};


exports.getClass = async (req, res) => {
  try {
    const { id } = req.params;
    const classs = await Class.findById(id);
    return res.json({message: "Get class success", data: classs});
  } catch (error) {
    console.error('Error:', error);
    return res.json({message: "Get class failed"});
  }
};

exports.registerClass = async (req, res) => {
    try {
        const clazz = req.body.class;
        const userId = req.body.userId;
        //thêm 1 trường vào đối tượng clazz
        clazz.thu = false;
        
        // Truy cập đối tượng User dựa trên userId
        const user = await User.findById(userId);

        // Thêm lớp học vào mảng dshocPhan của đối tượng User
        user.dshocPhan.push(clazz);

        // Lưu lại đối tượng User sau khi đã thêm lớp học
        await user.save();

        return res.json({ message: "Register class success" });
    } catch (error) {
        console.error('Error:', error);
        return res.json({ message: "Register class failed" });
    }
}


exports.deleteClass = async (req, res) => {
    try {
        const clazz = req.body.class;
        const userId = req.body.userId;
        console.log("Class:", clazz.idHocPhan);
        //xóa class khỏi mảng user.dshocPhan
        const user = await User.findById(userId);
        console.log("User:", user);

        user.dshocPhan = user.dshocPhan.filter(item => item.idHocPhan !== clazz.idHocPhan);

        await user.save();
        return res.json({message: "Delete class success"});
    }
    catch (error) {
        console.error('Error:', error);
        return res.json({message: "Delete class failed"});
    }
}

//tìm class theo idHocPhan rồi tăng số sinh viên đã đăng ký
exports.increaseStudent = async (req, res) => {
    try {
        const { _id } = req.body;
        const clazz = await Class.findById(_id);
        clazz.siSoDaDangKy++;
        await clazz.save();
        return res.json({message: "Increase student success"});
    } catch (error) {
        console.error('Error:', error);
        return res.json({message: "Increase student failed"});
    }
}

//tìm class theo idHocPhan rồi giảm số sinh viên đã đăng ký
exports.decreaseStudent = async (req, res) => {
  try {
    const { _id } = req.body;
    const clazz = await Class.findById(_id);
    clazz.siSoDaDangKy--;
    await clazz.save();
    return res.json({message: "Decrease student success"});
} catch (error) {
    console.error('Error:', error);
    return res.json({message: "Decrease student failed"});
}
}

exports.checkNumberCredit = async (req, res) => {
  try {
    const userId = req.body.userId;
    const hk = req.body.hk;
    const soTinChi = req.body.soTinChi;

    const user = await User.findById(userId);
    //tìm số tín chỉ theo học kỳ
    let soTinChiDaDat = 0;
    user.dshocPhan.forEach(item => {
      if (item.idHocKy === hk) {
        soTinChiDaDat += item.soTinChi;
        
      }
    });
    soTinChiDaDat += soTinChi;
    console.log("Số tín chỉ đã đạt: ", soTinChiDaDat);
    if (soTinChiDaDat > 30) {
      return res.json({message: "Số tín chỉ vượt quá 30"});
    }
    else {
      return res.json({message: "Số tín chỉ hợp lệ"});
    }
  } catch (error) {
    console.error('Error:', error);
    return res.json({message: "Check number credit failed"});
  }
}

exports.sendMail = async (req, res) => {

  const  email  = req.body.email;
  const  subject  = req.body.subject;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
     host: 'smtp.gmail.com',
     port: 465,
     secure: true,
    auth: {
      user: 'secommunity.fit.iuh@gmail.com',
      pass: 'ozyx imoc xyto dkyv',
    },
  });
  let mailOptions = {
    from: 'cudang123456789@gmail.com', // Địa chỉ email của bạn
    to: 'cudang123456789@gmail.com', // Địa chỉ email của người nhận
    subject: 'Confirm register', // Tiêu đề email
    text: subject, // Nội dung văn bản của email
    // html: '<h1>Hello world!</h1>' // Nội dung HTML của email (nếu bạn muốn gửi HTML)
  };  
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  return res.json({message: "Send mail success"});
}