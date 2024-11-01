// translation.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { TranslationService } from 'src/services/translation.service';

@Controller('translate')
export class TranslationController {
  constructor(private readonly translationService: TranslationService) {}

  @Get()
  async translate(@Query('text') text: string, @Query('lang') lang: string) {
    return this.translationService.translateText(text, lang);
  }
}
