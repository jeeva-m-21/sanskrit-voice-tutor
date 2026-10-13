import { NextRequest, NextResponse } from 'next/server';
import { SarvamProvider } from '@/lib/ai/sarvam-provider';
import { MockProvider } from '@/lib/ai/mock-provider';
import { TTSRequest } from '@/lib/ai/types';

export async function POST(req: NextRequest) {
  try {
    const body: TTSRequest = await req.json();
    const apiKey = process.env.SARVAM_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ audioBase64: null, format: 'wav' });
    }

    const provider = new SarvamProvider(apiKey);
    const result = await provider.synthesizeSpeech(body);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('API /api/tts error:', error);
    return NextResponse.json(
      { error: error?.message || 'TTS Error' },
      { status: 500 }
    );
  }
}
