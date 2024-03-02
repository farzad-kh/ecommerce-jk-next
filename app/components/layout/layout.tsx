
import Footer from "./Footer";
import Header from "./Header";
import  { Toaster } from "react-hot-toast";
import Hidrated from "./Hidrated";
interface Props {
  children: React.ReactNode;
}
const Layout = async ({ children }: Props) => {
  return (
    <>
      <Hidrated>
        <Header />
        <main className="min-h-[100vh] ">{children}</main>
        <Toaster />
        <Footer />
      </Hidrated>
    </>
  );
};

export default Layout;
