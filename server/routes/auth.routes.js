const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')
const Router = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const config = require('config')

async function checkUser(email, returnUser = false) {
  const isExist = await UserModel.find({email: email});
  return returnUser ? {isExist: !!isExist.length, user: isExist[0]} : !!isExist.length;
}

// check if user email exist
// get email: string
router.get(
  '/checkUser',
  async (req, res) => {
    const isExist = await checkUser(req.query.email);
    res.status(201).json({
      isExist
    })
  }
);

// register
// post UserSchema
router.post(
  '/register',
  async (req, res) => {
    const isExist = await checkUser(req.body.email);
    const user = req.body;
    if (isExist) {
      res.status(201).json({
        isExist, message: 'Пользователь с такой почтой уже зарегистрирован!'
      })
    } else {
      if (user && user.email && user.password) {
        const hashedPass = await bcrypt.hash(user.password, 12)
        const addUser = new UserModel({...user, password: hashedPass})
        await addUser.save()
        res.status(201).json({message: 'Пользователь создан', user})
      } else {
        res.status(201).json({message: 'Введите пароль!'})
      }
    }
  }
);

// auth
// post email: string, password: string
router.post(
  '/auth',
  async (req, res) => {
    if (!req.body.email) {
      res.status(201).json({message: 'Нужна электронная почта!'});
      return;
    }
    const isExist = await checkUser(req.body.email, true);
    const user = req.body;
    if (isExist.isExist) {
      if (user.email && user.password) {
        const isPassMatch = await bcrypt.compare(user.password, isExist.user.password)
        if (isPassMatch) {
          const token = jwt.sign(
            {email: user.email},
            config.get('jwtSecret'),
            {expiresIn: '72h'}
          )
          res.status(201).json({email: user.email, token})
        } else {
          res.status(201).json({auth: false, email: user.email})
        }
      } else {
        res.status(201).json({message: 'Требуются логин и пароль!!'})
      }
    } else {
      res.status(201).json({message: 'Пользователя не существует!'})
    }
  }
);

// check if user auth
// post token: string
router.post(
  '/isAuth',
  async (req, res) => {
    jwt.verify(req.body.token, config.get('jwtSecret'), (err, decoded) => {
      if(err) {
        res.status(201).json({message: 'Токен-ошибка! Нужно перезайти.', token: req.body.token, err: err, decoded: decoded});
      }
      if (decoded) {
        res.status(201).json({message: 'Вижу токен и он в порядке!', token: req.body.token, err: err, decoded: decoded});
      }
    });
  }
);


module.exports = router
