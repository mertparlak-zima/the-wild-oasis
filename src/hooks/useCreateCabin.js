import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  // Create a new cabin
  const { isPending, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      queryClient.invalidateQueries("cabins");
      toast.success(`Cabin created`, { icon: "🎉" });
    },
    onError: (error) => {
      toast.error("An error occurred: " + error.message);
      console.error(error);
    },
  });

  return { isPending, createCabin };
}
