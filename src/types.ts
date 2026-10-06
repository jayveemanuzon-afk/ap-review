export type CategoryType = 
  | 'lahat'
  | 'sektor-pamilihan'
  | 'daloy-produkto-salik'
  | 'daloy-salapi'
  | 'pamahalaan-buwis'
  | 'panlabas-kalakalan';

export interface ConceptNode {
  id: string;
  text: string;
  category: CategoryType;
  flowType: 'actor' | 'flow';
  x: number; // percentage in viewBox width (1280)
  y: number; // percentage in viewBox height (720)
  width: number;
  height: number;
  labelPosition?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  description: string;
  reviewHint: string;
  detailedReview: string;
  directionFrom?: string;
  directionTo?: string;
}

export interface NodeState {
  placedText: string | null;
  status: 'empty' | 'correct' | 'autofilled' | 'error';
  mistakes: number; // 0, 1, or 2
  lastErrorText?: string;
  lastMistakeTimestamp?: number;
}

export interface ReviewFeedback {
  isOpen: boolean;
  nodeId: string;
  nodeTitle: string;
  attemptedText: string;
  correctText: string;
  mistakesCount: number;
  isAutofilled: boolean;
  reviewHint: string;
  detailedReview: string;
}
