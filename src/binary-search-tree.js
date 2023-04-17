const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

class BinarySearchTree {
  constructor() {
    this.mem = null;
  }

  root() {
    return this.mem;
  }

  add(data) {
    this.mem = addWithin(this.mem, data);

    function addWithin(node, data) {
      if (!node) {
        return new Node(data);
      }

      if (node.data === data) {
        return node;
      }

      if (data < node.data) {
        node.left = addWithin(node.left, data);
      } else {
        node.right = addWithin(node.right, data);
      }
      return node;
    }
  }

  has(data) {
    if (this.find(data)) return true;
    else return false;
  }

  find(data) {
    let current = this.mem;
    while (current.data !== data) {
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
      if (current === null) {
        return null;
      }
    }
    return current;
  }

  remove(data) {
    this.mem = removeRoot(this.mem, data);

    function removeRoot(currentNode, data) {
      if (!currentNode) return null;

      if (data > currentNode.data) {
        currentNode.right = removeRoot(currentNode.right, data);
      } else if (data < currentNode.data) {
        currentNode.left = removeRoot(currentNode.left, data);
      } else {
        if (!currentNode.left) {
          return currentNode.right;
        } else if (!currentNode.right) {
          return currentNode.left;
        } else {
          let minValue = currentNode.right;
          while (minValue.left) {
            minValue = minValue.left;
          }
          currentNode.data = minValue.data;
          currentNode.right = removeRoot(currentNode.right, minValue.data);
        }
      }
      return currentNode;
    }
  }

  min() {
    if (!this.mem) return this.mem;

    let currentNode = this.mem;

    while (true) {
      if (currentNode.left) currentNode = currentNode.left;
      else return currentNode.data;
    }
  }

  max() {
    if (!this.mem) return this.mem;

    let currentNode = this.mem;

    while (true) {
      if (currentNode.right) currentNode = currentNode.right;
      else return currentNode.data;
    }
  }
}

module.exports = {
  BinarySearchTree,
};
