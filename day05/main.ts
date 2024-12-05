const txt: string = await Deno.readTextFile("./input.txt");
const [rules, updates] = txt.split("\n\n");
const parsedRules = rules.split("\n").map((line) => line.split("|"));
const parsedUpdates = updates.split("\n").map((line) => line.split(","));

const start1 = performance.now();
console.log(`Part one answer: ${calculatePartOne(parsedRules, parsedUpdates)}`);
const end1 = performance.now();
console.log(`Part one execution time: ${(end1 - start1).toFixed(2)} ms`);
const start2 = performance.now();
console.log(`Part two answer: ${calculatePartTwo(parsedRules, parsedUpdates)}`);
const end2 = performance.now();
console.log(`Part two execution time: ${(end2 - start2).toFixed(2)} ms`);

function calculatePartOne(rules: string[][], updates: string[][]) {
  const correctUpdates: string[][] = [];

  for (let i = 0; i < updates.length; i++) {
    let ruleFailed = false;

    for (let j = 0; j < rules.length; j++) {
      if (!isUpdateCorrect(rules[j], updates[i])) {
        ruleFailed = true;
        break;
      }
    }

    if (!ruleFailed) {
      correctUpdates.push(updates[i]);
    }
  }

  return correctUpdates.map((update) => Number(update[(update.length - 1) / 2])).reduce((a, b) => a + b);
}

function calculatePartTwo(rules: string[][], updates: string[][]) {
    const incorrectUpdates: string[][] = getIncorrectUpdates(rules, updates);
    return incorrectUpdates
        .map(update => Number(sortUpdate(rules, update)[(update.length - 1) / 2]))
        .reduce((a, b) => a + b);
}

function getIncorrectUpdates(rules: string[][], updates: string[][]): string[][] {
    const incorrectUpdates: string[][] = [];
    for (let i = 0; i < updates.length; i++) {
        let ruleFailed = false;

        for (let j = 0; j < rules.length; j++) {
            if (!isUpdateCorrect(rules[j], updates[i])) {
                ruleFailed = true;
                break;
            }
        }

        if (ruleFailed) {
            incorrectUpdates.push(updates[i]);
        }
    }
    return incorrectUpdates;
}

function sortUpdate(rules: string[][], update: string[]) {
  const copiedUpdate: string[] = [...update];
  while (checkRules(rules, copiedUpdate)) {
      for (let i = 0; i < rules.length; i++) {
          const firstRuleIndex = copiedUpdate.indexOf(rules[i][0]);
          const secondRuleIndex = copiedUpdate.indexOf(rules[i][1]);

          if ((firstRuleIndex >= 0 && secondRuleIndex >= 0) ? firstRuleIndex < secondRuleIndex : true) {
              continue;
          }

          [copiedUpdate[firstRuleIndex], copiedUpdate[secondRuleIndex]] = [
              copiedUpdate[secondRuleIndex],
              copiedUpdate[firstRuleIndex],
          ];
      }
  }
  return copiedUpdate;
}

function isUpdateCorrect(rule: string[], update: string[]) {
  const firstRuleIndex = update.indexOf(rule[0]);
  const secondRuleIndex = update.indexOf(rule[1]);

  if (firstRuleIndex >= 0 && secondRuleIndex >= 0) {
    return firstRuleIndex < secondRuleIndex;
  }

  return true;
}

function checkRules(rules: string[][], update: string[]) {
    let ruleFailed = false;

    for (let j = 0; j < rules.length; j++) {
        if (!isUpdateCorrect(rules[j], update)) {
            ruleFailed = true;
            break;
        }
    }

    return ruleFailed;
}
