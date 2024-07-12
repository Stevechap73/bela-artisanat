// import { ForbiddenException, Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/prisma/prisma.service';
// import * as argon from 'argon2';
// import { JwtService } from '@nestjs/jwt';
// import { ConfigService } from '@nestjs/config';
// import { SigninDto, SignupDto } from './dto';
// import { EmailService } from 'src/email/email.service';

// @Injectable()
// export class AuthService {
//   constructor(
//     private prisma: PrismaService,
//     private jwt: JwtService,
//     private config: ConfigService,
//     private emailService: EmailService,
//   ) {}

//   async signup(dto: SignupDto) {
//     const exisingUser = await this.prisma.user.findUnique({
//       where: {
//         email: dto.email,
//       },
//     });
//     if (exisingUser) {
//       throw new ForbiddenException('Email already taken');
//     }
//     const exisingPseudo = await this.prisma.user.findUnique({
//       where: {
//         pseudo: dto.pseudo,
//       },
//     });
//     if (exisingPseudo) {
//       throw new ForbiddenException('Pseudo already taken');
//     }

//     const hash = await argon.hash(dto.password);
//     const token = await argon.hash(`${new Date()}`);

//     const user = await this.prisma.user.create({
//       data: {
//         email: dto.email,
//         password: hash,
//         firstName: dto.firstName,
//         lastName: dto.lastName,
//         pseudo: dto.pseudo,
//         address: dto.address,
//         phone: dto.phone,
//         roleId: 1,
//         isActive: false,
//         token: token,
//       },
//     });

//     const activationToken = await argon.hash(`${new Date()} + ${user.email}`);
//     await this.emailService.sendUserConfirmation(user, activationToken);

//     return this.signToken(user.id);
//   }

//   async signin(dto: SigninDto) {
//     const user = await this.prisma.user.findUnique({
//       where: {
//         email: dto.email,
//       },
//     });
//     if (!user) {
//       throw new ForbiddenException('Invalid credentials');
//     }

//     const isValidPassword = await argon.verify(user.password, dto.password);
//     if (!isValidPassword) {
//       throw new ForbiddenException('Invalid credentials');
//     }
//     return this.signToken(user.id);
//   }

//   async signToken(userId: number): Promise<{ access_token: string }> {
//     const payload = {
//       sub: userId,
//     };

//     const secret = this.config.get('JWT_SECRET');
//     const token = await this.jwt.signAsync(payload, {
//       expiresIn: '30d',
//       secret: secret,
//     });

//     return {
//       access_token: token,
//     };
//   }

//   async activateAccount(token: string) {
//     const user = await this.prisma.user.findUnique({
//       where: {
//         token: token,
//       },
//     });

//     if (!user) {
//       throw new ForbiddenException('Invalid token');
//     }

//     await this.prisma.user.update({
//       where: {
//         id: user.id,
//       },
//       data: {
//         isActive: true,
//         token: null,
//       },
//     });

//     return {
//       message: 'Account activated successfully',
//     };
//   }
// }

import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SigninDto, SignupDto } from './dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private emailService: EmailService,
  ) {}
  async signup(dto: SignupDto) {
    const exisingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (exisingUser) {
      throw new ForbiddenException('Email already taken');
    }
    const exisingPseudo = await this.prisma.user.findUnique({
      where: {
        pseudo: dto.pseudo,
      },
    });
    if (exisingPseudo) {
      throw new ForbiddenException('Pseudo already taken');
    }

    const hash = await argon.hash(dto.password);

    const token = (await argon.hash(`${new Date()}`)).replaceAll('/', ''); // important .replaceAll('/','') pour ne plus avoir de / car sinon ne recupere pas le bon token
    // const token = uuidv4();

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hash,
        firstName: dto.firstName,
        lastName: dto.lastName,
        pseudo: dto.pseudo,
        address: dto.address,
        phone: dto.phone,
        roleId: 1,
        isActive: false,
        token: token,
      },
    });

    // const activationToken = await argon.hash(`${new Date()} + ${user.email}`);
    await this.emailService.sendUserConfirmation(user, token);

    return this.signToken(user.id);
  }

  async activateAccount(token: string) {
    console.log('Received token:', token); //
    const user = await this.prisma.user.findUnique({
      where: {
        token: token,
      },
    });

    if (!user) {
      console.log('No user found for token:', token);
      throw new ForbiddenException('Invalid token');
    }

    console.log('User found:', user.email);

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isActive: true,
      },
    });

    return {
      message: 'Account activated successfully',
    };
  }

  async signin(dto: SigninDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Invalid crendentials');
    }

    const isValidPassword = await argon.verify(user.password, dto.password);
    if (!isValidPassword) {
      throw new ForbiddenException('Invalid crendentials');
    }
    return this.signToken(user.id);
  }

  async signToken(userId: number): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
    };

    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '30d',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
