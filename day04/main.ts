const txt: string = await Deno.readTextFile('./input.txt');
const rows: string[] = txt.split('\n');
const matrix: string[][] = rows.map(xLine => xLine.split(''));

console.log(`Part one answer: ${calculatePartOne(matrix)}`);
console.log(`Part two answer: ${calculatePartTwo(matrix)}`);

function calculatePartOne(matrix: string[][]): number {
    return checkHorizontally(matrix) + checkVertically(matrix) + checkDiagonallyDesc(matrix) + checkDiagonallyAsc(matrix);
}

function checkHorizontally(matrix: string[][]): number {
    const numberOfChecks = matrix[0].length - 4;
    let sum: number = 0;

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j <= numberOfChecks; j++) {
            const word = ([matrix[i][j], matrix[i][j + 1], matrix[i][j + 2], matrix[i][j + 3]]).join('');
            if (word === 'XMAS' || word === 'SAMX') {
                sum += 1;
            }
        }
    }

    return sum;
}

function checkVertically(matrix: string[][]): number {
    const numberOfChecks = matrix.length - 4;
    let sum: number = 0;

    for (let i = 0; i < matrix[0].length; i++) {
        for (let j = 0; j <= numberOfChecks; j++) {
            const word = ([matrix[j][i], matrix[j + 1][i], matrix[j + 2][i], matrix[j + 3][i]]).join('');
            if (word === 'XMAS' || word === 'SAMX') {
                sum += 1;
            }
        }
    }

    return sum;
}

function checkDiagonallyDesc(matrix: string[][]): number {
    const numberOfChecksY = matrix.length - 4;
    const numberOfChecksX = matrix[0].length - 4;
    let sum: number = 0;

    for (let i = 0; i <= numberOfChecksY; i++) {
        for (let j = 0; j <= numberOfChecksX; j++) {
            const word = ([matrix[i][j], matrix[i + 1][j + 1], matrix[i + 2][j + 2], matrix[i + 3][j + 3]]).join('');
            if (word === 'XMAS' || word === 'SAMX') {
                sum += 1;
            }
        }
    }

    return sum;
}

function checkDiagonallyAsc(matrix: string[][]): number {
    const lineLen: number = matrix.length - 1;
    const numberOfChecksY = matrix.length - 4;
    const numberOfChecksX = matrix[0].length - 4;
    let sum: number = 0;

    for (let i = 0; i <= numberOfChecksY; i++) {
        for (let j = 0; j <= numberOfChecksX; j++) {
            const word = ([
                matrix[lineLen - i][j],
                matrix[lineLen - i - 1][j + 1],
                matrix[lineLen - i - 2][j + 2],
                matrix[lineLen - i - 3][j + 3]
            ]).join('');
            if (word === 'XMAS' || word === 'SAMX') {
                sum += 1;
            }
        }
    }

    return sum;
}

function calculatePartTwo(matrix: string[][]): number {
    const numberOfChecksY = matrix.length - 3;
    const numberOfChecksX = matrix[0].length - 3;
    let sum: number = 0;

    for (let i = 0; i <= numberOfChecksY; i++) {
        for (let j = 0; j <= numberOfChecksX; j++) {
            const word = ([
                matrix[i][j],
                matrix[i][j + 2],
                matrix[i + 1][j + 1],
                matrix[i + 2][j],
                matrix[i + 2][j + 2],
            ]).join('');
            if (word === 'MSAMS' || word === 'MMASS' || word === 'SSAMM' || word === 'SMASM') {
                sum += 1;
            }
        }
    }

    return sum;
}

function flipMatrix(matrix: string[][]): string[][] {
    return matrix.toReversed().map(row => row.toReversed());
}