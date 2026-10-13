import { NextRequest, NextResponse } from 'next/server';
import { SarvamProvider } from '@/lib/ai/sarvam-provider';
import { MockProvider } from '@/lib/ai/mock-provider';
import { TutorTurnRequest } from '@/lib/ai/types';

export async function POST(req: NextRequest) {
  try {
    const body: TutorTurnRequest = await req.json();
    const apiKey = process.env.SARVAM_API_KEY;

    let provider = apiKey ? new SarvamProvider(apiKey) : new MockProvider();

    try {
      const response = await provider.generateTutorResponse(body);
      return NextResponse.json(response);
    } catch (apiError) {
      console.warn('Sarvam API failed, falling back to Mock engine:', apiError);
      const fallback = new MockProvider();
      const response = await fallback.generateTutorResponse(body);
      return NextResponse.json(response);
    }
  } catch (error: any) {
    console.error('API /api/chat error:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
