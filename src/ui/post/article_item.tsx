import Link from "next/link";

import dayjs from "@lib/datefns";
import Time from "./time";

interface ArticleItemProps {
  title: string;
  description: string;
  createTime: Date;
  href: string;
}

const ArticleItem: React.FC<ArticleItemProps> = ({
  title,
  description,
  createTime,
  href,
}) => {
  return (
    <article className="space-y-2">
      <header>
        <h2 className="text-3xl">
          <Link className="hover:text-primary transition-colors" href={href}>
            {title}
          </Link>
        </h2>
        <small className="text-base-content/50">
          <Time date={createTime} />
        </small>
      </header>
      <section className="text-base-content/75">
        <p>{description}</p>
      </section>
    </article>
  );
};

export default ArticleItem;
