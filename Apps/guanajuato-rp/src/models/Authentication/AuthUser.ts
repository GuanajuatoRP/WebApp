import { JsonObject, JsonProperty, JsonConverter, JsonCustomConvert } from 'json2typescript';

@JsonConverter
export class SingleOrArrayConverter implements JsonCustomConvert<string[]> {
  serialize(array: string[]): any {
    return array;
  }
  deserialize(data: any): string[] {
    if (data === undefined || data == null) return [];
    if (Array.isArray(data)) return data;
    else return [data];
  }
}

@JsonObject('AuthUser')
export class AuthUser {
  @JsonProperty('http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name', String)
  public UserId = '';
  @JsonProperty('Name', String)
  public Name = '';
  @JsonProperty('Roles', SingleOrArrayConverter)
  public Roles: string[] = [];
  @JsonProperty('nbf', Number)
  public Nbf = '';
  @JsonProperty('exp', Number)
  public Exp = 0;
}
