const fs = require('fs');
const content = fs.readFileSync('d:\\敦煌\\src\\index.html', 'utf8');
const scriptMatch = content.match(/<script>([\s\S]*?)<\/script>/g);
if (scriptMatch) {
    scriptMatch.forEach((script, index) => {
        const jsCode = script.replace(/<script>/, '').replace(/<\/script>/, '');
        try {
            new Function(jsCode);
            console.log(`Script ${index + 1}: No syntax errors`);
        } catch (e) {
            console.log(`Script ${index + 1}: Syntax error:`, e.message);
        }
    });
} else {
    console.log('No script tags found');
}