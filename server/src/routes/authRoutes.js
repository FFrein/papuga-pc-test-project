const {Router} = require('express');
const {body} = require('express-validator');
const router = new Router();

const authMiddleware = require('../middlewares/auth-middlewate');
const userController = require('../controllers/user-controller')

router.post('/logout',userController.logout);
router.get('/users', userController.getUsers);//админский роут
router.post('/banuser', userController.banStatus);//админский роут

//CPU
const CPUController = require('../controllers/cpu-controller');
router.post('/cpu', CPUController.createCPU);   
router.put('/cpu', CPUController.updateCPU);
router.delete('/cpu/:Name', CPUController.deleteCPU);

//GPU
const GPUController = require('../controllers/gpu-controller');
router.post('/gpu',GPUController.createGPU);
router.put('/gpu', GPUController.updateGPU);
router.delete('/gpu/:Name', GPUController.deleteGPU);

//Motherboards
const MTHRBRDController = require('../controllers/motherboard-controller');
router.post('/motherboard',MTHRBRDController.createMotherboard);
router.put('/motherboard', MTHRBRDController.updateMotherboard);
router.delete('/motherboard/:Name', MTHRBRDController.deleteMotherboard);

//PC
const PCController = require('../controllers/pc-controller');
router.post('/pc', authMiddleware,PCController.createPC);
router.put('/pc',authMiddleware, PCController.updatePC);
router.delete('/pc/:pcId',authMiddleware, PCController.deletePC);

//Reviews
const ReviewsController = require('../controllers/review-controller');
router.post('/review',
body('Text').trim(' ').isLength({min:6, max:255}),
ReviewsController.createReview);
//router.put('/review', ReviewsController.updateReview);
router.delete('/review/:id', ReviewsController.deleteReview);

module.exports = router;