const cloudinary = require('cloudinary').v2;

const CLOUDINARY_BASE_URL="https://res.cloudinary.com/valonsaidi/image/upload/"
          
cloudinary.config({ 
  cloud_name: 'valonsaidi', 
  api_key: '561292783227646', 
  api_secret: process.env.CLOUDINARY_SECRET_KEY 
});


  exports.fileUploadCloudinary = async (req, res) => {
    try {
        const bufferData = req.data
        console.log(req);
        // const bufferData = req.files.photo.data
    
        // Upload the Buffer as an image
        const result = await cloudinary.uploader.upload_stream(
          {
            resource_type: 'image',
          //   folder: 'your_folder_name', // Optional: Replace with your desired folder name
          },
          (error, result) => {
            if (error) {
              console.error('Error uploading image:', error);
            } else {
              console.log('Upload result:', result);
              // The uploaded image details will be available in the 'result' object.
            }
          }
        );
    
        // Write the Buffer data to the stream
        result.end(bufferData);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };


    