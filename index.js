const fs = require("fs");

function getYearProgressBar() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const end = new Date(now.getFullYear() + 1, 0, 1);
    const progress = (now - start) / (end - start);

    const totalBlocks = 12; // Número de bloques ▰
    const filledBlocks = Math.floor(progress * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;

    const progressBar = "▰".repeat(filledBlocks) + "▱".repeat(emptyBlocks);
    const percentage = (progress * 100).toFixed(2);

    return `🚀 Year progress ${progressBar} ${percentage}%`;
}

function updateReadme() {
    const readmePath = "./README.md";
    const readme = fs.readFileSync(readmePath, "utf8");

    const newContent = readme.replace(
        /<!--START_PROGRESS-->[\s\S]*<!--END_PROGRESS-->/,
        `<!--START_PROGRESS-->\n${getYearProgressBar()}\n<!--END_PROGRESS-->`
    );

    fs.writeFileSync(readmePath, newContent);
    console.log("✅ README.md actualizado con el progreso del año");
}

updateReadme();
