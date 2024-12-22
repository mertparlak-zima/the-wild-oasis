import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../services/apiCabins";
import toast from "react-hot-toast";
import supabase from "../services/supabase";

export function useDeleteCabin({ cabin, currentImage }) {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: async () => {
      queryClient.invalidateQueries("cabins");
      toast.success(`${cabin.name} Cabin deleted`, { icon: "🗑️" });

      if (currentImage) {
        await supabase.storage.from("cabin-images").remove([currentImage]);
      }
    },
    onError: (error) => {
      toast.error("An error occurred: " + error.message);
      console.error(error);
    },
  });

  return { isPending, deleteCabin: () => mutate(cabin.id) };
}
