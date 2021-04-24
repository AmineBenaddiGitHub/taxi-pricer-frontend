import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { intervalToDuration } from 'date-fns';
import add from 'date-fns/add';
import axios from 'axios';

interface ReservationProps {
  distance: number;
}

const ReservationWrapper = styled.div<ReservationProps>`
  border: 1px grey solid;
  border-radius: 5px;
  cursor: pointer;
  ${({ distance }): string =>
    distance > 2 ? 'background-color: tomato;' : 'background-color: white;'}
  margin-right: 5px;
  margin: 10px;
`;

const ReservationData = styled.p``;

export interface TaxiReservationData {
  distance: number;
  duration: number;
  startTime: string;
  id: number;
}

interface TileProps {
  element: TaxiReservationData;
}

const Reservation: React.FC<TileProps> = ({ element }: TileProps) => {
  const [price, setPrice] = useState(0);
  const [clicked, setClicked] = useState(false);

  const handleClick = (): void => {
    const time = intervalToDuration({
      start: 0,
      end: element.duration * 1000,
    });
    const arrival = new Date(element.startTime);
    arrival.setSeconds(arrival.getSeconds() + element.duration);
    setClicked(true);

    // eslint-disable-next-line no-undef
    alert(
      `Duration: ${time.hours}:${time.minutes}:${time.seconds} \nArrival: ${add(
        new Date(element.startTime),
        {
          seconds: element.duration,
        },
      )}`,
    );
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fetchData = async (): Promise<any> => {
      const result = await axios({
        method: 'post',
        url: 'http://localhost:5000/ride',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          distance: element.distance,
          startTime: element.startTime,
        },
      });
      setPrice(result.data.message === 'OK' ? result.data.price : 0);
    };

    fetchData();
  }, [price, setPrice, element.distance, element.startTime]);

  return (
    <ReservationWrapper distance={element.distance} onClick={handleClick}>
      <ReservationData>Ride id: {element.id}</ReservationData>
      <ReservationData>{price !== 0 && `${price} EUR`}</ReservationData>
      <ReservationData>{clicked && 'Clicked !'}</ReservationData>
    </ReservationWrapper>
  );
};

export default Reservation;
