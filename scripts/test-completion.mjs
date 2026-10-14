// Run with: node --experimental-vm-modules scripts/test-completion.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { SourceTextModule } from 'node:vm';

const cache = new Map();
function load(url) {
  if (!cache.has(url.href)) {
    cache.set(url.href, new SourceTextModule(readFileSync(url, 'utf8'), { identifier: url.href }));
  }
  return cache.get(url.href);
}
const entry = new SourceTextModule(`
  export { mbtiQuestions } from '../src/data/mbtiQuestions';
  export { enneagramQuestions } from '../src/data/enneagramQuestions';
  export { mbtiHesapla } from '../src/utils/mbtiCalculator';
  export { enneagramHesapla } from '../src/utils/enneagramCalculator';
  export * from '../src/utils/testCompletion';
`, { identifier: import.meta.url });
await entry.link((specifier, parent) => load(new URL(`${specifier}.js`, parent.identifier)));
await entry.evaluate();
const api = entry.namespace;

for (const [name, questions, calculate] of [
  ['MBTI', api.mbtiQuestions, api.mbtiHesapla],
  ['Enneagram', api.enneagramQuestions, api.enneagramHesapla],
]) {
  const full = Object.fromEntries(questions.map(({ id }, i) => [id, (i % 5) + 1]));
  const middle = Math.floor(questions.length / 2);
  const missing = { ...full };
  delete missing[questions[middle].id];
  const cases = [undefined, {}, { [questions.at(-1).id]: 4 }, missing,
    { ...missing, unrelated: 5 },
    ...[0, 6, 2.5, '3', null, NaN].map(value => ({ ...full, [questions[0].id]: value })),
  ];
  for (const answers of cases) {
    assert.equal(api.isTestComplete(questions, answers), false);
    assert.throws(() => calculate(answers), /tüm sorular/);
  }
  assert.equal(api.firstUnansweredIndex(questions, missing), middle);
  assert.equal(api.isTestComplete(questions, full), true);
  assert.equal(api.firstUnansweredIndex(questions, full), -1);
  assert.ok(calculate(full));
  assert.equal(api.isTestComplete(questions, { ...full, unrelated: 5 }), true);
  console.log(`${name}: incomplete/invalid answers rejected; complete answers accepted (${questions.length} questions).`);
}
