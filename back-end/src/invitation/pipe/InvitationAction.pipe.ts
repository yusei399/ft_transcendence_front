import {PipeTransform, Injectable} from '@nestjs/common';
import {NotInEnumException} from 'src/customException';
import {InvitationActionEnum} from '../enum';

@Injectable()
export class InvitationActionPipe implements PipeTransform {
  transform(value: any): InvitationActionEnum {
    if (!Object.values(InvitationActionEnum).includes(value)) {
      throw new NotInEnumException(value, InvitationActionEnum);
    }
    return value;
  }
}
