export function isValidAnswer(value) {
  return Number.isInteger(value) && value >= 1 && value <= 5;
}

export function firstUnansweredIndex(questions, answers) {
  return questions.findIndex(({ id }) => !isValidAnswer(answers?.[id]));
}

export function isTestComplete(questions, answers) {
  return questions.length > 0 && firstUnansweredIndex(questions, answers) === -1;
}

export function assertTestComplete(questions, answers) {
  if (!isTestComplete(questions, answers)) {
    throw new Error('Sonuç için tüm sorular 1–5 arasında bir yanıtla tamamlanmalıdır.');
  }
}
