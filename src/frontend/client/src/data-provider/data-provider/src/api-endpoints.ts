import type { AssistantsEndpoint } from './schemas';

export const health = () => '/health';
export const user = () => '/api/v1/user/info';

export const balance = () => '/api/balance';

export const userPlugins = () => '/api/user/plugins';

export const deleteUser = () => '/api/user/delete';

export const messages = (conversationId: string, messageId?: string) =>
  `/api/v1/workstation/messages/${conversationId}${messageId != null && messageId ? `/${messageId}` : ''}`;

const shareRoot = '/api/share';
export const shareMessages = (shareId: string) => `${shareRoot}/${shareId}`;
export const getSharedLink = (conversationId: string) => `${shareRoot}/link/${conversationId}`;
export const getSharedLinks = (
  pageSize: number,
  isPublic: boolean,
  sortBy: 'title' | 'createdAt',
  sortDirection: 'asc' | 'desc',
  search?: string,
  cursor?: string,
) =>
  `${shareRoot}?pageSize=${pageSize}&isPublic=${isPublic}&sortBy=${sortBy}&sortDirection=${sortDirection}${search ? `&search=${search}` : ''
  }${cursor ? `&cursor=${cursor}` : ''}`;
export const createSharedLink = (conversationId: string) => `${shareRoot}/${conversationId}`;
export const updateSharedLink = (shareId: string) => `${shareRoot}/${shareId}`;

const keysEndpoint = '/api/keys';

export const keys = () => keysEndpoint;

export const userKeyQuery = (name: string) => `${keysEndpoint}?name=${name}`;

export const revokeUserKey = (name: string) => `${keysEndpoint}/${name}`;

export const revokeAllUserKeys = () => `${keysEndpoint}?all=true`;

export const abortRequest = (endpoint: string) => `/api/ask/${endpoint}/abort`;

export const conversationsRoot = '/api/convos';

export const conversations = (pageNumber: string, isArchived?: boolean, tags?: string[]) =>
  `/api/v1/chat/list?flow_type=15&page=${pageNumber}&limit=40${tags?.map((tag) => `&tags=${tag}`).join('')}`;

export const conversationById = (id: string) => `${conversationsRoot}/${id}`;

export const genTitle = () => `/api/v1/workstation/gen_title`;

export const updateConversation = () => `/api/v1/chat/conversation/rename`;

export const deleteConversation = () => `/api/v1/chat/`;

export const importConversation = () => `${conversationsRoot}/import`;

export const forkConversation = () => `${conversationsRoot}/fork`;

export const duplicateConversation = () => `/api/v1/chat/conversation/copy`;

export const search = (q: string, pageNumber: string) =>
  `/api/search?q=${q}&pageNumber=${pageNumber}`;

export const searchEnabled = () => '/api/search/enable';

export const presets = () => '/api/presets';

export const deletePreset = () => '/api/presets/delete';

export const aiEndpoints = () => '/api/endpoints';

export const endpointsConfigOverride = () => '/api/endpoints/config/override';

export const models = () => '/api/models';

export const tokenizer = () => '/api/tokenizer';

export const login = () => '/api/auth/login';

export const logout = () => '/api/v1/user/logout';

export const register = () => '/api/auth/register';

export const loginFacebook = () => '/api/auth/facebook';

export const loginGoogle = () => '/api/auth/google';

export const refreshToken = (retry?: boolean) =>
  `/api/auth/refresh${retry === true ? '?retry=true' : ''}`;

export const requestPasswordReset = () => '/api/auth/requestPasswordReset';

export const resetPassword = () => '/api/auth/resetPassword';

export const verifyEmail = () => '/api/user/verify';

export const resendVerificationEmail = () => '/api/user/verify/resend';

export const plugins = () => '/api/plugins';

export const config = () => '/api/config';
export const bsConfig = () => '/api/v1/workstation/config';

export const prompts = () => '/api/prompts';

export const assistants = ({
  path = '',
  options,
  version,
  endpoint,
  isAvatar,
}: {
  path?: string;
  options?: object;
  endpoint?: AssistantsEndpoint;
  version: number | string;
  isAvatar?: boolean;
}) => {
  let url = isAvatar === true ? `${images()}/assistants` : `/api/assistants/v${version}`;

  if (path && path !== '') {
    url += `/${path}`;
  }

  if (endpoint) {
    options = {
      ...(options ?? {}),
      endpoint,
    };
  }

  if (options && Object.keys(options).length > 0) {
    const queryParams = new URLSearchParams(options as Record<string, string>).toString();
    url += `?${queryParams}`;
  }

  return url;
};

export const agents = ({ path = '', options }: { path?: string; options?: object }) => {
  let url = '/api/agents';

  if (path && path !== '') {
    url += `/${path}`;
  }

  if (options && Object.keys(options).length > 0) {
    const queryParams = new URLSearchParams(options as Record<string, string>).toString();
    url += `?${queryParams}`;
  }

  return url;
};

export const files = () => '/api/files';

export const images = () => `/api/v1/workstation/files`;

export const avatar = () => `${images()}/avatar`;

export const speech = () => `${files()}/speech`;

export const speechToText = () => `${speech()}/stt`;

export const textToSpeech = () => `${speech()}/tts`;

export const textToSpeechManual = () => `${textToSpeech()}/manual`;

export const textToSpeechVoices = () => `${textToSpeech()}/voices`;

export const getCustomConfigSpeech = () => `${speech()}/config/get`;

export const getPromptGroup = (_id: string) => `${prompts()}/groups/${_id}`;

export const getPromptGroupsWithFilters = (filter: object) => {
  let url = `${prompts()}/groups`;
  if (Object.keys(filter).length > 0) {
    const queryParams = new URLSearchParams(filter as Record<string, string>).toString();
    url += `?${queryParams}`;
  }
  return url;
};

export const getPromptsWithFilters = (filter: object) => {
  let url = prompts();
  if (Object.keys(filter).length > 0) {
    const queryParams = new URLSearchParams(filter as Record<string, string>).toString();
    url += `?${queryParams}`;
  }
  return url;
};

export const getPrompt = (_id: string) => `${prompts()}/${_id}`;

export const getRandomPrompts = (limit: number, skip: number) =>
  `${prompts()}/random?limit=${limit}&skip=${skip}`;

export const postPrompt = prompts;

export const updatePromptGroup = getPromptGroup;

export const updatePromptLabels = (_id: string) => `${getPrompt(_id)}/labels`;

export const updatePromptTag = (_id: string) => `${getPrompt(_id)}/tags/production`;

export const deletePromptGroup = getPromptGroup;

export const deletePrompt = ({ _id, groupId }: { _id: string; groupId: string }) => {
  return `${prompts()}/${_id}?groupId=${groupId}`;
};

export const getCategories = () => '/api/categories';

export const getAllPromptGroups = () => `${prompts()}/all`;

/* Roles */
export const roles = () => '/api/roles';
export const getRole = (roleName: string) => `${roles()}/${roleName.toLowerCase()}`;
export const updatePromptPermissions = (roleName: string) => `${getRole(roleName)}/prompts`;
export const updateAgentPermissions = (roleName: string) => `${getRole(roleName)}/agents`;

/* Conversation Tags */
export const conversationTags = (tag?: string) =>
  `/api/tags${tag != null && tag ? `/${encodeURIComponent(tag)}` : ''}`;

export const conversationTagsList = (pageNumber: string, sort?: string, order?: string) =>
  `${conversationTags()}/list?pageNumber=${pageNumber}${sort ? `&sort=${sort}` : ''}${order ? `&order=${order}` : ''
  }`;

export const addTagToConversation = (conversationId: string) =>
  `${conversationTags()}/convo/${conversationId}`;

export const userTerms = () => '/api/user/terms';
export const acceptUserTerms = () => '/api/user/terms/accept';
export const banner = () => '/api/banner';

// Two-Factor Endpoints
export const enableTwoFactor = () => '/api/auth/2fa/enable';
export const verifyTwoFactor = () => '/api/auth/2fa/verify';
export const confirmTwoFactor = () => '/api/auth/2fa/confirm';
export const disableTwoFactor = () => '/api/auth/2fa/disable';
export const regenerateBackupCodes = () => '/api/auth/2fa/backup/regenerate';
export const verifyTwoFactorTemp = () => '/api/auth/2fa/verify-temp';

// 知识库模块
export const knowledgeUpload = () => '/api/v1/workstation/knowledgeUpload';
export const queryKnowledge = () => '/api/v1/workstation/queryKnowledge';
// export const queryKnowledge = () => '/api/knowledge/query';
export const deleteKnowledge = (_id: string) => `/api/v1/workstation/deleteKnowledge?file_id=${_id}`;
