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

    insert(value, root = this.root) {
        if (root === null) {
            return root = new Node(value);
        } else if (value < root.data) {
            root.left = this.insert(value, root.left)
        } else if (value > root.data) {
            root.right = this.insert(value, root.right)
        }
        return root;
    }

    deleteItem(value, root = this.root) {
        if (root === null) {
            return root;
        }

        if (value < root.data) {
            root.left = this.deleteItem(value, root.left);
        } else if (value > root.data) {
            root.right = this.deleteItem(value, root.right);
        } else {
            if (root.left === null) {
                return root.right;
            } else if (root.right === null) {
                return root.left;
            }
            root.data = this.minValue(root.right);
            root.right = this.deleteItem(root.data, root.right)
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
        let tempRoot = this.root;
        if (tempRoot === null) return null;
        if (tempRoot.data === value) {
            return tempRoot;
        } else {
            while (tempRoot !== null && tempRoot.data !== value) {
                if (tempRoot.right !== null && tempRoot.data < value) {
                    tempRoot = tempRoot.right;
                } else if (tempRoot.left !== null && tempRoot.data > value) {
                    tempRoot = tempRoot.left;
                } else return null;
            }
            return tempRoot;
        }
    }

    levelOrder(callback) { //breadth first iterative
        if (this.root === null) return null;
        let queueArray = [this.root];
        let bfsDataArray = new Array;
        while (queueArray.length > 0) {
            let dequeuedElement = queueArray.shift();
            bfsDataArray.push(dequeuedElement.data);
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
        if (callback === undefined) {
            return bfsDataArray;
        }
    }

    inOrder(callback, inOrderArray = [], root = this.root) { //depth first inorder
        if (root === null) return null;
        this.inOrder(callback, inOrderArray, root.left);
        inOrderArray.push(root.data);
        if (callback) callback(root);
        this.inOrder(callback, inOrderArray, root.right);
        if (!callback) return inOrderArray; //return array of values in numerical order. also used in rebalance()
    }

    postOrder(callback, postOrderArray = [], root = this.root) { //depth first postorder
        if (root === null) return null;
        postOrderArray.push(root.data);
        if (callback) callback(root);
        this.postOrder(callback, postOrderArray, root.left);
        this.postOrder(callback, postOrderArray, root.right);
        if (!callback) return postOrderArray;
    }

    preOrder(callback, preOrderArray = [], root = this.root) { //depth first preorder
        if (root === null) return null;
        this.preOrder(callback, preOrderArray, root.left);
        this.preOrder(callback, preOrderArray, root.right)
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

    isBalanced(root = this.root) {
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
        orderedArray = this.inOrder(); 
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

//dev tests:
// console.log(balancedBST.root)
// prettyPrint(balancedBST.root)
// balancedBST.insert(8) //insert 8
// balancedBST.deleteItem(5) //remove 5
// console.log(balancedBST.find(6)) //find 6 ???finding 6 removes my array?
// console.log(balancedBST.levelOrder(printEachData)) //breadth first level order
// console.log(balancedBST.inOrder(balancedBST.root, array = []))
// console.log(balancedBST.postOrder())
// console.log(balancedBST.preOrder());
// console.log(balancedBST.height(6))
// console.log(balancedBST.depth(2))
// console.log(balancedBST.isBalanced(balancedBST.root));
// console.log(balancedBST.rebalance());
// prettyPrint(balancedBST.root)
// console.log(balancedBST.root)
// console.log(balancedBST.isBalanced(balancedBST.root));

function generateUniqueRandomNumbers(thisManyNumbers) {
    const numbers = new Set();
    while (numbers.size < thisManyNumbers) {
        numbers.add(Math.floor(Math.random()* thisManyNumbers));
    }
    let uniqueRandomNumbersArray = [...numbers];
    return uniqueRandomNumbersArray;
}

function compareNumbers(a, b) {
    return a - b;
}

//final tests:
let randomArray40 = generateUniqueRandomNumbers(100);
let newBST = new Tree(randomArray40); // 1. create new BST from rand array
console.log(newBST.rebalance())
console.log(newBST.insert(102))
console.log(newBST.deleteItem(5))
// console.log(newBST.insert(103))
// console.log(newBST.insert(104)) //4. unbalance the tree
console.log(newBST.isBalanced()) //5. isBalanced = false
console.log(newBST.rebalance()) //6. rebalance the tree

console.log(newBST.root)
prettyPrint(newBST.root)

console.log(newBST.isBalanced()) //2. 7. isBalanced = true
console.log(newBST.levelOrder()) //3. 8. breadth first level order
console.log(newBST.inOrder(printEachData)) //3. 8. depth inorder
console.log(newBST.postOrder()) //3. 8. postorder
console.log(newBST.preOrder()); //3. 8. preorder