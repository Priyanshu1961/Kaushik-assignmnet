import {addToPaths} from './app'

class File {
  constructor(name, extension, parent) {
    this.name = name;
    this.extension = extension;
    this.parent = parent;
    this.type = 'file'
    this.path = `${parent.path}/${name}.${extension}`;
    addToPaths(this);
  }
}

export { File }
