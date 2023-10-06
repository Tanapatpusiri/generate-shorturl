// const express = require('express')
// const router = express.Router()
// const ShortUrl = require('../ShortURL');
// const cors = require('cors');

// router.use(express.json());



// function generateShortUrl() {
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   const shortUrlLength = 6; // ยาว Short URL ตามต้องการ
//   let shortUrl = '';

//   for (let i = 0; i < shortUrlLength; i++) {
//     const randomIndex = Math.floor(Math.random() * characters.length);
//     shortUrl += characters.charAt(randomIndex);
//   }

//   return shortUrl;
// }

// router.post('/shorten', async (req, res) => {
//   try {
//     const { fullUrl } = req.body;
//     const shortUrl = generateShortUrl(); // สร้าง short URL ที่ไม่ซ้ำกัน
//     const newShortUrl = new ShortUrl({
//       fullUrl,
//       shortUrl,
//     });
//     await newShortUrl.save();
//     res.json(newShortUrl);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสร้าง Short URL' });
//   }
// });




// router.get('/',(req,res) =>{
//     res.json({message:'ok'})
//   })

//   router.get('/short', (req, res) => {
//     ShortUrl.find({}).then((short) => res.json(short))
//   });


// const corsOptions = {
//   origin: '*', // ระบุ * เพื่ออนุญาตให้ทุกโดเมนเรียกใช้งาน
//   methods: ['GET', 'OPTIONS', 'POST'], // ระบุ HTTP methods ที่อนุญาต
// };

// router.use(cors(corsOptions));

// module.exports = router;