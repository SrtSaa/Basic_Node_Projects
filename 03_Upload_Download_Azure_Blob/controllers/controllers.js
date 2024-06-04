require('dotenv').config();
const azureStorage = require('azure-storage');
const intoStream = require('into-stream');
const path = require('path');
let { username } = require('os').userInfo();


// required variables
const dirname = path.resolve("./");
const containerName = process.env.AZURE_CONTAINER_NAME;
const blobService = azureStorage.createBlobService(
    process.env.AZURE_STORAGE_CONNECTION_STRING
);



// render index.html
const show = (req, res) => {
    res.sendFile(path.join(dirname, "index.html"));
};


// file upload
const blobupload = async (req, res) => {
    if (!req.files) {
        return res.status(400).send("No files are received.");
    }

    const timestamp = Date.now()
    const blobName = `${timestamp}-${req.files.file.name}`;

    const stream = intoStream(req.files.file.data);
    const streamLength = req.files.file.data.length;

    blobService.createBlockBlobFromStream(
        containerName,
        blobName,
        stream,
        streamLength,
        (err) => {
            if (err) {
                return res.status(500).send({ message: "Error Occured" });
            }

            res.status(201).send({ message: 'File Uploaded Successfully' });
        }
    );
};


// file download
const blobdownload = (req, res) => {
    // give the file name
    const sourcefile = "1708601849759-admit.pdf";
    const destinationfilepath = path.join("C:/Users",username,"Downloads",sourcefile);
    
    blobService.getBlobToLocalFile(
        containerName, 
        sourcefile, 
        destinationfilepath, 
        (err) => {
            if (err) {
                return res.status(500).send({ message: "Error Occured" });
            }

            res.status(200).send({ message: 'File Downloaded Successfully' });
        }
    );
};








module.exports = {
    show,
    blobupload,
    blobdownload
}