import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import Exception from 'src/exceptions/exceptions';
@Injectable()
export class FilesService {
  async createFile(file: any): Promise<string> {
    try {
      const fileName = uuidv4() + '.jpg';
      const filePath = path.resolve(__dirname, '..', 'static');
      const isFileAlreadyExists = this.fileExists(filePath);
      if (isFileAlreadyExists) {
        await fs.promises.mkdir(filePath, { recursive: true });
      }
      fs.promises.writeFile(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (error) {
      throw new Exception.UndefinedServerErrorException('on file creation');
    }
  }

  private async fileExists(path: string): Promise<boolean> {
    //Promise resolve, reject - переделать
    try {
      await fs.promises.access(path);
      return true;
    } catch {
      return false;
    }
  }
}
