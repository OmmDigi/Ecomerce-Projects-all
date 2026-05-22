"use client";

interface IProps extends React.ComponentProps<"button"> {
  queryKey: string;
  queryValue: string;
  onItemClick? : () => void
}

export default function SetSearchParamsBtn({ queryKey, queryValue, onItemClick, ...props }: IProps) {
  return (
    <button
      onClick={() => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set(queryKey, queryValue);
        history.pushState(null, "", "?" + searchParams.toString());
        onItemClick?.();
      }}
      {...props}
    >
      {props.children}
    </button>
  );
}
