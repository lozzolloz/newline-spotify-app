import { useState, useEffect } from "react";
import { catchErrors } from "../utils";
import { getTopTracks } from "../spotify";
import { SectionWrapper, TrackList, TimeRangeButtons, Loader } from "../components";

const TopTracks = () => {
  const [topTracks, setTopTracks] = useState(null);
  const [activeRange, setActiveRange] = useState("short");

  useEffect(() => {
    const fetchData = async () => {
      const userTopArtists = await getTopTracks(`${activeRange}_term`);
      setTopTracks(userTopArtists.data);
    };

    catchErrors(fetchData());
  }, [activeRange]);

  return (
    <main>
      {topTracks ? (
        <SectionWrapper title="Top Tracks" breadcrumb="true">
          <TrackList tracks={topTracks.items} />
          <TimeRangeButtons
            activeRange={activeRange}
            setActiveRange={setActiveRange}
          />
        </SectionWrapper>
      ) : (<Loader/>)}
    </main>
  );
};

export default TopTracks;
