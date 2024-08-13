import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FavoriteProps } from "../components/module/FavoriteBtn";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { AiOutlineUser } from "react-icons/ai";
interface Props {
  productId?: string | undefined;
  name?: string | undefined;
  image?: string | undefined;
  unit_amount?: number | undefined | null;
  productInfo?: boolean;
  setOptimisticLike: (value:boolean) => void;
}
const useAddFavorite = ({
  productId,
  name,
  image,
  unit_amount,
  setOptimisticLike,
}: Props) => {
    const icon = <AiOutlineUser style={{ fill: "white", fontSize: "18px" }} />;
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  return useMutation({

    mutationFn: async () => {
        if (!session) {
            toast("Please login to your account", {
              style: {
                border: "2px solid #fff",
                color: "#fff",
                background: "#e46a6a",
                boxShadow: "0 0 20px #ddd",
              },
              icon,
            });
            return;
          }
      setOptimisticLike(true);
      const data = { productId, name, image, unit_amount };
      return await axios.post<FavoriteProps>("/api/favorite", data);
    },
    onMutate: () => {
      setOptimisticLike(false);
    },
    onSuccess: () => {
      // queryClient.invalidateQueries refetch the data base on queryKey
      queryClient.invalidateQueries({
        queryKey: ["favoriteList"],
      });
    },
    onError: () => {
      setOptimisticLike(false);
      return;
    },
  });
};

export default  useAddFavorite;
