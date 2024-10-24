import { getAccessToken } from '../utils/token';
import { deployInstance } from './instance';

export async function createNamespace({
  namespace,
  templateName,
}: {
  namespace: string,
  templateName: string
}) {
  return deployInstance.get(`/start/${namespace}/${templateName}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
}

export async function getNamespaces() {
  return deployInstance.get('/list', {
    headers: {
      Authorization: getAccessToken(),
    },
  });
}

export async function deleteService({ namespace }: { namespace: string }) {
  return deployInstance.delete(`/stop/${namespace}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
}

export async function updateService({ namespace, templateName } : {
  namespace: string,
  templateName: string
}) {
  return deployInstance.get(`/update/${namespace}/${templateName}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
}
