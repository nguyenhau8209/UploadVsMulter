const express = require('express')
const app = express()
const port = 3030
const bodyParser = require('body-parser')
const multer = require('multer');
const fs = require('fs');
const { error } = require('console');
app.use(bodyParser.urlencoded({ extended: true }))

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var dir = './uploads';

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const tenGoc = file.originalname;
        arr = tenGoc.split('.');

        let newFileName = '';
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == 'jpeg') {
                if (i != arr.length - 1) {
                    newFileName += arr[i];
                    console.log(newFileName);
                } else {
                    newFileName += ('-' + Date.now() + '.' + arr[i]);
                    console.log(newFileName + " Hehe");
                }
            }else{
                if (i != arr.length - 1) {
                    newFileName += 'jpeg';
                    console.log(newFileName);
                } else {
                    newFileName += ('-' + Date.now() + '.' + 'jpeg');
                    console.log(newFileName + " Hehe");
                }
            }

        }


        cb(null, newFileName)
    }
})


// var upload = multer({ storage: storage, limits:{fileSize: 1*1024*1024} })

// app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
//     const file = req.file
//     if (!file) {
//         const error = new Error('Please upload a file')
//         error.httpStatusCode = 400
//         return next(error)
//     }
//     else if(file.size > fileSize){
//         const error = new Error('Không > 1MB')
//         error.httpStatusCode = 400
//         return next(error)
//     }
//     res.send(file)
// })

//Uploading multiple files

var upload = multer({ storage: storage, limits:{fileSize: 1*1024*1024} });
var upload = upload.single('myFile');
app.post('/uploadfile', function (req, res) {
    upload(req, res, function (err) {
        const files = req.file;
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return res.send('file khong duoc > 1MB');
      } else if (!files) {
        // An unknown error occurred when uploading.
        return res.send('Ban chua chon file');
      } else
      return res.send(files)
      // Everything went fine.
    })
  })
var upload1 = multer({ storage: storage, limits:{fileSize: 1*1024*1024} })
app.post('/uploadmultiple', upload1.array('myFiles', 12), (req, res, next) => {
    const files = req.files
    if (!files) {
        const error = new Error('Please choose files')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(files)
}) 



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});