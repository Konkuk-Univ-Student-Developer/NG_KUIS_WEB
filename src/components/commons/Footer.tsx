import {Link} from "react-router-dom"; 
import { SOCIAL_LINKS } from "@/constants/FooterConstants";

type SocialLinkProps = {
  path: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

function SocialLink({ path, Icon }: SocialLinkProps) {
  return (
    <Link to={path} target="_blank" rel="noopener noreferrer">
      <Icon className="w-6 h-6 md:w-8 md:h-8" />
    </Link>
  );
}

function Footer() {
  return (
    <footer className="hidden md:flex w-full py-8 bg-white border-t-[0.3px] border-darkgray text-darkgray">
      <div className="w-full max-w-7xl mx-auto px-6 flex flex-row justify-between items-center md:items-start">
        <div className="flex h-full flex-col py-3 justify-between items-start md:items-start">
          <div>
            <div className="text-sm font-semibold">건국대학교</div>
            <div className="text-xs font-extralight mb-4">
              (05029) 120 Neungdong-ro, Gwangjin-gu, Seoul 05029. KOREA
              <br />
              TEL 02-450-3114
            </div>
          </div>
          <div>
            <div className="text-xs font-light md:text-left">
              COPYRIGHT © 2025 KONKUK UNIVERSITY STUDENTS DEVELOPER
              <br />
              ALL RIGHTS RESERVED
            </div>
          </div>
        </div>

        <div className="flex min-h-full self-stretch justify-center md:justify-start items-center gap-6">
          {SOCIAL_LINKS.map((link) => (
            <SocialLink
              key={link.id}
              path={link.path}
              Icon={link.icon}
            />
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;

