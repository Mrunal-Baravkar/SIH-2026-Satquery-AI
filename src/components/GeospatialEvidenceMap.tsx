import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { AnalysisResult, EvidenceRegion } from '../types';

interface GeospatialEvidenceMapProps {
  result: AnalysisResult;
  selectedRegionId: string | null;
  onSelectRegion: (id: string | null) => void;
}

export const GeospatialEvidenceMap: React.FC<GeospatialEvidenceMapProps> = ({
  result,
  selectedRegionId,
  onSelectRegion,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layersRef = useRef<{ [id: string]: { rect: L.Rectangle; marker: L.Marker } }>({});

  const hasGeoMetadata =
    result.inputMetadata.crs &&
    result.inputMetadata.crs !== 'N/A' &&
    result.inputMetadata.crs !== 'Not available';

  const baseLat = 18.5204;
  const baseLng = 73.8567;

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy any previous instance
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      center: [baseLat, baseLng],
      zoom: 15,
      zoomControl: true,
      attributionControl: true,
    });

    mapInstanceRef.current = map;

    // Satellite imagery from Esri World Imagery
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: '© Esri, Maxar, Earthstar Geographics',
        maxZoom: 18,
      }
    ).addTo(map);

    // Scale control
    L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map);

    // Create custom pin icon matching Screenshot 2
    const createPinIcon = (isSelected: boolean) =>
      L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div style="position: relative; width: 26px; height: 34px; cursor: pointer;">
            <svg viewBox="0 0 24 32" width="26" height="34" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 20 12 20s12-11 12-20c0-6.627-5.373-12-12-12z" fill="${
                isSelected ? '#00d4ff' : '#4a90e2'
              }"/>
              <circle cx="12" cy="11" r="4.5" fill="#ffffff" />
            </svg>
          </div>
        `,
        iconSize: [26, 34],
        iconAnchor: [13, 34],
      });

    // Add bounding boxes and markers for each evidence region
    layersRef.current = {};

    result.evidence.forEach((ev: EvidenceRegion, index: number) => {
      if (!ev.bbox) return;

      const isNormalized = ev.bbox.width <= 1 && ev.bbox.height <= 1;
      const xmin = isNormalized ? ev.bbox.xmin : ev.bbox.xmin / 1000;
      const ymin = isNormalized ? ev.bbox.ymin : ev.bbox.ymin / 1000;
      const width = isNormalized ? ev.bbox.width : ev.bbox.width / 1000;
      const height = isNormalized ? ev.bbox.height : ev.bbox.height / 1000;

      // Project into approximate local geographic space around baseLat, baseLng
      const latSpan = 0.018;
      const lngSpan = 0.024;

      const north = baseLat + (0.5 - ymin) * latSpan;
      const south = north - height * latSpan;
      const west = baseLng + (xmin - 0.5) * lngSpan;
      const east = west + width * lngSpan;

      const bounds: L.LatLngBoundsExpression = [
        [south, west],
        [north, east],
      ];

      const rect = L.rectangle(bounds, {
        color: ev.color || '#38bdf8',
        weight: 2,
        fillColor: '#38bdf8',
        fillOpacity: 0.1,
      }).addTo(map);

      const marker = L.marker([south, west], {
        icon: createPinIcon(false),
      }).addTo(map);

      rect.on('click', () => onSelectRegion(ev.id));
      marker.on('click', () => onSelectRegion(ev.id));

      layersRef.current[ev.id] = { rect, marker };
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [result]);

  // Update selection highlight
  useEffect(() => {
    Object.entries(layersRef.current).forEach(([id, { rect, marker }]) => {
      const isSelected = id === selectedRegionId;
      rect.setStyle({
        weight: isSelected ? 3 : 2,
        color: isSelected ? '#00d4ff' : '#38bdf8',
        fillOpacity: isSelected ? 0.25 : 0.1,
      });
      if (isSelected && mapInstanceRef.current) {
        mapInstanceRef.current.panTo(rect.getBounds().getCenter(), { animate: true });
      }
    });
  }, [selectedRegionId]);

  return (
    <div className="rounded-xl border border-[#1c2e4a] bg-[#0c162a] p-4 lg:p-6 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
          GEOSPATIAL EVIDENCE
        </h3>
        <div className="font-mono text-xs text-slate-400">
          {hasGeoMetadata ? (
            <span>
              {result.inputMetadata.crs} · Res: {result.inputMetadata.resolution}
            </span>
          ) : (
            <span>18.52°N 73.85°E · 10 M</span>
          )}
        </div>
      </div>

      <div className="relative rounded-lg overflow-hidden border border-[#1c2e4a] bg-[#070d19] h-[380px] sm:h-[440px]">
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Spatial Coordinate Tag */}
        <div className="absolute bottom-2 right-2 z-[400] bg-black/80 px-2 py-1 rounded font-mono text-[10px] text-slate-300 pointer-events-none">
          {hasGeoMetadata
            ? `${result.inputMetadata.crs}`
            : '18.52°N 73.85°E · Relative Spatial Reference'}
        </div>
      </div>
    </div>
  );
};
