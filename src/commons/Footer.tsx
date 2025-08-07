import Instagram from "@/assets/icon/ic_instagram.svg?react";
import Github from "@/assets/icon/ic_github.svg?react";
import Youtube from "@/assets/icon/ic_youtube.svg?react";

function Footer() {
  return (
    <footer className="w-full h-full px-6 md:px-24 py-8 bg-white border-t-[0.3px] border-darkgray flex flex-col md:flex-row justify-between items-center md:items-start text-darkgray">
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
        <a
          href="https://github.com/Konkuk-Univ-Student-Developer/NG_KUIS_WEB"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className="w-6 h-6 md:w-8 md:h-8" />
        </a>
        <a
          href="https://www.youtube.com/@KonkukUniv"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Youtube className="w-6 h-6 md:w-8 md:h-8" />
        </a>
        <a
          href="https://www.instagram.com/konkuk_official"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram className="w-6 h-6 md:w-8 md:h-8" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;