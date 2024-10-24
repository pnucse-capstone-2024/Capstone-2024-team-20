import { useEffect } from 'react';
import { Venue } from '../../utils/type';
import Dropdown from '../common/Dropdown';
import Label from '../common/Label';
import styles from '../styles/VenueAndPrice.module.css';

interface VenueAndPriceProps {
  selectedVenue: string;
  setSelectedVenue: React.Dispatch<React.SetStateAction<string>>;
  venues: Venue[];
  priceMap: Map<string, {
    price: number;
    count: number;
  }>;
  setPriceMap: React.Dispatch<React.SetStateAction<Map<string, {
    price: number;
    count: number;
  }>>>;
  isStanding?: boolean;
}

export default function VenueAndPrice({
  selectedVenue,
  setSelectedVenue,
  venues,
  priceMap,
  setPriceMap,
  isStanding = false,
}: VenueAndPriceProps) {
  const currentVenue = venues.find((v) => v.name === selectedVenue);

  useEffect(() => {
    const newMap = new Map();

    currentVenue?.sections.forEach((section) => {
      newMap.set(section.sectionName, {
        price: 0,
        count: 0,
      });
    });

    setPriceMap(newMap);
  }, [currentVenue]);

  return (
    <>
      <Label name="공연 장소">
        <Dropdown
          options={venues.map(({ name }) => name)}
          selectedOption={selectedVenue}
          setSelectedOption={setSelectedVenue}
        />
      </Label>
      {selectedVenue !== '' && (
        <div>
          <div className={styles.priceLabel}>구역 별 가격</div>
          <div className={styles.priceContainer}>
            <img
              className={styles.venueImage}
              src={currentVenue?.backgroundImage}
              alt="공연장 좌석 배치도"
            />
            <div className={styles.venuePrice}>
              {currentVenue?.sections
                .map(({ sectionName }) => {
                  const sectionTotalSeatCount = currentVenue.sections
                    .find((s) => s.sectionName === sectionName).seats.length;

                  return (
                    <div
                      key={sectionName}
                      className={styles.inputContainer}
                    >
                      <Label
                        name={`${sectionName} 구역`}
                        unit="원"
                      >
                        <input
                          className={styles.input}
                          type="text"
                          name={`${sectionName} 구역`}
                          id={`${sectionName} 구역`}
                          value={priceMap.get(sectionName)?.price || ''}
                          onChange={(e) => {
                            if (/^[0-9]*$/g.test(e.target.value)) {
                              setPriceMap((prev) => {
                                const newMap = new Map(prev);
                                newMap.set(sectionName, {
                                  ...prev.get(sectionName),
                                  price: Math.min(Number(e.target.value), 100_000_000),
                                });
                                return newMap;
                              });
                            }
                          }}
                        />
                      </Label>
                      <Label
                        name={`${sectionName} 구역 티켓 수량`}
                        unit="개"
                      >
                        <input
                          className={styles.input}
                          type="text"
                          name={`${sectionName} 구역 티켓 수량`}
                          id={`${sectionName} 구역 티켓 수량`}
                          value={priceMap.get(sectionName)?.count || ''}
                          onChange={(e) => {
                            const { value } = e.target;

                            if (/^[0-9]*$/g.test(value)) {
                              setPriceMap((prev) => {
                                const newMap = new Map(prev);
                                newMap.set(sectionName, {
                                  ...prev.get(sectionName),
                                  count: Math.min(Number(value), sectionTotalSeatCount),
                                });
                                return newMap;
                              });
                            }
                          }}
                        />
                      </Label>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
