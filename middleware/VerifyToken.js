import jwt from 'jsonwebtoken';

export const verifyToken = (req,res,next) => {
    const header = req.get('Authorization');
    if (header) {
       const token = header.split(" ")[1];
        jwt.verify(token,'hello1234',(error,payload)=>{
            if (error) {
                res.status(401).send({message:'Token is invalid'});
            }
            else{
                console.log(payload);
                console.log(payload.userId);
                next();
            }
        });
    }
    else{
        res.status(401).send({message:'Token is missing'});
    }
}


export const getLogInId = (req) => {
    return new Promise((resolve, reject) => {
        const header = req.get('Authorization');
        if (header) {
            const token = header.split(" ")[1];
            jwt.verify(token, 'hello1234', (error, payload) => {
                if (error) {
                    reject({ status: 401, message: 'User is invalid' });
                } else {
                    resolve(payload.userId);
                }
            });
        } else {
            reject({ status: 401, message: 'User is missing' });
        }
    });
};
// export const getLogInId = (req,res)=>{
//     const header = req.get('Authorization');
//     if (header) {
//        const token = header.split(" ")[1];
//         jwt.verify(token,'hello1234',(error,payload)=>{
//             if (error) {
//                 res.status(401).send({message:'User is invalid'});
//                 return false;
//             }
//             else{
//                 console.log(payload);
//                 return payload.userId;
//                 // next();
//             }
//         });
//     }
//     else{
//         res.status(401).send({message:'User is missing'});
//         return false;
//     }
// }
// export const checkUser = (req,res,next)=>{

// }