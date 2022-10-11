import classNames from "classnames";

export default function Error({ error }) {
  return (
    <div className={classNames("w-fit px-12 pb-2 pt-3 bg-rose-500/80 text-center absolute right-0 bottom-0 text-white rounded-tl-lg text-lg")}>
      <p>{error}</p>
    </div>
  );
}
