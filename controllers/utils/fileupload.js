var {Storage} = require('@google-cloud/storage')

// uploadFile();

class Upload{
    constructor(req,res){
        this.req = req;
        this.res = res;
    }
    firebasestorage= ()=>{

    }
    localstorage = ()=>{

    }
    // Testing out upload of file
    uploadFile = async(bucketName,fullfilepathname) => {
        // const keyPath = path.resolve("./key.json");
        const storage = new Storage({
            keyFilename: {
                apiKey: "AIzaSyBfertyvlc944FRk1k0xnZ4irbGiRXuimM",
                authDomain: "socializer-69de0.firebaseapp.com",
                databaseURL: "https://socializer-69de0-default-rtdb.firebaseio.com",
                projectId: "socializer-69de0",
                storageBucket: "socializer-69de0.appspot.com",
                messagingSenderId: "128820802833",
                appId: "1:128820802833:web:ba86c224372363e3b4c8b0",
                measurementId: "G-CBGE6ZN4L6"
              },
         });
        
        // Uploads a local file to the bucket
        return await storage.bucket(bucketName).upload(fullfilepathname, {
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true,
            // By setting the option `destination`, you can change the name of the
            // object you are uploading to a bucket.
            metadata: {
                // Enable long-lived HTTP caching headers
                // Use only if the contents of the file will never change
                // (If the contents will change, use cacheControl: 'no-cache')
                cacheControl: 'public, max-age=31536000',
            },
        });

        // console.log(`${filename} uploaded to ${bucketName}.`);
    }
}

module.exports= Upload