import {PipeTransform, Injectable} from '@nestjs/common';
import {NotInEnumException} from 'src/customException';
import {InvitationKindEnum, InvitationKindType} from '../enum';
import {InvitationKind} from '@prisma/client';

@Injectable()
export class InvitationKindPipe implements PipeTransform {
  private getFormatedKind(kind: InvitationKindType): InvitationKind {
    if (kind === 'chat') return 'CHAT';
    else if (kind == 'friend') return 'FRIEND';
    else if (kind == 'game') return 'GAME';
  }

  transform(value: any): InvitationKind {
    if (!Object.values(InvitationKindEnum).includes(value)) {
      throw new NotInEnumException(value, InvitationKindEnum);
    }
    return this.getFormatedKind(value);
  }
}
