const {Router} = require('express');
const {body} = require('express-validator');
const router = new Router();

const authMiddleware = require('../middlewares/auth-middlewate');
const userController = require('../controllers/user-controller')


router.post('/registration',
    body('email').isEmail(),
    body('password').trim(' ').isLength({min:6, max:24}),
    userController.registration);
router.get('/activate/:link',userController.activate);
router.post('/login',userController.login);
router.get('/refresh',userController.refresh);

//CPU
const CPUController = require('../controllers/cpu-controller');
router.get('/cpus',CPUController.getCPUs);


//GPU
const GPUController = require('../controllers/gpu-controller');
router.get('/gpus',GPUController.getGPUs);


//Motherboards
const MTHRBRDController = require('../controllers/motherboard-controller');
router.get('/motherboards',MTHRBRDController.getMotherboards);


//PC
const PCController = require('../controllers/pc-controller');
router.get('/pcs',PCController.getPCs);
router.get('/userpcs/:author',PCController.getUserPCs);
router.get('/publishedpcs',PCController.getPublishedPCs);
router.get('/pc/:id',PCController.getCurrentPC);

//Reviews
const ReviewsController = require('../controllers/review-controller');
router.get('/reviews',ReviewsController.getReviews);
router.get('/userreviews/:user/:page',ReviewsController.getUserReviews);
router.get('/pcreviews/:id',ReviewsController.getPcReviews);


module.exports = router;