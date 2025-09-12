// models/dashboard.model.ts

export interface Stat {
    title: string;
    value: number | string; // رقم أو نص (زي إجمالي المبيعات بالدولار)
    icon: string;
    bg?: string; // اختياري للخلفية
  }
  
  export interface Activity {
    message: string;
    time: string | Date;
  }
  
  export interface Notification {
    type: 'user' | 'instructor_pending' | 'course' | 'payment' | 'custom';        
    message: string;       
    createdAt: string;     
    read?: boolean;  
  }
  