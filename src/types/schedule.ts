export interface ScheduleTask {
  id: string;
  title: string;
  description?: string;
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  completed: boolean;
  recurring: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface WeeklySchedule {
  monday: ScheduleTask[];
  tuesday: ScheduleTask[];
  wednesday: ScheduleTask[];
  thursday: ScheduleTask[];
  friday: ScheduleTask[];
  saturday: ScheduleTask[];
  sunday: ScheduleTask[];
}