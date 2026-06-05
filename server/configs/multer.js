import multer from 'multer'

//For uploading background image
const storage = multer.diskStorage({});

const upload = multer({storage})
export default upload