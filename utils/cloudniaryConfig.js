import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dypjn6ulg",
  api_key: "838128313369916",
  api_secret: "YjXVTnK_ecIZpoH8URSOhG43coM",
  //   secure_distribution: 'mydomain.com',
  //   upload_prefix: 'myprefix.com'
});

export default cloudinary;
