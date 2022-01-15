export class JwtDto {
  token: string | undefined;
  type: string | undefined;
  nombreUsuario: string | undefined;
  authorities: string[] | undefined;

}
