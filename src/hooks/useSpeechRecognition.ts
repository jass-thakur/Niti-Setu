import { useState, useCallback, useRef } from 'react';

interface SpeechRecognitionOptions {
  onResult?: (transcript: string) => void;
  lang?: string;
  continuous?: boolean;
}

export const useSpeechRecognition = (options: SpeechRecognitionOptions = {}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const startListening = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setError('Speech recognition not supported in this browser.');
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const recognition = new SpeechRecognition();
    recognition.lang = optionsRef.current.lang || 'en-IN';
    recognition.continuous = optionsRef.current.continuous || false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      console.log('Speech recognition: started');
      setIsListening(true);
      setError(null);
    };

    recognition.onsoundstart = () => console.log('Speech recognition: sound detected');
    recognition.onspeechstart = () => console.log('Speech recognition: speech detected');
    recognition.onspeechend = () => console.log('Speech recognition: speech ended');
    recognition.onsoundend = () => console.log('Speech recognition: sound ended');

    recognition.onresult = (event: any) => {
      let currentTranscript = '';
      for (let i = 0; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      
      setTranscript(currentTranscript);
      console.log('Speech result:', currentTranscript);
      
      const isFinal = event.results[event.results.length - 1].isFinal;
      if (isFinal && optionsRef.current.onResult) {
        console.log('Final speech result:', currentTranscript);
        optionsRef.current.onResult(currentTranscript.trim());
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setError(event.error);
      setIsListening(false);
      // If "no-speech" error, we might want to restart? Or just let it end.
    };

    recognition.onend = () => {
      console.log('Speech recognition: ended');
      setIsListening(false);
    };

    try {
      recognition.start();
      recognitionRef.current = recognition;
    } catch (e) {
      console.error('Recognition start failed:', e);
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  return {
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
    toggleListening
  };
};
