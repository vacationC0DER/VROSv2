import React from 'react';
import { useScheduleStore } from '../../stores/scheduleStore';
import { MonthView } from './MonthView';
import { WeeklyCalendar } from './WeeklyCalendar';
import { DayView } from './DayView';

export function ScheduleContent() {
  const { viewMode } = useScheduleStore();

  switch (viewMode) {
    case 'month':
      return <MonthView />;
    case 'week':
    case 'workWeek':
      return <WeeklyCalendar workWeek={viewMode === 'workWeek'} />;
    case 'day':
      return <DayView />;
    default:
      return null;
  }
}