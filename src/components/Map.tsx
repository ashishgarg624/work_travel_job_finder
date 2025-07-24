import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Job } from "../types/Job";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface MapProps {
  jobs: Job[];
  selectedJob: Job | null;
  contactedJobs: Set<string>;
  onJobSelect: (jobId: string) => void;
}

const FitBoundsComponent: React.FC<{ jobs: Job[] }> = ({ jobs }) => {
  const map = useMap();

  useEffect(() => {
    if (jobs.length > 0) {
      const bounds = L.latLngBounds(
        jobs.map((job) => [job.latitude, job.longitude])
      );
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [jobs, map]);

  return null;
};

const createCustomIcon = (isSelected: boolean, isContacted: boolean) => {
  const color = isSelected ? "#0EA5E9" : isContacted ? "#10B981" : "#EF4444";

  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 20px;
        height: 20px;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        ${isSelected ? "transform: scale(1.2);" : ""}
      "></div>
    `,
    className: "custom-marker",
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

export const Map: React.FC<MapProps> = ({
  jobs,
  selectedJob,
  contactedJobs,
  onJobSelect,
}) => {
  const mapRef = useRef<L.Map>(null);

  useEffect(() => {
    if (selectedJob && mapRef.current) {
      mapRef.current.setView([selectedJob.latitude, selectedJob.longitude], 12);
    }
  }, [selectedJob]);

  return (
    <div className="h-full w-full relative">
      <MapContainer
        ref={mapRef}
        center={[-25.2744, 133.7751]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
        className="rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBoundsComponent jobs={jobs} />

        {jobs.map((job) => (
          <Marker
            key={job.companyId}
            position={[job.latitude, job.longitude]}
            icon={createCustomIcon(
              selectedJob?.companyId === job.companyId,
              contactedJobs.has(job.companyId)
            )}
            eventHandlers={{
              click: () => onJobSelect(job.companyId),
            }}
          >
            <Popup>
              <div className="p-2 min-w-[250px]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">
                    {job.companyName}
                  </h3>
                  {contactedJobs.has(job.companyId) && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Contacted
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-1">{job.industry}</p>
                <p className="text-sm text-gray-700 mb-2">{job.address}</p>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Contact:</strong> {job.firstName} {job.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    <a href={`mailto:${job.email}`} className="text-blue-600">
                      {job.email}
                    </a>
                  </p>
                  <p>
                    <strong>Phone:</strong>{" "}
                    <a
                      href={`tel:${job.phoneNumber}`}
                      className="text-blue-600"
                    >
                      {job.phoneNumber}
                    </a>
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {jobs.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-center">
            <div className="text-gray-400 text-6xl mb-4">🗺️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No locations to display
            </h3>
            <p className="text-gray-600">
              Adjust your filters to see job locations on the map.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
