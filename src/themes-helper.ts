import * as path from 'path';
import * as fs from 'fs';
import { DEFAULT_THEME } from './config';

const themesDirectory = path.join(__dirname, '..', 'themes');

export function displaySupportedThemes(): void {
  console.log('List of supported themes:');
  const files = fs.readdirSync(themesDirectory);
  files.forEach((theme) => {
    const name = theme.replace('.css', '');
    const value = name === DEFAULT_THEME ? `${name} (default)` : name;
    console.log(`- ${value}`);
  });
}
