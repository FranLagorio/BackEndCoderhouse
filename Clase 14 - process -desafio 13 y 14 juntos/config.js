import parseArgs from "minimist";
import * as dotenv from "dotenv";

const args = parseArgs(process.argv.slice(2));
dotenv.config();

export const PORT = args.PORT || process.env.PORT || 8080;
