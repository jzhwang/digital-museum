export interface ImagePrompt {
  angle: string;
  prompt: string;
  imageUrl?: string;
  isLoading?: boolean;
}

export interface ArtifactData {
  standardName: string;
  foreignName?: string;
  civilization: string;
  era: string;
  type: string;
  material: string;
  ownerOrUser: string;
  locationOrCollection: string;
  museumGuideText: string;
  deepAnalysis: string;
  viewingTips: string;
  imagePrompts: ImagePrompt[];
  technicalNote: string;
  imageUrl?: string;
  imageSource?: string;
}

export interface MuseumTreasure {
  name: string;
  reason: string;
}

export interface MuseumData {
  name: string;
  location: string;
  intro: string;
  treasures: MuseumTreasure[];
  imageUrl?: string;
  imageSource?: string;
}

export type ResultType = 'ARTIFACT' | 'MUSEUM';

export interface AnalysisResult {
  resultType: ResultType;
  artifact?: ArtifactData;
  museum?: MuseumData;
}

export interface AnalysisState {
  loading: boolean;
  data: AnalysisResult | null;
  error: string | null;
  heroImage: string | null;
  generatingImage: boolean;
}