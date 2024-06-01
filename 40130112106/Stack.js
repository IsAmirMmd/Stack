class Stack {
    constructor() {
        this.items = [];
    }

    push(item) {
        this.items.push(item);
    }

    isEmpty() {
        return this.items.length === 0;
    }

    pop() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.pop();
    }

    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[this.items.length - 1];
    }

    size() {
        return this.items.length;
    }

    getMax() {
        let maxIndex = 0;
        for (let i = 0; i < this.size(); i++) {
            if (this.items[i] > this.items[maxIndex]) {
                maxIndex = i;
            }
        }
        return this.items[maxIndex];
    }
}

function reverseString(inputString) {
    const s = new Stack();
    for (const char of inputString) {
        s.push(char);
    }

    let reversedString = '';
    while (!s.isEmpty()) {
        reversedString += s.pop();
    }

    return reversedString;
}

function isOperator(char) {
    return '*-+/^'.includes(char);
}

function evaluatePostfix(expression) {
    const s = new Stack();
    for (const char of expression.split(' ')) {
        if (isOperator(char)) {
            const operand2 = s.pop();
            const operand1 = s.pop();
            let result = null;
            switch (char) {
                case '*':
                    result = operand1 * operand2;
                    break;
                case '-':
                    result = operand1 - operand2;
                    break;
                case '+':
                    result = operand1 + operand2;
                    break;
                case '/':
                    if (operand2 === 0) {
                        throw new Error("Division by zero");
                    }
                    result = operand1 / operand2;
                    break;
                case '^':
                    result = Math.pow(operand1, operand2);
                    break;
            }
            s.push(result);
        } else {
            s.push(parseInt(char, 10));
        }
    }

    return s.pop();
}

function isBalanced(expression) {
    const matching = {')': '(', '}': '{', ']': '['};
    const s = new Stack();
    for (const char of expression) {
        if (Object.values(matching).includes(char)) {
            s.push(char);
        } else if (Object.keys(matching).includes(char)) {
            if (s.isEmpty() || matching[char] !== s.pop()) {
                return false;
            }
        }
    }
    return s.isEmpty();
}

function prefixToPostfix(expression) {
    const s = new Stack();
    for (const char of expression.split(' ').reverse()) {
        if (isOperator(char)) {
            const operand1 = s.pop();
            const operand2 = s.pop();
            const postExp = operand1 + " " + operand2 + " " + char;
            s.push(postExp);
        } else {
            s.push(char);
        }
    }
    return s.pop();
}

function sortStack(stack) {
    const tempStack = new Stack();
    while (!stack.isEmpty()) {
        const temp = stack.pop();
        while (!tempStack.isEmpty() && temp < tempStack.peek()) {
            stack.push(tempStack.pop());
        }
        tempStack.push(temp);
    }
    while (!tempStack.isEmpty()) {
        stack.push(tempStack.pop());
    }
    return stack;
}

function precedence(op) {
    if (op === '+' || op === '-') {
        return 1;
    }
    if (op === '*' || op === '/') {
        return 2;
    }
    return 0;
}

function infixToPostfix(expression) {
    const output = [];
    const stack = new Stack();
    const charArray = expression.split(' ');

    for (const char of charArray) {
        if (char === '(') {
            stack.push(char);
        } else if (char === ')') {
            while (!stack.isEmpty() && stack.peek() !== '(') {
                output.push(stack.pop());
            }
            stack.pop();
        } else if (isOperator(char)) {
            while (!stack.isEmpty() && (precedence(stack.peek()) >= precedence(char))) {
                output.push(stack.pop());
            }
            stack.push(char);
        } else {
            output.push(char);
        }
    }

    while (!stack.isEmpty()) {
        output.push(stack.pop());
    }

    return output.join(' ');
}

function dailyTemperatures(temperatures) {
    const n = temperatures.length;
    const result = Array(n).fill(0);
    const stack = new Stack();

    temperatures.forEach((currentTemp, i) => {
        while (!stack.isEmpty() && temperatures[stack.peek()] < currentTemp) {
            const index = stack.pop();
            result[index] = i - index;
        }
        stack.push(i);
    });

    return result;
}

function longestValidParentheses(str) {
    const stack = new Stack();
    stack.push(-1);
    let maxLength = 0;

    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (char === '(') {
            stack.push(i);
        } else {
            stack.pop();
            if (stack.isEmpty()) {
                stack.push(i);
            } else {
                maxLength = Math.max(maxLength, i - stack.peek());
            }
        }
    }

    return maxLength;
}
