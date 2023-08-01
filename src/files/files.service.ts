import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { UndefinedServerErrorException } from 'src/exceptions/exceptions';

@Injectable()
export class FilesService {
  async createFile(file: any): Promise<string> {
    try {
      const fileName = uuidv4() + '.jpg';
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (error) {
      throw new UndefinedServerErrorException('on file creation');
    }
  }
}
