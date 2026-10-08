import { useState } from "react";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";

import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import Intro from "./pages/Intro";
import Chapter1 from "./pages/Chapter1";
import Chapter2 from "./pages/Chapter2";
import Chapter3 from "./pages/Chapter3";
import Gallery from "./pages/Gallery";
import OurFuture from "./pages/OurFuture";
import Celebration from "./pages/Celebration";
import FinalLetter from "./pages/FinalLetter";
import FinalPage from "./pages/FinalPage";

function App() {
  const [isMuted, setIsMuted] = useState(false);

  const toggleMusic = () => {
    const music = document.getElementById("background-music");

    if (!music) return;

    music.muted = !music.muted;
    setIsMuted(music.muted);
  };

  return (
    <>
      <ScrollProgress />
      <Navbar />

      {/* Global Music Control */}
      <button
        onClick={toggleMusic}
        aria-label={isMuted ? "Unmute background music" : "Mute background music"}
        title={isMuted ? "Unmute music" : "Mute music"}
        className="fixed top-24 right-6 z-50 w-12 h-12 rounded-full glass flex items-center justify-center text-charcoal shadow-soft hover:scale-110 transition-transform duration-300"
      >
        {isMuted ? (
          <HiVolumeOff className="text-xl" />
        ) : (
          <HiVolumeUp className="text-xl" />
        )}
      </button>

      <Intro />
      <Chapter1 />
      <Chapter2 />
      <Chapter3 />
      <Gallery />
      <OurFuture />
      <Celebration />
      <FinalLetter />
      <FinalPage />
    </>
  );
}

export default App;