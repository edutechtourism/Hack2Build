export enum ActionType {
  CoverCrop,
  VegetationCover,
  TreePlanting,
}

export enum PrivacySetting {
  PRIVATE,
  ANON,
  PUBLIC,
}

export interface IRegenerativeAction {
  farmerAddress: string;
  actionType: ActionType;
  privacySetting: PrivacySetting;
}
