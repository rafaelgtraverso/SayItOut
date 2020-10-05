import Tts from 'react-native-tts';

export const handleVoice = ttsText => {
    Tts.addListener('tts-start', () => {});
    Tts.addListener('tts-finish', () => {});
    Tts.addListener('tts-cancel', () => {});
    Tts.speak(ttsText);
};