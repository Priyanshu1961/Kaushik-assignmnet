

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

export {File};
