import {PipeTransform, Injectable} from '@nestjs/common';
import {NotInEnumException} from 'src/customException';
import {InvitationKindEnum_Url} from '../enum';
import {InvitationKind} from '@prisma/client';
import {InvitationKind_Url} from 'src/shared/base_types';

@Injectable()
export class InvitationKindPipe implements PipeTransform {
  private getFormatedKind(kind: InvitationKind_Url): InvitationKind {
    if (kind === 'chat') return 'CHAT';
    else if (kind == 'friend') return 'FRIEND';
    else if (kind == 'game') return 'GAME';
  }

  transform(value: any): InvitationKind {
    if (!Object.values(InvitationKindEnum_Url).includes(value)) {
      throw new NotInEnumException(value, InvitationKindEnum_Url);
    }
    return this.getFormatedKind(value);
  }
}
