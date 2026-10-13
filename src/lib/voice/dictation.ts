/**
 * Live Audio Dictation Engine
 * Uses browser MediaRecorder and Web Audio API to capture microphone input
 * and transcribes it directly via Sarvam AI Saaras STT API (/api/stt).
 */

export interface DictationSession {
  stop: () => Promise<string>;
  cancel: () => void;
}

export async function startDictation(
  onLevel?: (volume: number) => void,
  preferredLanguage: string = 'unknown'
): Promise<DictationSession> {
  if (typeof window === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
    throw new Error('Microphone audio capture is not supported in this browser.');
  }

  // Request mic stream
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
    },
  });

  // Setup live audio visualizer via AudioContext
  let audioCtx: AudioContext | null = null;
  let animFrameId: number | null = null;

  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateVolume = () => {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const avg = sum / dataArray.length;
        const normalized = Math.min(100, Math.round((avg / 128) * 100));
        if (onLevel) onLevel(normalized);
        animFrameId = requestAnimationFrame(updateVolume);
      };
      updateVolume();
    }
  } catch (e) {
    console.warn('AudioContext visualizer not available:', e);
  }

  // Determine optimal mimeType supported by browser
  let mimeType = 'audio/webm';
  if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
    mimeType = 'audio/webm;codecs=opus';
  } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
    mimeType = 'audio/mp4';
  } else if (MediaRecorder.isTypeSupported('audio/ogg')) {
    mimeType = 'audio/ogg';
  } else if (MediaRecorder.isTypeSupported('audio/wav')) {
    mimeType = 'audio/wav';
  }

  const mediaRecorder = new MediaRecorder(stream, { mimeType });
  const audioChunks: Blob[] = [];

  mediaRecorder.ondataavailable = (event) => {
    if (event.data && event.data.size > 0) {
      audioChunks.push(event.data);
    }
  };

  mediaRecorder.start(200); // 200ms chunking

  const cleanup = () => {
    if (animFrameId) cancelAnimationFrame(animFrameId);
    if (audioCtx && audioCtx.state !== 'closed') {
      audioCtx.close().catch(() => {});
    }
    stream.getTracks().forEach((track) => track.stop());
  };

  return {
    stop: async (): Promise<string> => {
      return new Promise((resolve, reject) => {
        mediaRecorder.onstop = async () => {
          cleanup();
          try {
            const audioBlob = new Blob(audioChunks, { type: mimeType });
            if (audioBlob.size < 500) {
              resolve('');
              return;
            }

            const formData = new FormData();
            formData.append('file', audioBlob);
            formData.append('language_code', preferredLanguage);

            const res = await fetch('/api/stt', {
              method: 'POST',
              body: formData,
            });

            if (!res.ok) {
              throw new Error(`STT failed with status ${res.status}`);
            }

            const data = await res.json();
            resolve(data.transcript || '');
          } catch (err) {
            console.error('Dictation transcription error:', err);
            reject(err);
          }
        };

        if (mediaRecorder.state !== 'inactive') {
          mediaRecorder.stop();
        } else {
          cleanup();
          resolve('');
        }
      });
    },
    cancel: () => {
      cleanup();
      if (mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
      }
    },
  };
}
