import { Module, Global, DynamicModule } from '@nestjs/common';

@Global()
@Module({})
export class ConfigModule {
  static forRoot(config: any): DynamicModule {
    return {
      module: ConfigModule,
      providers: [{ provide: 'CONFIG', useValue: config }],
      exports: ['CONFIG'],
    };
  }
}
