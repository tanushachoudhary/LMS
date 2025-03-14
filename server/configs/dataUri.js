import DataUriParser from "datauri/parser";
import path from "path";

const getDataUri = (file) => {
  const parser = new DataUriParser();
  return parser.format(path.extname(file.originalname).toString(), file.buffer);
};

export default getDataUri;
