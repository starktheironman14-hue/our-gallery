import fs from 'fs';
import path from 'path';

// Helpers to handle imports (which are run in node, so imports won't be resolved like in Vite)
// We will just mocking them if possible or just parsing the file manually if needed. 
// Actually since I can't easily run the TS file with imports, I will read the file line by line and extract paths.

const memoriesFile = fs.readFileSync('./src/data/memories.ts', 'utf8');

// Regex to find public paths (starting with /)
const publicPathRegex = /['"](\/[^'"]+)['"]/g;
const matches = [...memoriesFile.matchAll(publicPathRegex)];

console.log('Verifying Public Paths...');
let errorCount = 0;

for (const match of matches) {
    const relPath = match[1];
    // Remove query params if any
    const cleanPath = relPath.split('?')[0];
    const fullPath = path.join(process.cwd(), 'public', cleanPath);

    // Check validation
    if (!fs.existsSync(fullPath)) {
        console.error(`❌ MISSING: ${cleanPath}`);
        errorCount++;
    } else {
        // console.log(`✅ Found: ${cleanPath}`);
    }
}

console.log(`\nVerification Complete. ${errorCount} missing files found.`);
