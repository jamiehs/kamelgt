import { createInterface } from 'readline';

export function prompt(question, completions) {
  const options = { input: process.stdin, output: process.stdout };
  if (completions) {
    options.completer = line => {
      const hits = completions.filter(c => c.startsWith(line));
      return [hits.length ? hits : completions, line];
    };
  }
  const rl = createInterface(options);
  return new Promise(resolve => rl.question(question, answer => { rl.close(); resolve(answer.trim()); }));
}
