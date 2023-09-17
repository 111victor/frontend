import { useEffect } from "react";
import "./google-map.component.css";
const GoogleMap = ({
  id,
  latitude,
  longitude,
}: {
  id: number;
  latitude: number;
  longitude: number;
}) => {
  useEffect(() => {
    const iframeData = document.createElement("iframe") as HTMLIFrameElement;
    iframeData.src = `https://maps.google.com/maps?q=${latitude},${longitude}&hl=es;&output=embed`;
    const container = document.getElementById(`map-container${id}`);
    container.appendChild(iframeData);
  }, []);

  return <div id={`map-container${id}`} className="map-container"></div>;
};
export default GoogleMap;
