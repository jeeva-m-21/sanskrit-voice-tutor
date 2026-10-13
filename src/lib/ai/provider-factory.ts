/**
 * AI Provider Factory
 * Auto-detects configuration and instantiates SarvamProvider or MockProvider.
 */

import { IAIProvider } from './types';
import { SarvamProvider } from './sarvam-provider';
import { MockProvider } from './mock-provider';

let activeProvider: IAIProvider | null = null;

export function getAIProvider(): IAIProvider {
  if (activeProvider) return activeProvider;

  const sarvamKey = process.env.SARVAM_API_KEY || process.env.NEXT_PUBLIC_SARVAM_API_KEY;

  if (sarvamKey && sarvamKey.trim().length > 0) {
    activeProvider = new SarvamProvider(sarvamKey.trim());
  } else {
    activeProvider = new MockProvider();
  }

  return activeProvider;
}

export function setCustomProvider(provider: IAIProvider) {
  activeProvider = provider;
}
