import { useEffect, useState } from 'react';
import MonitorWrapper from '../../remotes/MonitorWrapper';
import Toggle from '../common/Toggle';
import Dropdown from '../common/Dropdown';
import styles from '../styles/MonitorController.module.css';

interface MonitorControllerProps {
  namespace: string;
}

type Mode = '5분 전' | '30분 전' | '1시간 전' | '12시간 전' | '24시간 전';

export default function MonitorController({ namespace }: MonitorControllerProps) {
  const [enableSlices, setEnableSlices] = useState<boolean>(false);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
  const [mode, setMode] = useState<Mode>('5분 전');
  const [start, setStart] = useState<number>(null);
  const [end, setEnd] = useState<number>(null);
  const [step, setStep] = useState<string>(null);

  useEffect(() => {
    const endNum = Math.floor(Date.now() / 1000);

    let diff = 5 * 60;
    if (mode === '30분 전') {
      diff = 30 * 60;
    } else if (mode === '1시간 전') {
      diff = 1 * 60 * 60;
    } else if (mode === '12시간 전') {
      diff = 12 * 60 * 60;
    } else if (mode === '24시간 전') {
      diff = 24 * 60 * 60;
    }

    const startNum = endNum - diff;
    const stepStr = `${Math.floor((endNum - startNum) / 10)}s`;

    setStart(startNum);
    setEnd(endNum);
    setStep(stepStr);
  }, [mode]);

  return (
    <div className={styles.container}>
      <div className={styles.controller}>
        <Toggle
          label="Enable slices"
          value={enableSlices}
          setValue={setEnableSlices}
        />
        {/* <Toggle
          label="Auto refresh"
          value={autoRefresh}
          setValue={setAutoRefresh}
        /> */}
        <Dropdown
          options={[
            '5분 전',
            '30분 전',
            '1시간 전',
            '12시간 전',
            '24시간 전',
          ]}
          selectedOption={mode}
          setSelectedOption={setMode}
        />
        {/* {mode === 'specific' && (
          <div>
            <input
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              max={end}
            />
            <span>
              {' '}
              ~
              {' '}
            </span>
            <input
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              min={start}
            />
          </div>
        )} */}
      </div>
      <MonitorWrapper
        namespace={namespace}
        enableSlices={enableSlices}
        autoRefresh={autoRefresh}
        start={start}
        end={end}
        step={step}
      />
    </div>
  );
}
