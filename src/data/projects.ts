export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Web Apps' | 'Full-Stack' | 'UI/UX' | 'Open Source';
  description: string;
  longDescription: string;
  techStack: string[];
  features: string[];
  metrics?: { label: string; value: string }[];
  image: string;
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  year: string;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 'dermascan-ai',
    title: 'DermaScan-AI',
    subtitle: 'AI-Powered Skin Cancer Detection & Diagnostic Engine',
    category: 'Web Apps',
    description:
      'Deep learning diagnostic platform utilizing Computer Vision and CNNs to analyze dermoscopic images, classifying skin cancer lesions with high precision and visual heatmaps.',
    longDescription:
      'DermaScan-AI is an advanced computer vision platform designed for early-stage skin lesion classification and cancer screening assistance. Utilizing ensemble deep neural networks trained on thousands of validated clinical dermoscopic images, DermaScan-AI classifies lesions into 7 diagnostic categories including Melanoma and Basal Cell Carcinoma. The system generates explainable Grad-CAM heatmaps to pinpoint critical visual indicators, empowering medical practitioners with actionable diagnostic confidence metrics.',
    techStack: ['PyTorch', 'React', 'TypeScript', 'FastAPI', 'OpenCV', 'TailwindCSS'],
    features: [
      'Real-time Dermoscopic Image Classification',
      'Explainable AI Grad-CAM Visual Heatmaps',
      'Multi-class Cancer Risk Scoring Engine',
      'Patient Case History & Diagnostic Reporting',
      'High-throughput Cloud Inference API'
    ],
    metrics: [
      { label: 'Diagnostic Accuracy', value: '98.6%' },
      { label: 'Inference Latency', value: '<250ms' }
    ],
    image: '/dermascan_ai.svg',
    githubUrl: 'https://github.com/HetKalathiya/DermaScan-AI',
    liveUrl: '',
    featured: true,
    year: '2024'
  },
  {
    id: 'geo-map',
    title: 'Geo Map',
    subtitle: 'Interactive Geospatial Analytics & Tracking Platform',
    category: 'Full-Stack',
    description:
      'High-performance GIS mapping web application providing real-time location telemetry tracking, dynamic vector map layers, 3D terrain, and spatial analysis.',
    longDescription:
      'Geo Map is an interactive geospatial visualization and analytics application built for processing complex geographic datasets and real-time spatial telemetry. Powered by Mapbox GL, Deck.gl, and WebGL rendering, Geo Map supports seamless 3D elevation terrain maps, dynamic density heatmaps, custom route optimization, and spatial proximity calculations. Users can filter high-density coordinate layers, plot custom geo-fences, and export GeoJSON spatial datasets instantly.',
    techStack: ['React', 'TypeScript', 'Mapbox GL', 'Deck.gl', 'Node.js', 'Turf.js', 'PostGIS'],
    features: [
      'Interactive 3D Terrain & Elevation Maps',
      'Real-time Telemetry Tracking & Marker Management',
      'Dynamic Spatial Heatmaps & Density Analytics',
      'GeoJSON Data Import/Export & Buffer Queries',
      'Custom Map Style & Vector Layer Toggles'
    ],
    metrics: [
      { label: 'Render Performance', value: '60 FPS' },
      { label: 'Spatial Points Handled', value: '100k+' }
    ],
    image: '/geo_map.svg',
    githubUrl: 'https://github.com/HetKalathiya/Geo_Map',
    liveUrl: '',
    featured: true,
    year: '2024'
  }
];
