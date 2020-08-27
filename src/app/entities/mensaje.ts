export class Mensaje
{
  fromId?: number;
  fromName?: string;
  toId?: number;
  toName?: string;
  message: string;
  // 1 left   2 right
  align?: string;
  fechaHora?: string;
  avatar?: string;
  isAvatarImg?: boolean = false;
}
