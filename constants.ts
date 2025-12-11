import { NavItem, SlideData, ProgramCardData } from './types';

export const ADMIN_CONFIG = {
  password: process.env.ADMIN_PASSWORD || 'admin123', // Configurable via environment or here
  maxLoginAttempts: 3,
  lockoutTimeMs: 30000, // 30 seconds
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: 'https://aucdt.edu.gh/' },
  { 
    label: 'About Us', 
    href: 'https://aucdt.edu.gh/about/',
    children: [
      { label: 'The University', href: 'https://aucdt.edu.gh/about/' },
      { label: 'Governing Council', href: '#' },
      { label: 'Management', href: '#' },
      { label: 'Accreditation & Affiliation', href: '#' },
    ]
  },
  { 
    label: 'Academics', 
    href: 'https://aucdt.edu.gh/academics/',
    children: [
      { label: 'Academic Calendar', href: '#' },
      { label: 'Faculties', href: '#' },
      { label: 'Student Handbook', href: '#' }
    ]
  },
  { 
    label: 'Departments', 
    href: 'https://aucdt.edu.gh/departments/',
    children: [
      { label: 'Product Design & Entrepreneurship', href: 'https://aucdt.edu.gh/departments/department-of-product-design/product-design-entrepreneurship/' },
      { label: 'Jewellery Design Technology', href: 'https://aucdt.edu.gh/departments/jewellery-design-technology/' },
      { label: 'Digital Media & Comm. Design', href: 'https://aucdt.edu.gh/departments/digital-media-and-communication-design-department/digital-media-and-communication-design/' },
      { label: 'Fashion Design Technology', href: 'https://aucdt.edu.gh/departments/fashion-design/' },
      { label: 'Short Courses', href: 'https://aucdt.edu.gh/departments/short-courses/' }
    ]
  },
  { 
    label: 'Admissions', 
    href: 'https://aucdt.edu.gh/admissions/',
    children: [
      { label: 'How to Apply', href: '#' },
      { label: 'Entry Requirements', href: '#' },
      { label: 'Fees & Scholarships', href: 'https://aucdt.edu.gh/admissions/scholarship/' },
      { label: 'Apply Online', href: 'https://portal.aucdt.edu.gh/admissions/#/home' }
    ]
  },
  { label: 'Ofosua Library', href: 'https://ol.aucdt.edu.gh/' },
  { label: 'Newsroom', href: 'https://aucdt.edu.gh/newsroom/' },
  { label: 'Resources', href: 'https://aucdt.edu.gh/resources/' },
];

export const HERO_SLIDES: SlideData[] = [
  {
    id: 1,
    title: "Department of",
    subtitle: "Product Design",
    image: "https://aucdt.edu.gh/wp-content/uploads/2020/08/Product-Design-material-test.jpg",
    ctaLink: "https://aucdt.edu.gh/departments/department-of-product-design/product-design-entrepreneurship/",
    ctaText: "Read More",
    darkOverlay: true
  },
  {
    id: 2,
    title: "Department of",
    subtitle: "Jewellery Design",
    image: "https://aucdt.edu.gh/wp-content/uploads/2022/09/Student-ring-design.jpg",
    ctaLink: "https://aucdt.edu.gh/departments/jewellery-design-technology/",
    ctaText: "Read More",
    darkOverlay: true
  },
  {
    id: 3,
    title: "Department of Digital Media",
    subtitle: "and Communication Design",
    image: "https://aucdt.edu.gh/wp-content/uploads/2023/04/Digital-Media-and-Communication-Design-Banner.jpg",
    ctaLink: "https://aucdt.edu.gh/departments/digital-media-and-communication-design-department/digital-media-and-communication-design/",
    ctaText: "Read More",
    darkOverlay: true
  },
  {
    id: 4,
    title: "Welcome to the Department of",
    subtitle: "Fashion Design",
    image: "https://aucdt.edu.gh/wp-content/uploads/2022/06/aucdt-fashion3.jpg",
    ctaLink: "https://aucdt.edu.gh/departments/fashion-design/",
    ctaText: "Read More",
    darkOverlay: true
  },
  {
    id: 5,
    title: "SCHOLARSHIP OPPORTUNITY",
    subtitle: "AsanSka Minerals Scholarship for the 2025 Academic Year.",
    image: "https://aucdt.edu.gh/wp-content/uploads/2022/07/AUCDT-Building.jpg",
    ctaLink: "https://aucdt.edu.gh/admissions/scholarship/",
    ctaText: "Read More",
    darkOverlay: true
  },
  {
    id: 6,
    title: "Browse Short Courses",
    subtitle: "Experience the Best in Design Education",
    image: "https://aucdt.edu.gh/wp-content/uploads/2023/04/Digital-Media-and-Communication-Design-Banner.jpg",
    ctaLink: "https://aucdt.edu.gh/departments/short-courses/",
    ctaText: "View Short Courses",
    darkOverlay: true
  }
];

export const PROGRAMS: ProgramCardData[] = [
  {
    id: 1,
    title: "BA Product Design & Entrepreneurship",
    description: "This Four (4) Academic year programme together with basic entrepreneurship courses and the necessary principles of design will equip our youth with the needed skills leading to self-employment.",
    image: "https://picsum.photos/600/400?random=10",
    badge: "Degree",
    link: "#"
  },
  {
    id: 2,
    title: "BTech Digital Media and Communication Design",
    description: "A four year programme which exposes students to courses related to Graphic Design, Photography, digital media, web design, motion graphics etc.",
    image: "https://picsum.photos/600/400?random=11",
    badge: "Degree",
    link: "#"
  },
  {
    id: 3,
    title: "BTech Fashion Design Technology",
    description: "Our four year BTech Fashion Design Technology programme aims at providing you with the skills necessary to further your career as a fashion designer.",
    image: "https://picsum.photos/600/400?random=12",
    badge: "Degree",
    link: "#"
  },
  {
    id: 4,
    title: "BA Jewellery Design Technology",
    description: "A four year degree programme aimed at equipping students with knowledge, philosophies and resources requisite for intellectual inquiry into Jewellery Design.",
    image: "https://picsum.photos/600/400?random=13",
    badge: "Degree",
    link: "#"
  },
  {
    id: 5,
    title: "Certificate in Bench Jewellery",
    description: "This course seeks to train students to acquire the prerequisite hands-on-skills in Jewellery Design for them to become professional Bench Jewellers.",
    image: "https://picsum.photos/600/400?random=14",
    badge: "Certificate",
    link: "#"
  },
  {
    id: 6,
    title: "Short Courses",
    description: "Experience the Best in Design Education: Short Courses in Digital Media, Fashion, and Jewelry Design at AsanSka University College of Design and Technology.",
    image: "https://picsum.photos/600/400?random=15",
    badge: "Certificate",
    link: "#"
  }
];