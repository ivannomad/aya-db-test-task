import fs from "fs";
import YAML from "yaml";

const file = fs.readFileSync('src/spec/api.yml', 'utf-8');
const swaggerSpec = YAML.parse(file);

export default swaggerSpec;