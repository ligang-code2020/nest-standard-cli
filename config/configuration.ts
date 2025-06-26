import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = `${process.env.NODE_ENV}.yaml`;
console.log('YAML_CONFIG_FILENAME', YAML_CONFIG_FILENAME);
const path = join(__dirname, YAML_CONFIG_FILENAME);
console.log('Loading config from:', path);

export default () => {
  return yaml.load(
    readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'),
  ) as Record<string, any>;
};
