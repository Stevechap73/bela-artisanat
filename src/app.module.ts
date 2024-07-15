import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { RoleModule } from './role/role.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    CategoryModule,
    RoleModule,
    ProductModule,
    CartModule,
    AuthModule,
    UserModule,
    EmailModule,
    ImageModule,
  ],
})
export class AppModule {}
