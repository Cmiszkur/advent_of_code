const txt: string = await Deno.readTextFile('./1/input.txt');
const arr: string[] = txt.split('\n');
//Delete last empty new line
arr.pop();

const arr1: number[] = [];
const arr2: number[] = [];

arr.forEach((item) => {
    const splitItem = item.split('   ');
    arr1.push(Number(splitItem[0]));
    arr2.push(Number(splitItem[1]));
});

// 1258579 is correct
console.log(calculatePartOne(arr1, arr2));
// 23981443 is correct
console.log(calculatePartTwo(arr1, arr2));

function calculatePartOne(arr1: number[], arr2: number[]): number {
    const copiedArr1 = [...arr1];
    const copiedArr2 = [...arr2];
    let distanceSum = 0;

    copiedArr1.sort();
    copiedArr2.sort();

    for (let i = 0; i < arr1.length; i++) {
        const smallestArr1 = copiedArr1[i];
        const smallestArr2 = copiedArr2[i];
        distanceSum += Math.abs(smallestArr1 - smallestArr2);
    }

    return distanceSum;
}

function calculatePartTwo(arr1: number[], arr2: number[]): number {
    let similaritySum = 0;

    for (let i = 0; i < arr1.length; i++) {
        const num = arr1[i];
        similaritySum += num * arr2.filter(v => v === num).length;
    }

    return similaritySum;
}