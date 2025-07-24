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
        totalJobs={6}
        filteredJobs={jobs.length}
        contactedCount={contactedJobs.size}
        uniqueStates={uniqueStates.length}
      />

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <div className="md:w-1/2 md:border-r border-gray-200 order-2 md:order-1 h-2/3 md:h-auto overflow-y-auto">
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

        <div className="md:w-1/2 p-4 order-1 md:order-2 h-1/2 md:h-auto">
          <Map
            jobs={jobs}
            selectedJob={selectedJob || null}
            contactedJobs={contactedJobs}
            onJobSelect={setSelectedJobId}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
