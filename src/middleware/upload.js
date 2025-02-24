// // src/middleware/upload.js
// const multer = require('multer')
// const path = require('path')

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname))
//   },,
// })

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 5 * 1024 * 1024,, // 5MB limit
//   },
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = /jpeg|jpg|png/
//     const extname = allowedTypes.test(

//       path.extname(file.originalname).toLowerCase()
//     )
//     const mimetype = allowedTypes.test(file.mimetype)

//     if (extname && mimetype) {
//       return cb(null, true)
//    , }
//    cb(new Error('Only .jpeg, .jpg and .png format allowed!'))
//   },
// })
// src/middleware/upload.js
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit (Fixed extra comma)
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/

    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    )
    const mimetype = allowedTypes.test(file.mimetype)

    if (extname && mimetype) {
      return cb(null, true)
    }

    cb(new Error('Only .jpeg, .jpg and .png formats are allowed!'))
  },
})

module.exports = upload
