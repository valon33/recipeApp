const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'valonsaidi', 
  api_key: '561292783227646', 
  api_secret: process.env.CLOUDINARY_SECRET_KEY 
});


  exports.fileUploadCloudinary = async (req, res) => {
    try {
        const photoName = req.files.photo.name.split(".")[0]
        const bufferData = req.files.photo.data
    
        // Upload the Buffer as an image
        const result = await cloudinary.uploader.upload_stream(
          {
            resource_type: 'image',
            public_id: photoName
          },
          (error, result) => {
            if (error) {
              console.error('Error uploading image:', error);
            } else {
              console.log('Upload result:', result);
            }
          }
        );
    
        result.end(bufferData);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };
