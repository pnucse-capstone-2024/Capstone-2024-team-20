import { useState } from 'react';
import MicroserviceList from './components/template/MicroserviceList';
import TemplateList from './components/template/TemplateList';
import UploadMicroservice from './components/template/UploadMicroservice';
import CreateTemplate from './components/template/CreateTemplate';

export default function App() {
  const [imageList, setImageList] = useState<string[]>([]);
  const [portVals, setPortVals] = useState<[number, string][][]>([]);
  const [envVals, setEnvVals] = useState<[string, string][][]>([]);
  const [volumeVals, setVolumeVals] = useState<[string, string, string][][]>([]);
  const [volumeMountVals, setVolumeMountVals] = useState<[string, string][][]>([]);
  const [pathPrefix, setPathPrefix] = useState<string[]>([]);

  return (
    <main style={{ minWidth: '1024px' }}>
      <MicroserviceList
        imageList={imageList}
        setImageList={setImageList}
        setPortVals={setPortVals}
        setEnvVals={setEnvVals}
        setVolVals={setVolumeVals}
        setVolMntVals={setVolumeMountVals}
      />
      <UploadMicroservice />
      <TemplateList />
      <CreateTemplate
        imageList={imageList}
        setImageList={setImageList}
        portVals={portVals}
        setPortVals={setPortVals}
        envVals={envVals}
        setEnvVals={setEnvVals}
        volumeVals={volumeVals}
        setVolumeVals={setVolumeVals}
        volumeMountVals={volumeMountVals}
        setVolumeMountVals={setVolumeMountVals}
        pathPrefix={pathPrefix}
        setPathPrefix={setPathPrefix}
      />
    </main>
  );
}
