import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from './common/config.module';
import { UploadModule } from './upload/upload.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ArticleModule } from './article/article.module';
import { DraftModule } from './draft/draft.module';
import { CategoryModule } from './category/category.module';
import { TagModule } from './tag/tag.module';

// 引入UserController
@Module({
  imports: [
    JwtModule.register({
      // 注册JWT模块
      global: true, // 全局使用
      secret: 'dehua', // 秘钥
      signOptions: {
        // 签名配置
        expiresIn: '7d', // 过期时间
      },
    }),
    UserModule,
    ConfigModule.forRoot('config'),
    UploadModule,
    AuthModule,
    PrismaModule,
    ArticleModule,
    DraftModule,
    CategoryModule,
    TagModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
