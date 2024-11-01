import { Injectable } from '@nestjs/common';
import { translate } from '@vitalets/google-translate-api';

@Injectable()
export class TranslationService {
  async translateText(text: string, targetLanguage: string): Promise<string> {
    try {
      const result = await translate(text, { to: targetLanguage });
      return result.text;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  }
}
