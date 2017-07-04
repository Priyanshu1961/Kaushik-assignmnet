import { cur_root, paths } from './app.js'

class File {
  constructor(name, extension, parent) {
    this.name = name;
    this.extension = extension
    this.parent = parent;
    this.type = 'file';
    this.path = `${cur_root.path}/${name}.${extension}`;
    paths[this.path] = this;
  }
}

export { File };
// export {cur_root, paths }
