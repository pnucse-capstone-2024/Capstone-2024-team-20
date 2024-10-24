import { templateInstance } from './instance';

export function getTemplateList() {
  return templateInstance.get('/list');
}
