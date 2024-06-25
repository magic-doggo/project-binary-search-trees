let newNode;

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}


class Tree {
    constructor(array = []) {
        this.root = this.buildTree(array, 0, array.length-1);
    }

    buildTree(array = [], start, end) {
        if (start > end) {
            return null;
        }
        // if (array.length === 0) {
        //     return null;
        // }
    
        let mid = parseInt((start + end) / 2);
        let newNode = new Node(array[mid]);

        newNode.left = this.buildTree(array, start, mid-1);
        newNode.right = this.buildTree(array, mid+1, end);
        return newNode;
    }
}

let orderedArray = [0, 1, 2, 3, 4, 5, 6, 7]
let balancedBST = new Tree(orderedArray)

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