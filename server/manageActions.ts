"use server";
import { supabase } from "@/lib/supabase";
import { decryptJsonBlob, encryptJsonBlob, getOrCreateMvpKey } from "./utils";
import { IRegenerativeAction } from "@/app/regenerative_actions/_components/models";

export const saveEncryptedAction = async (action: IRegenerativeAction) => {
  const key = getOrCreateMvpKey();
  const enc_blob = encryptJsonBlob(action, key);

  await supabase
    .from("REGENERATIVE_ACTIONS")
    .insert({
      wallet: action.farmerAddress,
      enc_blob,
    })
    .single();
};

export const getDecryptedData = async (walletAddres: string) => {
  const { data } = await supabase
    .from("REGENERATIVE_ACTIONS")
    .select("*")
    .eq("wallet", walletAddres);

  const key = getOrCreateMvpKey();
  const actions = data?.map((_) => decryptJsonBlob(_.enc_blob, key));
  return actions;
};
