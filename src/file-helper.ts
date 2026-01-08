import * as path from 'path';
import { getFormattedDate } from './date-helper';

export function buildOutputFilename(source: string): string {
  const extname = path.extname(source);
  const basename = path.basename(source, extname);
  const currentDateTime = getFormattedDate().replace(/[: ]/g, '-');
  return `${basename}-${currentDateTime}.pdf`;
}
