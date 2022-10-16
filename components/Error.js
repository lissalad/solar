import classNames from "classnames";
import ErrorIcon from "./icons/ErrorIcon";

export default function Error({ error }) {
  return (
    <div
      className={classNames(
        "px-5 py-2 bg-red-500/50 text-center bottom-16 rounded-t-sm absolute text-rose-100 flex flex-row items-center space-x-3",
        "md:bottom-5 md:right-5"
      )}
    >
      <ErrorIcon />
      <p>{error}</p>
    </div>
  );
}
