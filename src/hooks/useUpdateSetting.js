import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../services/apiSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      queryClient.invalidateQueries("settings");
      toast.success(`Setting is updated`, { icon: "🎉" });
    },
    onError: (error) => {
      toast.error("An error occurred while updating setting: " + error.message);
      console.error(error);
    },
  });

  return { isUpdating, updateSetting };
}
