import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  // map to static React app SPA
  @Get()
  renderApp() {
    return '<h1> App</h1>';
  }
}
