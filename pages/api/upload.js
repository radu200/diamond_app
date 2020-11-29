import { fileHandler, requestHandler } from "./utils/index";
const fs = require("fs");

export const config = {
  api: {
    bodyParser: false,
  },
};

const unlikFileHandler = function (err) {
  if (err) {
    console.log("unlink failed", err);
  } else {
    console.log("file deleted");
  }
};

export default async (req, res) => {
  try {
    const url = "https://api.anonymousfiles.io?expires=1h";
    const file = await fileHandler(req, res);
    const file_path = file.path;
    const data = fs.createReadStream(file_path);

    const formData = {
      file: data,
    };

    const { result } = await requestHandler(url, formData);

    if (result.statusCode === 201) {
      fs.unlink(file_path, unlikFileHandler);
      return res.status(200).json({ msg: "Success", result: result.body });
    }

    return res.status(400).json({ msg: "Bad Request" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Err" });
  }
};
