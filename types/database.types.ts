export interface User {
  id: string;
  name: string;
  email: string;
  profile_photo?: string;
  bio?: string;
  refined_bio?: string;
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  title: string;
  description: string;
  refined_description?: string;
  project_link?: string;
  image_url?: string;
  created_at: string;
}

export interface Skill {
  id: string;
  user_id: string;
  skill_name: string;
  proficiency: string;
  created_at: string;
}

export interface Experience {
  id: string;
  user_id: string;
  company_name: string;
  role: string;
  description: string;
  refined_description?: string;
  start_date: string;
  end_date?: string;
  created_at: string;
}

export interface Education {
  id: string;
  user_id: string;
  institution_name: string;
  degree: string;
  field_of_study: string;
  start_year: number;
  end_year?: number;
  created_at: string;
}

export interface PortfolioData {
  user: User;
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  education: Education[];
}
