import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Mock structure of memories.ts data since we can't import TS directly in node easily without setup
// We will manually extract paths from the file content or just list the files we expect.
// actually better: Read memories.ts content and regex extract strings starting with '/'
// and also check the assets imports.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = process.cwd();
const memoriesPath = path.join(projectRoot, 'src/data/memories.ts');
const publicDir = path.join(projectRoot, 'public');
const assetsDir = path.join(projectRoot, 'src/assets');

try {
    const data = fs.readFileSync(memoriesPath, 'utf8');

    // Extract paths like '/Me/...' or '/Kitkat/...'
    const matches = data.match(/['"](\/[^'"]+)['"]/g);

    if (matches) {
        console.log('Checking public paths...');
        matches.forEach(match => {
            const relativePath = match.replace(/['"]/g, ''); // remove quotes
            const absolutePath = path.join(publicDir, relativePath);

            if (fs.existsSync(absolutePath)) {
                // console.log(`✅ Found: ${relativePath}`);
            } else {
                console.error(`❌ MISSING: ${relativePath}`);
            }
        });
    }

    // Check asset imports
    // import x from '../assets/foo.mp4'
    const assetMatches = data.match(/from\s+['"]\.\.\/assets\/([^'"]+)['"]/g);
    if (assetMatches) {
        console.log('\nChecking asset imports...');
        assetMatches.forEach(match => {
            const filename = match.match(/assets\/([^'"]+)/)[1];
            const assetPath = path.join(assetsDir, filename);
            if (fs.existsSync(assetPath)) {
                // console.log(`✅ Found Asset: ${filename}`);
            } else {
                console.error(`❌ MISSING Asset: ${filename}`);
            }
        });
    }

} catch (err) {
    console.error('Error reading memories.ts file:', err);
}
