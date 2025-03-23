import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import RegistrationStep1 from "./RegistrationStep1";
import RegistrationStep2 from "./RegistrationStep2";
import { Step1Provider } from "../context/Step1Context";

const RegistrationModal = ({ onClose }) => {
  const [step, setStep] = useState(1);

  const handleComplete = () => {
    alert("Реєстрація успішно завершена!");
    onClose();
  };

  return (
    <Step1Provider>
      <ModalWrapper onClose={onClose}>
        {step === 1 && <RegistrationStep1 onNext={() => setStep(2)} />}
        {step === 2 && <RegistrationStep2 onNext={handleComplete} />}
      </ModalWrapper>
    </Step1Provider>
  );
};

export default RegistrationModal;
