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
    
        let mid = parseInt((start + end) / 2);
        let newNode = new Node(array[mid]);

        newNode.left = this.buildTree(array, start, mid-1);
        newNode.right = this.buildTree(array, mid+1, end);
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

    find(value) { //iterative approach
        if (this.root === null) return null;
        if (this.root.data === value) {
            return this.root;
        } else {
            while (this.root !== null && this.root.data !== value) {
                if (this.root.right !== null && this.root.data <= value) {
                    this.root = this.root.right;
                } else if (this.root.left !== null && this.root.data >= value){
                    this.root = this.root.left;
                } else return null;
            }
            return this.root;
        }
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

// balancedBST.insert(balancedBST.root, 8) //insert 8
// prettyPrint(balancedBST.root)

// balancedBST.deleteItem(balancedBST.root, 5) //remove 5
// prettyPrint(balancedBST.root);

// deleteItem(3, 7) recursive delete walkthrough
// return 
// deleteItem(5, 7)
// return
// deleteItem(6, 7)
// root.right (7) = deleteItem(7, 7) = null
// return root = 6
// deleteItem(7,7)
// return null

console.log(balancedBST.find(6))