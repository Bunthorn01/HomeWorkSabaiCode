import LogoChrome from "../../atoms/header/LogoChrome";

function LogoChromeAndTitle() {
  return (
    <div  className="flex items-center w-1/4">
      <LogoChrome  />
      <div className="text-white text-2xl">Downloads</div>
    </div>
  );
}

export default LogoChromeAndTitle;
