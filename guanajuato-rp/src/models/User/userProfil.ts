import { CarDTO } from '../Cars/CarDTO';

export class UserProfil {
  public id = '';
  public prenom = '';
  public nom = '';
  public username = '';
  public discordId = '';
  public sexe = '';
  public createdAt = '';
  public argent = 0;
  public permis = '';
  public stage: StageDTO = new StageDTO();
  public points = 0;
  public nbSessionsPermis = 0;
  public nbSessionsPolice = 0;
  public nbSessions = 0;
  public voitures: CarDTO[] = [];
}

export class StageDTO {
  public stageId = '';
  public name = '';
}
