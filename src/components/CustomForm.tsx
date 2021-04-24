import React, { useState } from 'react';
import styled from 'styled-components';

const CustomForm = styled.div`
  border: 1px solid blue;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
`;

const CustomLabel = styled.div`
  width: 100px;
  margin-right: 5px;
`;

const CustomInput = styled.input`
  width: 300px;
`;

const CustomButton = styled.button`
  width: 400px;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`;

interface TaxiReservationData {
  distance: number;
  duration: number;
  startTime: string;
  id: number;
}

interface FormProps {
  setReservations: (e: TaxiReservationData[]) => void;
  reservations: TaxiReservationData[];
}

const Form: React.FC<FormProps> = ({
  setReservations,
  reservations,
}: FormProps) => {
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState('');

  const handleClick = (): void =>
    setReservations(
      reservations.concat({
        id: reservations.length + 1,
        distance,
        duration,
        startTime,
      }),
    );

  return (
    <CustomForm>
      <InputWrapper>
        <CustomLabel>Distance</CustomLabel>
        <CustomInput
          type="number"
          name="distance"
          id="distance"
          onChange={(e): void => setDistance(parseInt(e.target.value))}
        />
      </InputWrapper>
      <InputWrapper>
        <CustomLabel>Duration</CustomLabel>
        <CustomInput
          type="number"
          name="duration"
          id="duration"
          onChange={(e): void => setDuration(parseInt(e.target.value))}
        />
      </InputWrapper>
      <InputWrapper>
        <CustomLabel>Start date</CustomLabel>
        <CustomInput
          type="datetime-local"
          name="duration"
          id="duration"
          onChange={(e): void => setStartTime(e.target.value.concat('Z'))}
        />
      </InputWrapper>
      <CustomButton onClick={handleClick}>Add Reservation</CustomButton>
    </CustomForm>
  );
};

export default Form;
