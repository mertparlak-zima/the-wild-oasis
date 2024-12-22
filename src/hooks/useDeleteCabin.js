import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin({ cabin }) {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      queryClient.invalidateQueries("cabins");
      toast.success(`${cabin.name} Cabin deleted`, { icon: "🗑️" });
    },
    onError: (error) => {
      toast.error("An error occurred: " + error.message);
      console.error(error);
    },
  });

  return { isPending, deleteCabin: () => mutate(cabin.id) };
}
