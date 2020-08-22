let queueFactory = function(input) {
    const arr = input ? [...input]: [];

    return {
        pop: () => {
            return arr.shift();
        },
        push: (n) => {
            arr.push(n);
        },
        print: () => {
            console.log(arr);
        },
        clear: () => {
            arr = [];
        },
        length: () => {
            return arr.length;
        }
    }
};

// let q = queueFactory([1,2,3]);

export default queueFactory;