import React from 'react';
import { Header } from '../components';
import QuizStage from '../components/QuizStage';
import { StageProvider } from '../contexts/stageContext';
import { QuizCreationBody } from '../components';

export default function QuizCreation() {
  var stages = [1];
  return (
    <>
      <Header />

      <StageProvider>
        <div> quizCreation page</div>
        <QuizCreationBody />
      </StageProvider>
    </>
  );
}
