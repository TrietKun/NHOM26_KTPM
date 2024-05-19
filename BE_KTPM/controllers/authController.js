
const Account = require('../models/Account');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword; // Trả về giá trị hash dưới dạng chuỗi
}

async function comparePassword(plaintextPassword, hash) {
  const result = await bcrypt.compare(plaintextPassword, hash);
  return result;
}

exports.showRegister = (req, res) => {
  res.render('register');
};

exports.register = async (req, res) => {
  try {
    const { mssv, password } = req.body;
    const hashedPassword = await hashPassword(password); // Khai báo và gán giá trị cho hashedPassword
    const newAccount = new Account({ mssv: mssv, password: hashedPassword });
    await newAccount.save();
    // res.redirect('/');
    return res.json({message: "Register success"});
  } catch (error) {
    console.error('Error:', error);
    // res.redirect('/auth/register');
    return res.json({message: "Register failed"});
  }
};



exports.showLogin = (req, res) => {
  res.render('login');
};

exports.login = async (req, res) => {
    const { mssv, password } = req.body;
    try {
      const account = await Account.findOne({ mssv : mssv});
      if (account && account.validPassword(password)) {
        req.session.account = account;
        console.log("User:",account);
        console.log("Session:",req.session.account);
        console.log("Login success");
        const user = await User.findOne({ mssv : mssv});
        console.log("User:",user);
        // res.redirect('/');
        return res.json({message: "Login success", data : user});
      } else {
        // res.redirect('/auth/login');
        console.log("Login failed");
        return res.json({message: "Login failed"});
      }
    } catch (err) {
      console.error(err);
      // res.redirect('/auth/login');
      return res.json({message: "Login failedd"});
    }
  };

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

//find user by mssv
exports.findUser = async (req, res) => {
  const { mssv } = req.body;
  console.log("mssv:",mssv);
  try {
    const user = await User.findOne({ mssv });
    return res.json({message: "Find user success", data: user});
  } catch (error) {
    console.error('Error:', error);
    return res.json({message: "Find user failed"});
  }
};