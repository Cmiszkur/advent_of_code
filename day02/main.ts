const txt: string = await Deno.readTextFile('./input.txt');
const arr: number[][] = txt
    .split('\n')
    .map((line) =>
        line.split(' ').map(num => Number(num))
    );

function calculatePartOne(reports: number[][]): number {
    let safeReportsSum: number = 0;

    reports.forEach((report) => {
        if (checkReport(report)) safeReportsSum += 1;
    })

    return safeReportsSum;
}

function calculatePartTwo(reports: number[][]): number {
    let safeReportsSum: number = 0;

    reports.forEach((report) => {
        let isSafe: boolean = false;

        for (let i = report.length; i >= 0; i--) {
            if (i === report.length) {
                isSafe = checkReport(report);
                if (isSafe) break;
            } else {
                const correctedReport = report.toSpliced(i, 1);
                isSafe = checkReport(correctedReport);
                if (isSafe) break;
            }
        }

        if (isSafe) safeReportsSum += 1;
    })

    return safeReportsSum;
}

function checkReport(report: number[]): boolean {
    let isSafe: boolean = true;
    const isIncremental: boolean = report[0] < report[1];

    for (let i = 0; i < report.length; i++) {
        if (i > 0) {
            const isGradiental = isIncremental
                ? (report[i] > report[i-1])
                : (report[i] < report[i-1]);
            const levelDifference = Math.abs(report[i] - report[i-1]);
            isSafe = isGradiental && levelDifference <= 3 && levelDifference >= 1;
            if (!isSafe) break;
        }
    }
    return isSafe;
}

//564 is correct
console.log(`Part one answer: ${calculatePartOne(arr)}`);
//604 is correct
console.log(`Part two answer: ${calculatePartTwo(arr)}`);