// src/common/decorators/sede.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Sede = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.sede;
  },
);