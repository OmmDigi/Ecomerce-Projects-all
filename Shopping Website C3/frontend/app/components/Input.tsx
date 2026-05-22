interface IProps extends React.ComponentProps<"input"> {
  icon?: React.ReactNode;
}

export default function Input({ placeholder, icon, ...props }: IProps) {
  return (
    <div className="border border-gray-300 hover:border-black flex items-center">
      <span className="block border-r border-r-gray-300 p-3 text-gray-600">{icon}</span>
      <input
        {...props}
        className={`w-full outline-none text-sm text-gray-600 p-3 ${props.className}`}
        placeholder={placeholder}
      />
    </div>
  );
}
