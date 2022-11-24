import Header from "../components/Header";

const Layout = ({ children }) => {
  return (
    <div id="main-wrapper">
      <Header />
      <div className="page-wrapper pt-[48px]">
        <div className="children">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
