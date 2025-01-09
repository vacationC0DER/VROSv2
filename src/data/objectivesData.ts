import { Objective } from '../types/objective';

// Core objectives (parent objectives)
const coreObjectives: Objective[] = [
  {
    id: 'core-1',
    title: 'Financial Excellence',
    description: 'Drive sustainable financial growth and operational efficiency',
    category: 'F1',
    department_id: 'd1',
    owner_id: 'u1',
    progress: 68,
    status: 'in_progress',
    created_at: new Date('2024-01-01').toISOString(),
    updated_at: new Date().toISOString(),
    department: {
      name: 'Finance'
    },
    owner: {
      first_name: 'James',
      last_name: 'Wilson'
    }
  },
  {
    id: 'core-2',
    title: 'Customer Success',
    description: 'Deliver exceptional customer experiences and value',
    category: 'C1',
    department_id: 'd2',
    owner_id: 'u2',
    progress: 75,
    status: 'in_progress',
    created_at: new Date('2024-01-01').toISOString(),
    updated_at: new Date().toISOString(),
    department: {
      name: 'Guest Services'
    },
    owner: {
      first_name: 'Sarah',
      last_name: 'Johnson'
    }
  },
  {
    id: 'core-3',
    title: 'Operational Excellence',
    description: 'Optimize internal processes and efficiency',
    category: 'P1',
    department_id: 'd3',
    owner_id: 'u3',
    progress: 45,
    status: 'at_risk',
    created_at: new Date('2024-01-01').toISOString(),
    updated_at: new Date().toISOString(),
    department: {
      name: 'Operations'
    },
    owner: {
      first_name: 'Michael',
      last_name: 'Chen'
    }
  },
  {
    id: 'core-4',
    title: 'Innovation & Growth',
    description: 'Drive innovation and market expansion',
    category: 'E1',
    department_id: 'd4',
    owner_id: 'u4',
    progress: 82,
    status: 'in_progress',
    created_at: new Date('2024-01-01').toISOString(),
    updated_at: new Date().toISOString(),
    department: {
      name: 'Strategy'
    },
    owner: {
      first_name: 'Lisa',
      last_name: 'Taylor'
    }
  }
];

// Child objectives linked to core objectives
const childObjectives: Objective[] = [
  // Financial Excellence children
  {
    id: 'obj-f1',
    title: 'Revenue Growth',
    description: 'Increase revenue through market expansion and pricing optimization',
    category: 'F1',
    department_id: 'd1',
    owner_id: 'u5',
    parent_objective_id: 'core-1',
    progress: 72,
    status: 'in_progress',
    created_at: new Date('2024-01-15').toISOString(),
    updated_at: new Date().toISOString(),
    department: {
      name: 'Sales'
    },
    owner: {
      first_name: 'David',
      last_name: 'Martinez'
    }
  },
  {
    id: 'obj-f2',
    title: 'Cost Optimization',
    description: 'Reduce operational costs while maintaining service quality',
    category: 'F2',
    department_id: 'd1',
    owner_id: 'u6',
    parent_objective_id: 'core-1',
    progress: 65,
    status: 'in_progress',
    created_at: new Date('2024-01-15').toISOString(),
    updated_at: new Date().toISOString(),
    department: {
      name: 'Finance'
    },
    owner: {
      first_name: 'Emma',
      last_name: 'Thompson'
    }
  },
  
  // Customer Success children
  {
    id: 'obj-c1',
    title: 'Guest Satisfaction',
    description: 'Improve guest satisfaction scores to 4.8+',
    category: 'C1',
    department_id: 'd2',
    owner_id: 'u7',
    parent_objective_id: 'core-2',
    progress: 85,
    status: 'in_progress',
    created_at: new Date('2024-01-15').toISOString(),
    updated_at: new Date().toISOString(),
    department: {
      name: 'Guest Services'
    },
    owner: {
      first_name: 'Rachel',
      last_name: 'Kim'
    }
  },
  {
    id: 'obj-c2',
    title: 'Owner Relations',
    description: 'Enhance property owner satisfaction and retention',
    category: 'C2',
    department_id: 'd2',
    owner_id: 'u8',
    parent_objective_id: 'core-2',
    progress: 65,
    status: 'at_risk',
    created_at: new Date('2024-01-15').toISOString(),
    updated_at: new Date().toISOString(),
    department: {
      name: 'Owner Services'
    },
    owner: {
      first_name: 'Thomas',
      last_name: 'Anderson'
    }
  },

  // Operational Excellence children
  {
    id: 'obj-p1',
    title: 'Process Automation',
    description: 'Implement automation for key operational processes',
    category: 'P1',
    department_id: 'd3',
    owner_id: 'u9',
    parent_objective_id: 'core-3',
    progress: 40,
    status: 'at_risk',
    created_at: new Date('2024-01-15').toISOString(),
    updated_at: new Date().toISOString(),
    department: {
      name: 'Operations'
    },
    owner: {
      first_name: 'Alex',
      last_name: 'Rivera'
    }
  },
  {
    id: 'obj-p2',
    title: 'Quality Management',
    description: 'Enhance quality control processes and standards',
    category: 'P2',
    department_id: 'd3',
    owner_id: 'u10',
    parent_objective_id: 'core-3',
    progress: 50,
    status: 'in_progress',
    created_at: new Date('2024-01-15').toISOString(),
    updated_at: new Date().toISOString(),
    department: {
      name: 'Quality'
    },
    owner: {
      first_name: 'Sophie',
      last_name: 'Garcia'
    }
  },

  // Innovation & Growth children
  {
    id: 'obj-e1',
    title: 'Market Expansion',
    description: 'Enter three new metropolitan markets',
    category: 'E1',
    department_id: 'd4',
    owner_id: 'u11',
    parent_objective_id: 'core-4',
    progress: 90,
    status: 'in_progress',
    created_at: new Date('2024-01-15').toISOString(),
    updated_at: new Date().toISOString(),
    department: {
      name: 'Strategy'
    },
    owner: {
      first_name: 'Marcus',
      last_name: 'Lee'
    }
  },
  {
    id: 'obj-e2',
    title: 'Technology Innovation',
    description: 'Implement new property management platform',
    category: 'E2',
    department_id: 'd4',
    owner_id: 'u12',
    parent_objective_id: 'core-4',
    progress: 75,
    status: 'in_progress',
    created_at: new Date('2024-01-15').toISOString(),
    updated_at: new Date().toISOString(),
    department: {
      name: 'Technology'
    },
    owner: {
      first_name: 'Julia',
      last_name: 'Patel'
    }
  }
];

export const sampleObjectives: Objective[] = [...coreObjectives, ...childObjectives];