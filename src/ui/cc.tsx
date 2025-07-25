import { FC } from "react";

const CreativeCommons: FC<{ className: string }> = ({ className }) => {
  return (
    <div className={className}>
      <p>
        © {new Date().getFullYear()}{" "}
        <a className="link" href="https://lihs.me">
          lihs.me
        </a>
      </p>
      <p>
        <a
          className="link"
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans"
        >
          CC BY-NC-SA
        </a>
      </p>
      <p>
        Powered by{" "}
        <a className="link" href="https://nextjs.org/">
          Next.js
        </a>
        {" & "}
        <a className="link" href="https://daisyui.com/">
          DaisyUI
        </a>
      </p>
    </div>
  );
};

export default CreativeCommons;
