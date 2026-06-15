import Router from 'express';
import * as fileController from './controller.js'
import { upload } from '../../middleware/upload.js';
import { verifyUser } from '../../middleware/verifyUser.js';


const router = Router();

router.post('/upload', verifyUser, upload.array('files', 10), fileController.uploadFiles);
router.get('/', verifyUser, fileController.getAllUserStudyMaterials)
router.get('/:id', verifyUser, fileController.getMaterialById)  
export default router;