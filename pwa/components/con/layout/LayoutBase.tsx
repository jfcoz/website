import React, { PropsWithChildren } from "react";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import Footer from "./Footer";
import { Footer as FooterType, Navigation as NavType } from "types/con";

interface LayoutProps extends PropsWithChildren {
  edition?: string;
  withSocialFooter?: boolean;
  footer?: FooterType;
  nav?: NavType;
}

export default function LayoutBase({
  children,
  edition,
  withSocialFooter = false,
  nav,
  footer,
}: LayoutProps) {
  return (
    <>
      <Nav edition={edition} nav={nav} />
      <MobileNav nav={nav} />
      <div className="relative z-10">
        {children}
        <Footer
          links={footer}
          withSocial={withSocialFooter}
          edition={edition}
        />
      </div>
    </>
  );
}
