import { Share } from "react-native";

export const onShare = async (message: string) => {
  await Share.share({
    message,
  });
};
