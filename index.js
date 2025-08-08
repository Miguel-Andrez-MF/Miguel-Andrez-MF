const fs = require('fs');

const thisYear = new Date().getFullYear();
const startTimeOfThisYear = new Date(`${thisYear}-01-01T00:00:00+00:00`).getTime();
const endTimeOfThisYear = new Date(`${thisYear}-12-31T23:59:59+00:00`).getTime();
const progressOfThisYear = (Date.now() - startTimeOfThisYear) / (endTimeOfThisYear - startTimeOfThisYear);

function generateProgressBar() {
    const progressBarCapacity = 12; // número de bloques totales
    const filledBlocks = Math.round(progressOfThisYear * progressBarCapacity);
    const emptyBlocks = progressBarCapacity - filledBlocks;
    return '▰'.repeat(filledBlocks) + '▱'.repeat(emptyBlocks);
}

const progressBar = generateProgressBar();
const percentage = (progressOfThisYear * 100).toFixed(2);

const readmePath = 'README.md';
const readmeContent = fs.readFileSync(readmePath, 'utf8');

const newProgressLine = `🚀 Year progress ${progressBar} ${percentage}%`;

const updatedReadme = readmeContent.replace(
  /(<!--START_PROGRESS-->)([\s\S]*?)(<!--END_PROGRESS-->)/,
  `$1\n${newProgressLine}\n$3`
);

fs.writeFileSync(readmePath, updatedReadme);
console.log('README.md actualizado con el progreso del año 🚀');
