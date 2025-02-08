import React from "react";

interface PlaylistProps {
  playlist: any;
}

const Playlist: React.FC<PlaylistProps> = ({ playlist }) => {
  return (
    <div>
      <h1>Generated Playlist</h1>
      {playlist ? (
        <div>{JSON.stringify(playlist, null, 2)?.replace(/\n\s/g, "")}</div>
      ) : (
        <p>No playlist data available</p>
      )}
    </div>
  );
};

export default Playlist;
