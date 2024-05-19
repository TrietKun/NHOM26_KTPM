const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const accounts = new Schema({
  mssv: String,
  password: String,
});

accounts.methods.hashPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword; // Trả về giá trị hash dưới dạng chuỗi
};

accounts.methods.generateHash = function(password) {
    console.log("Password:", bcrypt.genSaltSync(8));
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

accounts.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

accounts.statics.findUser = function(mssv) {
  return this.findOne({ mssv });
}

//tạo 1 account mới

const Account = mongoose.model('Account', accounts);

module.exports = Account;
