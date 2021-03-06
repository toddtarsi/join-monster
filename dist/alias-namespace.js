'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _generatorics = require('generatorics');

var _generatorics2 = _interopRequireDefault(_generatorics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AliasNamespace {
  constructor(minify, dialect) {
    this.minify = !!minify;

    this.mininym = dialect === 'mssql' ? _generatorics2.default.baseNAll('abcdefghijklmnopqrstuvwxyz#$') : _generatorics2.default.baseNAll('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ#$');

    this.dialect = dialect;

    this.usedTableAliases = new Set();

    this.columnAssignments = {};
  }

  generate(type, name) {
    if (this.minify) {
      if (type === 'table') {
        return this.mininym.next().value.join('');
      }

      if (!this.columnAssignments[name]) {
        this.columnAssignments[name] = this.mininym.next().value.join('');
      }

      return this.columnAssignments[name];
    }

    if (type === 'column') {
      return name;
    }

    name = name.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '_').slice(0, 10);

    if (this.dialect === 'mssql') {
      name = name.toLowerCase();
    }

    while (this.usedTableAliases.has(name)) {
      name += '$';
    }
    this.usedTableAliases.add(name);
    return name;
  }
}
exports.default = AliasNamespace;