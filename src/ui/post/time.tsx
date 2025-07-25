import dayjs from "@lib/datefns";

export type TimeProps = {
  date: string | Date;
};

const Time: React.FC<TimeProps> = ({ date }) => {
  const t = dayjs(date);
  const now = dayjs();
  const diff = now.diff(t, "year");

  return (
    <time dateTime={t.toISOString()}>
      {diff > 1.5 ? t.format("LL") : t.fromNow()}
    </time>
  );
};

export default Time;
