var express = require('express');
const app = express();
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs'); 
const Driver = require('../Schemas/driversSchema');
var mongoose = require('mongoose');


router.post('/register', async (req, res) => {
    var password = await req.body.password;

    const rounds = 10
    bcrypt.hash(password, rounds, (err, hash) => {
        if (err) {
            console.error(err)
            res.status(500).json("Error when Hashing")
        }
        req.body.password = hash
        var newDriver = new Driver(req.body);
        newDriver.save((err, docs) => {
            if (docs) {
                var token = jwt.sign({ docs }, 'secretkey', (err, token) => {
                    res.json({ token })
                });
            }
            else if (err) {
                console.log(err)
                res.status(500).json("Error when Inserting")
            }
        })
    })

})

router.post('/signin', async (req, res) => {
    var password = await req.body.password;
    Driver.find({mobile_no:req.body.mobile_no},(err,doc)=>{
        if(err){
            console.log(err)
        }else{
            if(doc.length==0){
                res.send("Mobile No Not Found");
            }else{
                var hash = doc[0]['password']
                var newDriverInfo = {
                    "first_name": doc[0]['first_name'],
                    "last_name": doc[0]['last_name'],
                    "mobile_no":doc[0]['mobile_no'],
                    "nic_no":doc[0]['nic_no'],
                    "nearest_eco_center":doc[0]['nearest_eco_center'],
                    "vehicle_color": doc[0]['nearest_eco_center'],
                    "vehicle_type":doc[0]['nearest_eco_center'],
                    "maximam_weight_can_carry":doc[0]['maximam_weight_can_carry'],
                    "profile_pic":doc[0]['profile_pic'],
                    "vehicle_plate_no":doc[0]['vehicle_plate_no'] 
                }
                bcrypt.compare(password, hash, (err, result) => {
                    if (err) {
                      console.error(err)
                      return
                    }
                    else{
                        if(result==true){
                            //delete doc[0]['password']
                            var token = jwt.sign({ newDriverInfo }, 'secretkey', (err, token) => {
                                res.json({ token,newDriverInfo })
                            });
                        }else{
                            res.json(500).send("Passwrod Wrong")
                        }
                    }
                  })
            }
        }
    })
})

router.get('/check', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', function (err, decoded) {
        res.send(decoded) // bar
    }


    )
}
)

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = router;