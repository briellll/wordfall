import words from './words';

export function generateWords(count) {
    const generatedWords = [];

    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * words.length);
      const randomWord = words[randomIndex];
      generatedWords.push(randomWord);
    }

    return generatedWords;
  }
