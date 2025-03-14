// multer.js
import multer from "multer";

// Set storage and configuration
const storage = multer.memoryStorage();
const singleUpload = multer({ storage }).single("image"); // Make sure 'image' matches the key in the Postman request

// Export the singleUpload middleware
export { singleUpload };
