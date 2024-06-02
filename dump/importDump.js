import fs from "fs";
import importService from "../src/service/ImportService.js";

async function importDump() {
  console.log('Start importing dump...');
  const content = fs.readFileSync('dump/dump.txt', 'utf8');
  await importService.importCustomFormatDump(content)
    .catch(err => {
      console.log(err)
    });
  console.log('Import completed');
  process.exit(0);
}

await importDump();
