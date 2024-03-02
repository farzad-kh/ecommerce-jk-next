 
import HomeContainer from "./components/template/HomeContainer";
 
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route"
export default async function Home ({}) {
 
 await getServerSession(authOptions);
 

  return (
    <div className="overflow-hidden">
      <HomeContainer/>
    </div>
  );
}
