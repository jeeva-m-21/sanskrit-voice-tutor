import { NextRequest, NextResponse } from 'next/server';
import { SarvamProvider } from '@/lib/ai/sarvam-provider';

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.SARVAM_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { transcript: 'நமோ நமஹ (Namo namaḥ)', confidence: 0.9, languageCode: 'unknown' }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file') as Blob | null;
    const languageCode = (formData.get('language_code') as string) || 'unknown';

    if (!file) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
    }

    const provider = new SarvamProvider(apiKey);
    const result = await provider.transcribeAudio(file, languageCode);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('API /api/stt error:', error);
    return NextResponse.json(
      { error: error?.message || 'STT Error' },
      { status: 500 }
    );
  }
}
