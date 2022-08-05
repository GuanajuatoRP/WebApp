export class UserProfil {
  public id = '' as string;
  public prenom = '' as string;
  public nom = '' as string;
  public username = '' as string;
  public discordId = '' as string;
  public sexe = '' as string;
  public createdAt = '' as string;
  public argent = 0 as int;
  public permis = '' as string;
  public stage = {} as StageDTO;
  public points = 0 as int;
  public nbSessionsPermis = 0 as int;
  public nbSessionsPolice = 0 as int;
  public nbSessions = 0 as int;
  public VoitureDTO = [] as VoitureDTO[];
}

class StageDTO {
  public stageId = '' as string;
  public name = '' as string;
}

class VoitureDTO {
  public keyCar = '' as string;
  public idUser = '' as string;
  public username = '' as string;
  public idCar = '' as string;
  public carId = 0 as int;
  public carOrdinal = 0 as int;
  public maker = '' as string;
  public model = '' as string;
  public year = 0 as int;
  public transmission = '' as string;
  public gearBox = 0 as int;
  public type = '' as string;
  public rarity = '' as string;
  public wikiLink = '' as string;
  public pictureLink = '' as string;
  public engineConfiguration = '' as string;
  public originalPowerBhp = 0 as int;
  public originalPowerKw = 0 as int;
  public originalTorqueLbft = 0 as int;
  public originalTorqueNm = 0 as int;
  public originalWeightLbs = 0 as int;
  public originalWeightKg = 0 as int;
  public originalEngineDisplacement = 0 as int;
  public originalNbCylindre = 0 as int;
  public originalAspiration = '' as string;
  public originalEnginePosition = '' as string;
  public originalSpeed = 0 as int;
  public originalHandling = 0 as int;
  public originalAccelerate = 0 as int;
  public originalLaunch = 0 as int;
  public originalBraking = 0 as int;
  public originalOffroad = 0 as int;
  public originalPi = 0 as int;
  public originalPrice = 0 as int;
  public originalClass = '' as string;
  public powerBhp = 0 as int;
  public powerKw = 0 as int;
  public torqueLbft = 0 as int;
  public torqueNm = 0 as int;
  public weightLbs = 0 as int;
  public weightKg = 0 as int;
  public engineDisplacement = 0 as int;
  public nbCylindre = 0 as int;
  public aspiration = '' as string;
  public enginePosition = '' as string;
  public speed = 0 as int;
  public handling = 0 as int;
  public accelerate = 0 as int;
  public launch = 0 as int;
  public braking = 0 as int;
  public offroad = 0 as int;
  public pi = 0 as int;
  public class = '' as string;
  public imatriculation = '' as string;
  public totalPrice = 0 as int;
  public editPrice = 0 as int;
}
