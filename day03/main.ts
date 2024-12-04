const txt: string = await Deno.readTextFile('./input.txt');

//correct answer is 173529487
console.log(`Part one answer: ${calculatePartOne(txt)}`);
//Correct answer is 99532691
console.log(`Part two answer: ${calculatePartTwo(txt)}`);

function calculatePartOne(input: string): number {
    const allMultiplications: RegExpExecArray[] = [...input.matchAll(/(mul)\(([0-9]{1,3}),([0-9]{1,3})\)/g)];

    return allMultiplications.map(match => {
        return Number(match[2]) * Number(match[3]);
    }).reduce((a, b) => a + b);
}

function calculatePartTwo(input: string): number {
    const allMultiplications: string | undefined = input
        .match(/(?<=do\(\))(.*?)(?=don't\(\))|(?<!\n)(^(.*?)(?=don't\(\)))|(?<=do\(\))(.*?$)/gs)
        ?.join('');

    return calculatePartOne(allMultiplications ?? '');
}