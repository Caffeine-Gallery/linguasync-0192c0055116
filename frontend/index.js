import { backend } from 'declarations/backend';

const englishText = document.getElementById('englishText');
const targetLanguage = document.getElementById('targetLanguage');
const translateButton = document.getElementById('translateButton');
const translatedText = document.getElementById('translatedText');
const readAloudButton = document.getElementById('readAloudButton');

translateButton.addEventListener('click', async () => {
    const text = englishText.value;
    const language = targetLanguage.value;
    if (text.trim() !== '') {
      try {
        const translated = await translateText(text, language);
        translatedText.textContent = translated;
      } catch (error) {
        translatedText.textContent = 'Error translating text.';
        console.error('Translation error:', error);
      }
    }
});

readAloudButton.addEventListener('click', () => {
    const text = translatedText.textContent;
    if (text.trim() !== '') {
        readText(text);
    }
});

async function translateText(text, target) {
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${target}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data && data.responseData && data.responseData.translatedText) {
      return data.responseData.translatedText;
    } else {
      throw new Error('Invalid translation response');
    }
}


function readText(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
}

