import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import RegistrationStep1 from "./RegistrationStep1";

const RegistrationModal = ({ onClose }) => {
  const [step, setStep] = useState(1);

  return (
    <ModalWrapper onClose={onClose}>
      {step === 1 && <RegistrationStep1 onNext={() => setStep(2)} />}
      {/* Додай інші кроки тут */}
    </ModalWrapper>
  );
};

export default RegistrationModal;
