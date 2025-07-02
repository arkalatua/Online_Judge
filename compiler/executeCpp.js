const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const outputDir = path.join(__dirname, 'output');
const gppPath = 'C:\\msys64\\ucrt64\\bin\\g++.exe';
const includePaths = [
    'C:/msys64/ucrt64/include',
    'C:/msys64/ucrt64/include/c++/15.1.0',
    'C:/msys64/ucrt64/include/c++/15.1.0/x86_64-w64-mingw32'
];


if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function executeCpp(filePath) {
    const fileId = path.basename(filePath, '.cpp');
    const outputFilePath = path.join(outputDir, `${fileId}.exe`);

    // Compilation
    const compileResult = spawnSync(
        gppPath,
        [
            ...includePaths.map(p => `-I${p}`),
            filePath,
            '-o', outputFilePath
        ],
        { 
            encoding: 'utf-8',
            env: {
                ...process.env,
                PATH: `C:\\msys64\\ucrt64\\bin;${process.env.PATH}`
            }
        }
    );

    if (compileResult.status !== 0) {
        console.error('Compilation failed:');
        console.error(compileResult.stderr);
        throw {
            stage: 'compilation',
            error: new Error(`Compiler exited with code ${compileResult.status}`),
            stderr: compileResult.stderr,
            stdout: compileResult.stdout
        };
    }

    // Execution
    const execResult = spawnSync(
        outputFilePath,
        [],
        { 
            encoding: 'utf-8',
            cwd: outputDir 
        }
    );

    if (execResult.status !== 0) {
        console.error('Execution failed:');
        console.error(execResult.stderr);
        throw {
            stage: 'execution',
            error: new Error(`Program exited with code ${execResult.status}`),
            stderr: execResult.stderr
        };
    }

    return execResult.stdout;
}

module.exports = executeCpp;