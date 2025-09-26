import { useState } from "react";
import "./Header.scss";

const Header = () => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  const handleGet = () => {
    alert(
      "To set this page as your homepage:\n\n" +
        "• Chrome: Settings → On Startup → Open a specific page → Add this URL.\n" +
        "• Firefox: Settings → Home → Homepage and new windows → Custom URLs.\n" +
        "• Edge: Settings → Start, home, and new tabs → Open these pages → Add this URL.\n" +
        "• Safari (Mac): Preferences → General → Homepage → Enter this URL."
    );
    setVisible(false);
  };

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-inner__title">Make MyNews your homepage</div>
        <div className="header-inner__desc">
          Every day discover what’s trending on the internet!
        </div>
        <button
          className="header-inner__discard"
          onClick={() => setVisible(false)}
        >
          No, thanks
        </button>
        <button className="header-inner__get" onClick={handleGet}>
          GET
        </button>
      </div>
    </header>
  );
};

export default Header;
