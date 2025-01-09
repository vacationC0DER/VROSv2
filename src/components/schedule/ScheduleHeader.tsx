export function ScheduleHeader() {
  const { currentDate, viewMode, setCurrentDate, setViewMode } = useScheduleStore();

  // ... rest of imports and handlers remain the same ...

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold">My Focus</h1>
        <p className="text-gray-600">Manage your tasks and priorities</p>
      </div>

      {/* Rest of header content remains the same */}
    </div>
  );
}