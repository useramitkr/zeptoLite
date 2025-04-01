import React, { ReactNode } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";

interface Props {
  children: ReactNode;
}

const Wrapper: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow my-6">{children}</main> 
      <Footer />
    </div>
  );
};

export default Wrapper;
