import { Header } from "./components/Header";
import { JobList } from "./components/JobList";
import { Map } from "./components/Map";
import { StatsPanel } from "./components/StatsPanel";
import { useJobs } from "./hooks/useJobs";

function App() {
  const {
    jobs,
    filters,
    setFilters,
    contactedJobs,
    toggleContactedJob,
    selectedJob,
    setSelectedJobId,
    uniqueStates,
    uniqueIndustries,
  } = useJobs();

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header />

      <StatsPanel
        totalJobs={250}
        filteredJobs={jobs.length}
        contactedCount={contactedJobs.size}
        uniqueStates={uniqueStates.length}
      />

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Map on top for mobile, left for desktop */}
        <div className="w-full md:w-2/3 p-4 order-1 md:order-2 h-56 md:h-auto flex-shrink-0">
          <Map
            jobs={jobs}
            selectedJob={selectedJob || null}
            contactedJobs={contactedJobs}
            onJobSelect={setSelectedJobId}
          />
        </div>

        {/* JobList below Map on mobile, right on desktop */}
        <div className="w-full md:w-1/3 md:border-r border-gray-200 order-2 md:order-1 flex-1 min-h-0 flex flex-col ">
          <JobList
            jobs={jobs}
            filters={filters}
            onFiltersChange={setFilters}
            uniqueStates={uniqueStates}
            uniqueIndustries={uniqueIndustries}
            contactedJobs={contactedJobs}
            selectedJobId={selectedJob?.companyId || null}
            onJobSelect={setSelectedJobId}
            onToggleContacted={toggleContactedJob}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
