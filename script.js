class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array = []) {
        this.root = this.buildTree(array, 0, array.length - 1);
    }

    buildTree(array = [], start, end) {
        array.sort(compareNumbers);
        if (start > end) {
            return null;
        }

        let mid = parseInt((start + end) / 2);
        let newNode = new Node(array[mid]);

        newNode.left = this.buildTree(array, start, mid - 1);
        newNode.right = this.buildTree(array, mid + 1, end);
        return newNode;
    }

    insert(root, value) {
        if (root === null) {
            root = new Node(value);
        } else if (value < root.data) {
            root.left = this.insert(root.left, value)
        } else if (value > root.data) {
            root.right = this.insert(root.right, value)
        }
        return root;
    }

    deleteItem(root, value) {
        if (root === null) {
            return root;
        }

        if (value < root.data) {
            root.left = this.deleteItem(root.left, value);
        } else if (value > root.data) {
            root.right = this.deleteItem(root.right, value);
        } else {
            if (root.left === null) {
                return root.right;
            } else if (root.right === null) {
                return root.left;
            }
            root.data = this.minValue(root.right);
            root.right = this.deleteItem(root.right, root.data)
        }
        return root;
    }

    minValue(node) {
        let minv = node.data;
        while (node.left !== null) {
            minv = node.left.data;
            node = node.left;
        }
        return minv;
    }

    find(value) { //iterative approach; make recursive after?
        if (this.root === null) return null;
        if (this.root.data === value) {
            return this.root;
        } else {
            while (this.root !== null && this.root.data !== value) {
                if (this.root.right !== null && this.root.data < value) {
                    this.root = this.root.right;
                } else if (this.root.left !== null && this.root.data > value) {
                    this.root = this.root.left;
                } else return null;
            }
            return this.root;
        }
    }

    levelOrder(callback) { //breadth first iterative
        if (this.root === null) return null;
        let queueArray = [this.root];
        let bfsDataArray = [];
        while (queueArray.length > 0) {
            let dequeuedElement = queueArray.shift();
            bfsDataArray += dequeuedElement.data;
            if (callback !== undefined) {
                callback(dequeuedElement);
            }
            if (dequeuedElement.left !== null) {
                queueArray.push(dequeuedElement.left);
            }
            if (dequeuedElement.right !== null) {
                queueArray.push(dequeuedElement.right);
            }
        }
        if (callback === undefined) return bfsDataArray;
    }

    inOrder(root, inOrderArray = [], callback) { //depth first inorder . can I do this without defining root every time I call function?
        if (root === null) return null;
        this.inOrder(root.left, inOrderArray, callback);
        inOrderArray.push(root.data);
        if (callback) callback(root);
        this.inOrder(root.right, inOrderArray, callback);
        if (!callback) return inOrderArray;
    }

    postOrder(root, postOrderArray = [], callback) { //depth first postorder
        if (root === null) return null;
        postOrderArray.push(root.data);
        if (callback) callback(root);
        this.postOrder(root.left, postOrderArray, callback);
        this.postOrder(root.right, postOrderArray, callback);
        if (!callback) return postOrderArray;
    }

    preOrder(root, preOrderArray = [], callback) { //depth first preorder
        if (root === null) return null;
        this.preOrder(root.left, preOrderArray, callback);
        this.preOrder(root.right, preOrderArray, callback)
        preOrderArray.push(root.data);
        if (callback) callback(root);
        if (!callback) return preOrderArray;
    }

    height(node) {
        if (typeof node === "number") {
            node = this.find(node);
        }
        if (node == null) return -1;
        let lh = this.height(node.left);
        let rh = this.height(node.right);
        if (lh > rh) return lh + 1;
        else return rh + 1;
    }

    depth(node) {
        if (this.root == null) return null;
        let currentRoot = this.root;
        if (typeof node === "number") {
            node = this.find(node);
        }
        let depthNr = 0;
        while (currentRoot != null && currentRoot.data != node.data) {
            if (currentRoot.right != null && currentRoot.data < node.data) {
                currentRoot = currentRoot.right;
                depthNr += 1;
            } else if (currentRoot.left != null && currentRoot.data > node.data) {
                currentRoot = currentRoot.left;
                depthNr += 1;
            }
        }
        return depthNr;
    }

    isBalanced(root) {
        if (root == null) return true;
        let lh = this.height(root.left);
        let rh = this.height(root.right);
        if (Math.abs(lh - rh) <= 1 && this.isBalanced(root.left) == true && this.isBalanced(root.right) == true) {
            return true
        }
        return false;
    }

    rebalance() {
        let orderedArray = [];
        orderedArray = this.inOrder(this.root, orderedArray); 
        this.root = this.buildTree(orderedArray, 0, orderedArray.length - 1);
        return this.root;
    }
}

let orderedArray = [7, 2, 6, 4, 3, 5, 1,0 ]
let balancedBST = new Tree(orderedArray)

function printEachData(node) {
    console.log(node.data)
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

console.log(balancedBST.root)
prettyPrint(balancedBST.root)
// balancedBST.insert(balancedBST.root, 8) //insert 8
// balancedBST.deleteItem(balancedBST.root, 5) //remove 5
// console.log(balancedBST.find(6)) //find 6 ???finding 6 removes my array?
console.log(balancedBST.levelOrder(printEachData)) //breadth first level order
// console.log(balancedBST.inOrder(balancedBST.root, array = []))
// console.log(balancedBST.postOrder(balancedBST.root, array = []))
// console.log(balancedBST.preOrder(balancedBST.root, array = [], printEachData));
// console.log(balancedBST.height(6))
// console.log(balancedBST.depth(2))
// console.log(balancedBST.isBalanced(balancedBST.root));
// console.log(balancedBST.rebalance());
prettyPrint(balancedBST.root)
console.log(balancedBST.root)

function generateUniqueRandomNumbers(thisManyNumbers) {
    const numbers = new Set();
    while (numbers.size < thisManyNumbers) {
        numbers.add(Math.floor(Math.random()* thisManyNumbers));
    }
    let uniqueRandomNumbersArray = [...numbers];
    return uniqueRandomNumbersArray;
}

// let randomArray40 = generateUniqueRandomNumbers(40);
// let newBST = new Tree(randomArray40); // 1. create new BST from rand array
// console.log(newBST.root)
// prettyPrint(newBST.root)

// console.log(newBST.isBalanced(newBST.root)) //2. isBalanced = true

function compareNumbers(a, b) {
    return a - b;
}