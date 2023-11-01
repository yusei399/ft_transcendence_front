import {IsNotEmpty, IsNumber} from 'class-validator';
import {RemoveFriendData} from 'src/shared/HttpEndpoints/friend';

export class RemoveFriendDto implements RemoveFriendData {
  @IsNumber()
  @IsNotEmpty()
  friendId: number;
}
