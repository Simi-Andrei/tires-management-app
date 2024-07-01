import Header from "@/components/header/Header";
import Topbar from "@/components/topbar/Topbar";
import Footer from "@/components/footer/Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex h-full">
      <Header />
      <div className="flex flex-col w-full">
        <Topbar />
        <main className="flex-1 p-2">{children}</main>
        <Footer />
      </div>
    </div>
  );
};
export default Layout;
