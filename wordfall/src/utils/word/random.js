import words from './words';

export function generateWords(count) {
  const generatedWords = [];

  while (generatedWords.length < count) {
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];

    if (!generatedWords.includes(randomWord)) {
      generatedWords.push(randomWord);
    }
  }

  return generatedWords;
}
