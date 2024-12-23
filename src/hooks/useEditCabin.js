import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { isPending: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabinData, id, currentImage }) =>
      createEditCabin(newCabinData, id, currentImage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success(`Cabin is edited`, { icon: "🎉" });
    },
    onError: (error) => {
      toast.error("An error occurred while editing cabin: " + error.message);
      console.error(error);
    },
  });

  return { isEditing, editCabin };
}
