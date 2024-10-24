import { GetSpec, UploadImage } from '../utils/type';
import { poolInstance, templateInstance } from './instance';

interface CreateTemplateParams {
  name: string;
  nickname: string;
  description: string;
  type: string[];
  images: string[];
  pathPrefix: string[];
  portVals: [number, string][][];
  envVals: [string, string][][];
  volVals: [string, string, string][][];
  volMntVals: [string, string][][];
}

export async function getImageList() {
  return poolInstance.get('/list');
}

export async function uploadImage({ gitUrl, imageName, spec }: UploadImage) {
  return poolInstance.post('./upload', {
    git_url: gitUrl,
    image_name: imageName,
    spec,
  });
}

export async function getSpec({ repoName, imageName }: GetSpec) {
  return poolInstance.get(`./spec/${repoName}/${imageName}`);
}

export async function getTemplateList() {
  return templateInstance.get('/list');
}

export async function getTemplateDetail({ item }: { item: string }) {
  return templateInstance.get(`/get/${item}`);
}

export async function createTemplate({
  name,
  nickname,
  description,
  type,
  images,
  portVals,
  envVals,
  volVals,
  volMntVals,
  pathPrefix,
}: CreateTemplateParams) {
  return templateInstance.post('/create', {
    name,
    nickname,
    description,
    type,
    images,
    port_vals: portVals,
    env_vals: envVals,
    volume_mount_vals: volMntVals,
    volume_vals: volVals,
    path_prefix: pathPrefix,
  });
}

export async function deleteTempalte({ item }: { item: string }) {
  return templateInstance.delete(`/delete/${item}`);
}
