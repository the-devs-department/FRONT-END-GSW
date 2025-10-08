import React, { createContext, useContext, useState, type ReactNode } from 'react';
import successIcon from '../assets/Success.png'
import errorIcon from '../assets/Error.png'


interface FeedbackState {
  isShown: boolean;
  kind: 'Sucesso' | 'Erro' | null;
  mainText: string;
  secondText: string;
  image: string,
}

interface FeedbackContextType {
  feedback: FeedbackState;
  showFeedback: (kind: 'Sucesso' | 'Erro', mainText: string, secondText: string) => void;
  hideFeedback: () => void;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

const initialFeedbackState: FeedbackState = {
  isShown: false,
  kind: null,
  mainText: '',
  secondText: '',
  image: '',
};

interface FeedbackProviderProps {
  children: ReactNode;
}

export const FeedbackProvider: React.FC<FeedbackProviderProps> = ({ children }) => {
  const [feedback, setFeedback] = useState<FeedbackState>(initialFeedbackState);

  const showFeedback = (kind: 'Sucesso' | 'Erro', mainText: string, secondText: string) => {
    const imageToUse = kind === 'Sucesso' ? successIcon : errorIcon

    setFeedback({
      isShown: true,
      kind,
      mainText,
      secondText,
      image : imageToUse,
    });

    setTimeout(() => {
      setFeedback((prev) => ({ ...prev, isShown: false }));
    }, 5000);
  };

  const hideFeedback = () => {
    setFeedback(initialFeedbackState);
  };

  const contextValue: FeedbackContextType = {
    feedback,
    showFeedback,
    hideFeedback,
  };

  return (
    <FeedbackContext.Provider value={contextValue}>
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
};