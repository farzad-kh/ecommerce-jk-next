// const fetchFavoritList = async () => {
//   try {
//     const res = await fetch("/api/favorite", { cache: "force-cache" });
//     return await res.json();
//   } catch (error) {
//     console.error("Error in fetchData:", error);
//   }
// };
// export default fetchFavoritList;
import axios from "axios";

 
const fetchFavoritList = async () => {
 
    const res = await axios.get(`/api/favorite`).then(res=>res.data)
   return res
 
};
export default fetchFavoritList;
