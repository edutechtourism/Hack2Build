import { IRegenerativeAction } from "@/app/regenerative_actions/_components/models";
import CryptoJS from "crypto-js";

const KEY_NAME = "hempsat_mvp_key";

export function getOrCreateMvpKey(): string {
  return KEY_NAME;
}

export function encryptJsonBlob(
  obj: IRegenerativeAction,
  password: string
): string {
  const plaintext = JSON.stringify(obj);
  return CryptoJS.AES.encrypt(plaintext, password).toString();
}

export function decryptJsonBlob(
  ciphertext: string,
  password: string
): IRegenerativeAction {
  const bytes = CryptoJS.AES.decrypt(ciphertext, password);
  const plaintext = bytes.toString(CryptoJS.enc.Utf8);
  if (!plaintext) throw new Error("Bad password or corrupted data");
  return JSON.parse(plaintext);
}
